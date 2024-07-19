<template>
	<main class="invoice">
		<button class="invoice__cta" @click="routeBack">
			<img src="@/assets/icon-arrow-left.svg" alt="arrow left" />
			<span>Go back</span>
		</button>
		<section class="invoice__head">
			<div class="invoice__head-left">
				<span class="invoice__status">Status</span>
				<InvoiceStatus :status="invoice?.status" />
			</div>
			<div class="invoice__head-right invoice__head-right--big">
				<button class="button-secondary">Edit</button>
				<button class="button-red" @click="toggleDeleteModal">Delete</button>
				<button class="button-primary" @click="markAsPaid">Mark as Paid</button>
			</div>
		</section>
		<section class="invoice__content">
			<div class="invoice__content-head">
				<div class="invoice__content-desc">
					<p class="invoice__content-id">
						<span class="invoice__hashtag">#</span>{{ invoice?.id }}
					</p>
					<p class="invoice__label">{{ invoice?.description }}</p>
				</div>
				<ul class="invoice__content-address">
					<li class="invoice__label">{{ invoice?.senderAddress.street }}</li>
					<li class="invoice__label">{{ invoice?.senderAddress.city }}</li>
					<li class="invoice__label">{{ invoice?.senderAddress.postCode }}</li>
					<li class="invoice__label">{{ invoice?.senderAddress.country }}</li>
				</ul>
			</div>
			<div class="invoice__content-items">
				<div class="invoice__content-item">
					<p class="invoice__label">Invoice Date</p>
					<h1 class="invoice__heading">{{ formatDate(invoice?.createdAt) }}</h1>
				</div>
				<div class="invoice__content-item">
					<p class="invoice__label">Payment Due</p>
					<h1 class="invoice__heading">{{ formatDate(invoice?.paymentDue) }}</h1>
				</div>
				<div class="invoice__content-item">
					<p class="invoice__label">Bill To</p>
					<h1 class="invoice__heading">{{ invoice?.clientName }}</h1>
					<ul class="invoice__content-client">
						<li class="invoice__label">{{ invoice?.clientAddress.street }}</li>
						<li class="invoice__label">{{ invoice?.clientAddress.city }}</li>
						<li class="invoice__label">{{ invoice?.clientAddress.postCode }}</li>
						<li class="invoice__label">{{ invoice?.clientAddress.country }}</li>
					</ul>
				</div>
				<div class="invoice__content-item">
					<p class="invoice__label">Sent to</p>
					<h1 class="invoice__heading">{{ invoice?.clientEmail }}</h1>
				</div>
			</div>
			<div class="invoice__content-transactions">
				<div class="invoice__content-transactions_top">
					<div class="invoice__content-transaction">
						<span class="invoice__label">Item Name</span>
						<span class="invoice__label">QTY.</span>
						<span class="invoice__label">Price</span>
						<span class="invoice__label">Total</span>
					</div>
					<div class="invoice__content-transaction" v-for="item in invoice?.items">
						<h1 class="invoice__heading">{{ item.name }}</h1>
						<p class="invoice__content-transaction_p">{{ item.quantity }}</p>
						<p class="invoice__content-transaction_p">&pound; {{ item.price }}</p>
						<p class="invoice__content-transaction_total">&pound; {{ item.total }}</p>
					</div>
				</div>
				<div class="invoice__content-transactions_bottom">
					<p>Amount Due</p>
					<span>&pound; {{ invoice?.total }}</span>
				</div>
			</div>
		</section>
		<div class="invoice__head-right invoice__head-right--small">
			<button class="button-secondary">Edit</button>
			<button class="button-red" @click="toggleDeleteModal">Delete</button>
			<button class="button-primary" @click="markAsPaid">Mark as Paid</button>
		</div>

		<Teleport to="body">
			<DeleteModal
				:class="{ hidden: !isDeleting }"
				@close="toggleDeleteModal"
				@delete="deleteInvoice" />
		</Teleport>
	</main>
</template>

<script setup>
import InvoiceStatus from '@/components/InvoiceStatus.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import { formatDate } from '@/js/helpers';
import { useInvoiceStore } from '@/stores/invoice';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const invoiceStore = useInvoiceStore();

const isDeleting = ref(false);

const invoice = computed(() =>
	invoiceStore.invoices.find(invoice => invoice?.id === route.params.id)
);

const routeBack = () => router.go(-1);
const markAsPaid = () => invoiceStore.markAsPaid(invoice?.value);
const toggleDeleteModal = () => (isDeleting.value = !isDeleting.value);
const deleteInvoice = () => {
	invoiceStore.deleteInvoice(invoice?.value);
	toggleDeleteModal();
	routeBack();
};

