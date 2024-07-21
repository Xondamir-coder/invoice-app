<template>
	<div class="container" :class="attrs.class" :style="style" ref="container">
		<h1 class="container__title" v-if="type == 'edit'">
			Edit <span class="container__hashtag">#</span>{{ route.params.id }}
		</h1>
		<h1 class="container__title" v-else>New Invoice</h1>
		<form class="form" @submit.prevent="submitForm('pending')">
			<div class="row">
				<h1 class="row__title">Bill From</h1>
				<TextInput label="Street Address" v-model="senderData.street" />
				<div class="row__inputs">
					<TextInput label="City" v-model="senderData.city" />
					<TextInput label="Post Code" v-model="senderData.postCode" />
					<TextInput label="Country" v-model="senderData.country" />
				</div>
			</div>
			<div class="row">
				<h1 class="row__title">Bill To</h1>
				<TextInput label="Client's Name" v-model="clientData.name" />
				<TextInput label="Client's Email" type="email" v-model="clientData.email" />
				<TextInput label="Street Address" v-model="clientData.street" />
				<div class="row__inputs">
					<TextInput label="City" v-model="clientData.city" />
					<TextInput label="Post Code" v-model="clientData.postCode" />
					<TextInput label="Country" v-model="clientData.country" />
				</div>
			</div>
			<div class="row">
				<div class="row__inputs">
					<TextInput type="date" label="Invoice Date" v-model="transactionData.date" />
					<Dropdown
						label="Payment Terms"
						:options="dropdownOptions"
						v-model="transactionData.paymentTerms" />
				</div>
				<TextInput label="Project Description" v-model="transactionData.description" />
			</div>
			<div class="row">
				<h1 class="items__title">Item List</h1>
				<div class="items">
					<div class="item" v-for="item in itemsData">
						<TextInput no-error label="Item Name" v-model="item.name" />
						<TextInput
							@input="watchItems"
							type="number"
							label="Qty."
							no-error
							v-model="item.quantity" />
						<TextInput
							no-error
							@input="watchItems"
							type="number"
							label="Price"
							v-model="item.price" />
						<div class="item__total">
							<p class="item__total-label">Total</p>
							<p class="item__total-p">{{ item.total }}</p>
						</div>
						<button class="item__delete-button" type="button" @click="removeItem(item)">
							<svg
								class="item__delete"
								width="13"
								height="16"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
									fill="#888EB0"
									fill-rule="nonzero" />
							</svg>
						</button>
					</div>
				</div>
				<button class="items__button button-lavender" type="button" @click="addItem">
					+ Add New Item
				</button>
			</div>
			<div class="form__buttons">
				<p class="form__error" :class="{ 'form__error--active': !itemsData.length }">
					- An item must be added
				</p>
				<button
					type="button"
					class="button-secondary"
					:style="type != 'edit' ? 'margin-right: auto' : ''"
					@click="closeForm">
					{{ type == 'edit' ? 'Cancel' : 'Discard' }}
				</button>
				<button
					type="submit"
					:class="type == 'edit' ? 'button-secondary' : 'button-tertiary'"
					v-if="type != 'edit'"
					@click="submitForm('draft')">
					Save as Draft
				</button>
				<button type="submit" class="button-primary">
					{{ type == 'edit' ? 'Save Changes' : 'Save & Send' }}
				</button>
			</div>
		</form>
	</div>
	<Overlay @close="closeForm" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import TextInput from './TextInput.vue';
import { onMounted, ref, useAttrs } from 'vue';
import { useInvoiceStore } from '@/stores/invoice';
import Overlay from './Overlay.vue';
import { generateRandomID } from '@/js/helpers';
import Dropdown from './Dropdown.vue';

const route = useRoute();
const attrs = useAttrs();
const invoiceStore = useInvoiceStore();

const props = defineProps({
	type: String
});
const emits = defineEmits(['close']);

