<template>
	<ul class="list" v-if="invoiceStore.invoices.length">
		<li v-for="invoice in invoiceStore.invoices" :key="invoice.id">
			<RouterLink class="item" :to="{ name: 'invoice', params: { id: invoice.id } }">
				<div class="item__left">
					<h1 class="item__id"><span class="item__hashtag">#</span>{{ invoice.id }}</h1>
					<p class="item__date">
						<span class="item__due">Due</span> {{ invoice.createdAt }}
					</p>
					<p class="item__name">{{ invoice.clientName }}</p>
				</div>
				<div class="item__right">
					<h1 class="item__total">£ {{ invoice.total }}</h1>
					<span class="item__status" :class="`item__status--${invoice.status}`">
						<div class="item__circle"></div>
						{{ invoice.status }}
					</span>
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
			<img src="@/assets/illustration-empty.svg" alt="empty" />
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
const invoiceStore = useInvoiceStore();
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
		color: #fff;
	}
	&__text {
		color: var(--color-lavender-blue);
	}
}
.empty {
	display: grid;
	place-items: center;
	flex-grow: 1;
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
	&::-webkit-scrollbar {
		width: 1rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-primary);
		border: none;
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		background: var(--color-lavender-blue);
		border-radius: 10px;
	}
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
	&__status {
		padding: 1.7rem 1.8rem;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		text-transform: capitalize;
		transition: background-color 300ms, color 300ms;
		.item__circle {
			transition: background-color 300ms;
		}
		&--paid {
			background-color: rgba(#33d69f, 0.1);
			color: #33d69f;
			.item__circle {
				background-color: #33d69f;
			}
		}
		&--pending {
			background-color: rgba(#ff8f00, 0.1);
			color: #ff8f00;
			.item__circle {
				background-color: #ff8f00;
			}
		}
		&--draft {
			background-color: rgba(#373b53, 0.1);
			color: #373b53;
			.item__circle {
				background-color: #373b53;
			}
		}
	}
	&__circle {
		height: 8px;
		width: 8px;
		border-radius: 50%;
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
	&__status {
		&--draft {
			background-color: #292c44;
			color: var(--color-lavender-blue);
			.item__circle {
				background-color: var(--color-lavender-blue);
			}
		}
	}
}
</style>