document.title = `Invoice | ${route.params.id}`;
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.invoice {
	max-width: 73rem;
	margin: 7.8rem auto;
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;

	@media only screen and (max-width: 768px) {
		margin-bottom: 0;
		margin-left: 0;
		margin-right: 0;
		max-width: initial;

		& > *:not(.invoice__head-right) {
			margin: 0 2rem;
		}
	}

	&__heading {
		font-weight: bold;
		font-size: 1.5rem;
		letter-spacing: -0.25px;
		color: var(--color-very-dark-blue);
		transition: color 300ms;
		line-height: 1.5;
	}
	&__label {
		color: var(--color-blue-gray);
		font-size: 1.3rem;
		font-weight: 500;
		letter-spacing: -0.1px;
		transition: color 300ms;
	}
	&__status {
		font-weight: 500;
		font-size: 1.3rem;
		letter-spacing: 0.1px;
		color: #858bb2;
		transition: color 300ms;
	}
	&__head,
	&__content {
		background-color: #fff;
		transition: background-color 300ms;
		border-radius: 1.2rem;
	}
	&__hashtag {
		color: var(--color-cool-gray);
	}
	&__content {
		padding: 5rem;
		display: flex;
		flex-direction: column;
		gap: 20px;

		@media only screen and (max-width: 768px) {
			padding: 2rem;
		}
		@media only screen and (max-width: 375px) {
			padding: 1rem;
		}
		&-transaction {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			justify-items: center;
			font-size: 1.5rem;
			font-weight: bold;
			letter-spacing: -0.25px;
			&_p {
				color: var(--color-blue-gray);
				transition: color 300ms;
			}
			&_total {
				color: var(--color-very-dark-blue);
				transition: color 300ms;
			}
			.invoice__label:first-child,
			.invoice__heading {
				justify-self: left;
			}
		}
		&-transactions {
			border-radius: 1rem;
			overflow: hidden;
			&_top {
				padding: 3.2rem;
				background-color: #f9fafe;
				transition: background-color 300ms;
				display: flex;
				flex-direction: column;
				gap: 3rem;

				@media only screen and (max-width: 768px) {
					padding: 1.5rem;
				}
			}
			&_bottom {
				background-color: #373b53;
				transition: background-color 300ms;
				color: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 2.1rem 3.2rem;

				@media only screen and (max-width: 768px) {
					padding: 1.5rem;
				}

				p {
					font-size: 1.3rem;
					font-weight: 500;
					letter-spacing: -0.1px;
				}
				span {
					font-size: 2.4rem;
					font-weight: bold;
					letter-spacing: -0.5px;
				}
			}
		}
		&-item {
			display: flex;
			flex-direction: column;
			gap: 1.3rem;
			&:first-child {
				grid-area: date;
			}
			&:nth-child(2) {
				grid-area: payment;
			}
			&:nth-child(3) {
				grid-area: bill;
			}
			&:last-child {
				grid-area: sent;
			}
		}
		&-items {
			display: grid;
			row-gap: 3rem;
			grid-template-areas:
				'date bill sent'
				'payment bill .';
		}
		&-head {
			display: flex;
			justify-content: space-between;
			ul {
				text-align: right;
			}
		}
		&-id {
			font-size: 1.5rem;
			font-weight: bold;
			color: var(--color-very-dark-blue);
			transition: color 300ms;
			letter-spacing: -0.25px;
		}
		&-desc {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}
	}
	&__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 3.2rem;
		& &-left {
			@media only screen and (max-width: 600px) {
				justify-content: space-between;
				flex-grow: 1;
			}
		}
		&-left {
			display: flex;
			align-items: center;
			gap: 2rem;
		}
		&-right {
			display: flex;
			align-items: center;
			gap: 8px;
			&--big {
				@media only screen and (max-width: 600px) {
					display: none;
				}
			}
			&--small {
				background-color: #fff;
				width: 100%;
				padding: 2rem;
				justify-content: center;
				transition: background-color 300ms;
				margin-top: auto;
				@media only screen and (min-width: 600px) {
					display: none;
				}
			}
			button {
				padding-left: 2rem;
				padding-right: 2rem;
			}
		}
	}
	&__cta {
		align-self: flex-start;
		display: flex;
		align-items: center;
		gap: 2.4rem;
		background-color: transparent;
		padding: 0;
		&:hover img {
			transform: translateX(-8px);
		}
		span {
			transition: color 300ms;
			font-weight: bold;
			font-size: 1.5rem;
			letter-spacing: -0.25px;
			color: var(--color-very-dark-blue);
		}
		img {
			transition: transform 300ms;
		}
		&:hover span {
			color: var(--color-blue-gray);
		}
	}
}

body.dark .invoice {
	&__cta {
		&:hover span {
			color: var(--color-cool-gray);
		}
		span {
			color: #ffffff;
		}
	}
	&__content {
		&-transaction {
			&_total {
				color: #fff;
			}
			&_p {
				color: var(--color-lavender-blue);
			}
		}
		&-transactions {
			&_top {
				background-color: var(--color-dark-slate-blue);
			}
			&_bottom {
				background-color: var(--color-very-dark-blue);
			}
		}
		&-id {
			color: #fff;
		}
	}
	&__label {
		color: var(--color-lavender-blue);
	}
	&__heading {
		color: #fff;
	}
	&__status {
		color: var(--color-lavender-blue);
	}
	&__head-right--small {
		background-color: var(--color-tertiary);
	}
	&__head,
	&__content {
		background-color: var(--color-tertiary);
	}
}
</style>