const addItem = () => {
	itemsData.value.push({
		name: '',
		quantity: 0,
		price: 0,
		total: 0
	});
};
const removeItem = item => {
	const index = itemsData.value.indexOf(item);
	itemsData.value.splice(index, 1);
};
const addDaysToDate = (dateString, days) => {
	const date = new Date(dateString);
	date.setDate(date.getDate() + days);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0');
	const output = `${year}-${month}-${day}`;

	return output;
};
const closeForm = () => {
	emits('close');
	initializeForm();
};
const submitForm = status => {
	if (!itemsData.value.length) return;

	const paymentTerms = +transactionData.value.paymentTerms.split(' ')[1];
	const newInvoice = {
		id: props.type == 'edit' ? invoiceStore.invoice.id : generateRandomID(),
		createdAt: transactionData.value.date,
		paymentDue: addDaysToDate(transactionData.value.date, paymentTerms),
		description: transactionData.value.description,
		paymentTerms,
		clientName: clientData.value.name,
		clientEmail: clientData.value.email,
		status: props.type == 'edit' ? invoiceStore.invoice.status : status,
		senderAddress: { ...senderData.value },
		clientAddress: { ...clientData.value },
		items: JSON.parse(JSON.stringify(itemsData.value)),
		total: itemsData.value.reduce((total, item) => total + item.total, 0)
	};

	if (props.type == 'edit') {
		invoiceStore.updateInvoice(newInvoice);
	} else {
		invoiceStore.addInvoice(newInvoice);
	}

	closeForm();
};
const initializeForm = () => {
	if (props.type == 'edit') {
		// Populate the sender address fields with the data from the invoice
		senderData.value = { ...invoiceStore.invoice.senderAddress };

		// Spread and copy the client address and name fields with the data from the invoice
		clientData.value = { ...invoiceStore.invoice.clientAddress };
		clientData.value.name = invoiceStore.invoice.clientName;
		clientData.value.email = invoiceStore.invoice.clientEmail;

		// Spread and copy the transaction date, description, and payment terms fields with the data from the invoice
		transactionData.value.date = invoiceStore.invoice.createdAt;
		transactionData.value.description = invoiceStore.invoice.description;
		transactionData.value.paymentTerms = `Net ${invoiceStore.invoice.paymentTerms} ${
			invoiceStore.invoice.paymentTerms > 1 ? 'days' : 'day'
		}`;

		// Spread and copy the item list with the data from the invoice
		itemsData.value = JSON.parse(JSON.stringify(invoiceStore.invoice.items));
	} else {
		senderData.value = {
			street: '',
			city: '',
			postCode: '',
			country: ''
		};
		clientData.value = {
			name: '',
			email: '',
			street: '',
			city: '',
			postCode: '',
			country: ''
		};
		transactionData.value = {
			date: '',
			paymentTerms: '',
			description: ''
		};
		itemsData.value = [
			{
				name: '',
				quantity: 0,
				price: 0,
				total: 0
			}
		];
	}
};
const watchItems = () => {
	console.log('watching items');
	itemsData.value.forEach(item => {
		item.total = Math.trunc(+item.quantity * +item.price);
	});
};

onMounted(() => {
	const sidebarWidth = document.querySelector('.sidebar').clientWidth;
	style.value.left = `${sidebarWidth - 25}px`;

	// If the form is being used to edit an existing invoice, populate the form fields with the data from the invoice
	if (props.type == 'edit') {
		initializeForm();
	}
});

