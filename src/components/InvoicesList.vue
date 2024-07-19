<template>
	<ul class="list" v-if="invoices.length">
		<li v-for="invoice in invoices" :key="invoice.id">
			<RouterLink class="item" :to="{ name: 'invoice', params: { id: invoice.id } }">
				<div class="item__left">
					<h1 class="item__id"><span class="item__hashtag">#</span>{{ invoice.id }}</h1>
					<p class="item__date">
						<span class="item__due">Due</span> {{ formatDate(invoice.paymentDue) }}
					</p>
					<p class="item__name">{{ invoice.clientName }}</p>
				</div>
				<div class="item__right">
					<h1 class="item__total">£ {{ invoice.total }}</h1>
					<InvoiceStatus :status="invoice.status" />
					<img
						class="item__right-arrow"
						src="@/assets/icon-arrow-right.svg"
						alt="arrow right" />
				</div>
			</RouterLink>
		</li>
	</ul>
	<div class="empty" v-else>
		<div class="empty__content">
			<img class="empty__img" src="@/assets/illustration-empty.svg" alt="empty" />
			<h1 class="empty__title">There is nothing here</h1>
			<p class="empty__text">
				Create an invoice by clicking the <span class="empty__new">New Invoice</span> button
				and get started
			</p>
		</div>
	</div>
</template>

<script setup>
import { useInvoiceStore } from '@/stores/invoice';
import InvoiceStatus from '@/components/InvoiceStatus.vue';
import { formatDate } from '@/js/helpers';
import { computed } from 'vue';
const invoiceStore = useInvoiceStore();

const props = defineProps({
	filters: Array
});

const invoices = computed(() => {
	const changedOptions = props.filters.map(e => e.toLowerCase());
	if (!changedOptions.length) {
		return invoiceStore.invoices;
	}
	return invoiceStore.invoices.filter(invoice => changedOptions.includes(invoice.status));
});
</script>

<style lang="scss" scoped>
@mixin title {
	font-weight: bold;
	font-size: 1.5rem;
	letter-spacing: -0.25px;
	transition: color 300ms;
}
body.dark .empty {
	&__title {
		color: #ffffff;
	}
	&__text {
		color: var(--color-lavender-blue);
	}
}
.empty {
	display: grid;
	place-items: center;
	flex-grow: 1;
	min-height: 70vh;
	&__img {
		width: 24.2rem;
		height: 20rem;
	}
	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			margin-bottom: 6rem;
		}
	}
	&__title {
		margin-bottom: 2.3rem;
		color: var(--color-very-dark-blue);
		font-weight: bold;
		font-size: 2.4rem;
		letter-spacing: -0.75px;
		transition: color 300ms;
	}
	&__text {
		font-weight: 500;
		font-size: 1.3rem;
		letter-spacing: -0.1px;
		color: var(--color-cool-gray);
		max-width: 20rem;
		text-align: center;
		line-height: 1;
		transition: color 300ms;
	}
	&__new {
		font-weight: bold;
	}
}
.list {
	display: flex;
	flex-direction: column;
	gap: 16px;
	overflow-y: auto;
}
.item {
	text-decoration: none;
	box-shadow: 0px 10px 10px -10px #48549f51;
	font-size: 1.5rem;
	font-weight: bold;
	letter-spacing: -0.25px;
	padding: 1.6rem 2.4rem;
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	border-radius: 1rem;
	transition: background-color 300ms, border-color 300ms;
	border: 1px solid transparent;
	@media only screen and (max-width: 500px) {
		flex-direction: column;
		align-content: center;
		gap: 2rem;
	}
	&:hover {
		border-color: var(--color-primary);
	}
	&:hover &__right-arrow {
		transform: translateX(8px);
	}
	&__cta {
		display: flex;
		align-items: center;
		gap: 2rem;
	}
	&__right {
		flex-basis: 35%;
		display: grid;
		grid-template-columns: 1fr 10.4rem max-content;
		align-items: center;
		column-gap: 2rem;
		justify-content: space-between;
		@media only screen and (max-width: 500px) {
			grid-template-columns: 10rem 10.4rem;
			justify-content: center;
		}
		&-arrow {
			transition: transform 300ms;
			@media only screen and (max-width: 500px) {
				display: none;
			}
		}
	}
	&__left {
		flex-basis: 50%;
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		grid-auto-columns: 1fr;
		@media only screen and (max-width: 500px) {
			justify-items: center;
		}
	}
	&__name {
		font-weight: 500;
		letter-spacing: -0.1px;
		font-size: 1.3rem;
		color: #858bb2;
		transition: color 300ms;
	}
	&__id {
		color: var(--color-very-dark-blue);
		@include title;
	}
	&__hashtag {
		color: var(--color-blue-gray);
	}
	&__date {
		transition: color 300ms;
		font-weight: 500;
		font-size: 1.3rem;
		color: var(--color-blue-gray);
	}
	&__due {
		color: var(--color-cool-gray);
		transition: color 300ms;
	}
	&__total {
		@include title;
		color: var(--color-very-dark-blue);
		@media only screen and (max-width: 500px) {
			justify-self: right;
		}
	}
}

body.dark .item {
	background: var(--color-tertiary);
	&__total,
	&__id,
	&__name {
		color: #fff;
	}
	&__date,
	&__due {
		color: var(--color-lavender-blue);
	}
}
</style>
