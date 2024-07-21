<template>
	<main class="invoices" :class="{ 'invoices--empty': !invoiceStore.invoices.length }">
		<div class="invoices__header">
			<div class="invoices__title">
				<h1 class="heading-l">Invoices</h1>
				<p class="invoices__title-big">
					There are {{ invoiceStore.invoices.length }} total invoices
				</p>
				<p class="invoices__title-small">{{ invoiceStore.invoices.length }} invoices</p>
			</div>
			<div class="invoices__filter">
				<Dropdown
					:options="filterOptions"
					multiple
					label="Filter by status"
					v-model="selectedFilterOptions" />
				<button @click="toggleForm" class="invoices__filter-button button-primary-icon">
					<span class="button-primary-svg">
						<img src="@/assets/icon-plus.svg" alt="plus" />
					</span>
					<span>New Invoice</span>
				</button>
			</div>
		</div>
		<InvoicesList :filters="selectedFilterOptions" />
	</main>
	<Teleport to="body">
		<Form :class="{ hidden: !isAdding }" type="add" @close="toggleForm" />
	</Teleport>
</template>

<script setup>
import Dropdown from '@/components/Dropdown.vue';
import Form from '@/components/Form.vue';
import InvoicesList from '@/components/InvoicesList.vue';
import { useInvoiceStore } from '@/stores/invoice';
import { ref } from 'vue';

const isAdding = ref(false);
const selectedFilterOptions = ref([]);
const filterOptions = ['Draft', 'Pending', 'Paid'];
const invoiceStore = useInvoiceStore();
document.title = 'All Invoices';

const toggleForm = () => (isAdding.value = !isAdding.value);
</script>

<style lang="scss" scoped>
.invoices {
	max-width: 73rem;
	margin: 7.8rem auto;
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	gap: 6.4rem;
	@media only screen and (max-width: 768px) {
		width: 100%;
	}
	@media only screen and (max-width: 615px) {
		margin-left: 2rem;
		margin-right: 2rem;
		width: auto;
	}
	&--empty {
		gap: 0;
	}
	&__filter {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		&-button {
			padding: 1.1rem 1.5rem;
		}
	}
	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&__title {
		display: flex;
		flex-direction: column;
		gap: 6px;
		&-small {
			@media only screen and (min-width: 768px) {
				display: none;
			}
		}
		&-big {
			@media only screen and (max-width: 768px) {
				display: none;
			}
		}
		h1 {
			transition: color 300ms;
		}
		p {
			font-size: 1.5rem;
			font-weight: 500;
			letter-spacing: -0.1px;
			color: var(--color-cool-gray);
		}
	}
}

body.dark .invoices {
	&__title {
		h1 {
			color: #fff;
		}
	}
}
</style>