const dropdownOptions = ['Net 1 day', 'Net 7 days', 'Net 14 days', 'Net 30 days'];
const container = ref();
const style = ref({});
const senderData = ref({
	street: '',
	city: '',
	postCode: '',
	country: ''
});
const clientData = ref({
	name: '',
	email: '',
	street: '',
	city: '',
	postCode: '',
	country: ''
});
const transactionData = ref({
	date: '',
	paymentTerms: '',
	description: ''
});
const itemsData = ref([
	{
		name: '',
		quantity: 0,
		price: 0,
		total: 0
	}
]);
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
}
body.dark .item {
	&__total {
		color: var(--color-lavender-blue);
		&-label {
			color: var(--color-lavender-blue);
		}
	}
}
.item {
	display: grid;
	align-items: baseline;
	grid-template-columns: 3fr 1fr 1.5fr 1fr max-content;
	grid-template-areas: 'name qty price total delete';
	column-gap: 1.5rem;

	div:first-child {
		grid-area: name;
	}
	div:nth-child(2) {
		grid-area: qty;
	}
	div:nth-child(3) {
		grid-area: price;
	}
	div:nth-child(4) {
		grid-area: total;
	}
	svg {
		align-self: stretch;
		display: flex;
		align-items: center;
		justify-content: center;
		grid-area: delete;
	}

	@media only screen and (max-width: 768px) {
		row-gap: 3rem;
		grid-template-areas:
			'name name name name'
			'qty price total delete';
		grid-template-columns: 1fr 2fr 2fr max-content;
	}

	&__delete-button {
		background: transparent;
		align-self: center;
		padding: 0;
		transform: translateY(0.8rem);
		path {
			transition: fill 300ms;
		}
		&:hover path {
			fill: var(--color-red-orange);
		}
	}
	&__total {
		display: flex;
		flex-direction: column;
		font-size: 1.5rem;
		color: var(--color-cool-gray);
		font-weight: bold;
		letter-spacing: -0.25px;
		gap: 10px;

		&-label {
			color: var(--color-blue-gray);
			font-size: 1.5rem;
			font-weight: 500;
			letter-spacing: -0.1px;
			transition: color 300ms;
		}

		&-p {
			transition: color 300ms;
			padding: 2rem 1.8rem;
			padding-left: 0;
		}
	}
}
.items {
	display: flex;
	flex-direction: column;
	gap: 3.5rem;
	&__title {
		color: #777f98;
		font-size: 1.8rem;
		letter-spacing: -0.38px;
	}
	&__label {
		color: var(--color-blue-gray);
		font-size: 1.3rem;
		letter-spacing: -0.1px;
		transition: color 300ms;
	}
}
body.dark .items {
	&__label {
		color: var(--color-lavender-blue);
	}
}
.form {
	display: flex;
	flex-direction: column;
	gap: 5rem;

	&__error {
		position: absolute;
		left: 0;
		color: var(--color-red-orange);
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: -0.21px;
		transition: color 300ms;
		transform: translateY(-10px);
		top: -3rem;
		opacity: 0;
		transition: transform 300ms, opacity 300ms;
		&--active {
			opacity: 1;
			transform: translateY(0);
		}
	}
	&__buttons {
		position: relative;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		@media only screen and (max-width: 500px) {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: -3px;
			background-color: #fff;
			padding: 2.4rem 2rem;
			box-shadow: 2px 2px 46px 11px rgba(72, 84, 159, 0.6666666667);
			transition: background-color 300ms;
		}
		button {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}
}
.row {
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	&__title {
		color: var(--color-primary);
		font-size: 1.5rem;
		font-weight: bold;
		letter-spacing: -0.25px;
	}
	&__inputs {
		display: flex;
		gap: 2.4rem;
		flex-wrap: wrap;
		& > * {
			flex: 1;
			min-width: 20rem;
		}
	}
}
.container {
	max-width: 50%;
	transition: transform 500ms, background-color 300ms;
	position: fixed;
	left: 0;
	top: 0;
	background-color: #fff;
	border-top-right-radius: 4rem;
	border-bottom-right-radius: 4rem;
	z-index: 2;
	height: 100vh;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 6rem;
	padding-left: calc(6rem + 25px);
	display: flex;
	flex-direction: column;
	gap: 4.6rem;
	color: var(--color-very-dark-blue);
	@media only screen and (max-width: 1300px) {
		max-width: 70%;
	}
	@media only screen and (max-width: 768px) {
		left: 0 !important;
		max-width: 85%;
		padding: 3rem;
		padding-top: 15rem;
	}
	@media only screen and (max-width: 600px) {
		max-width: 100%;
		padding: 1.5rem;
		padding-top: 15rem;
	}

	@media only screen and (max-width: 500px) {
		padding-bottom: 15rem;
	}

	&__hashtag {
		color: var(--color-cool-gray);
	}
	&__title {
		font-weight: bold;
		font-size: 2.4rem;
		letter-spacing: -0.5px;
	}

	&::-webkit-scrollbar {
		width: 12px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-lavender-blue);
		border: none;
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		background-color: var(--color-very-light-gray);
		border-radius: 10px;
	}

	&.hidden {
		transform: translateX(-150%);
		& + .overlay {
			opacity: 0;
			visibility: hidden;
		}
	}
}

body.dark .container {
	background-color: var(--color-very-dark-blue-alt);
	color: #fff;
	&::-webkit-scrollbar-track {
		background-color: var(--color-very-dark-blue-alt);
		border-radius: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: var(--color-dark-slate-blue);
		border-radius: 10px;
	}
}
body.dark .form {
	&__buttons {
		@media only screen and (max-width: 500px) {
			background-color: var(--color-tertiary);
		}
	}
}
</style>
