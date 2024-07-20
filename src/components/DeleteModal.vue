<template>
	<div class="container">
		<Overlay @close="closeModal" />
		<div class="modal">
			<h1 class="modal__title">Confirm Deletion</h1>
			<p class="modal__text">
				Are you sure you want to delete invoice #{{ route.params.id }}? This action cannot
				be undone.
			</p>
			<div class="modal__buttons">
				<button class="button-secondary" @click="closeModal">Cancel</button>
				<button class="button-red" @click="deleteInvoice">Delete</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Overlay from '@/components/Overlay.vue';

const route = useRoute();
const emits = defineEmits(['close', 'delete']);

const closeModal = () => emits('close');
const deleteInvoice = () => emits('delete');
</script>

<style lang="scss" scoped>
.container.hidden {
	.overlay,
	.modal {
		opacity: 0;
		visibility: hidden;
	}
	.modal {
		translate: 0 -30px;
	}
}

.modal {
	transition-duration: 300ms;
	transition-property: opacity, visibility, translate, background-color;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 5rem;
	background-color: white;
	border-radius: 1rem;
	max-width: 48rem;
	z-index: 2;

	&__title {
		color: var(--color-very-dark-blue);
		font-size: 2.4rem;
		font-weight: bold;
		letter-spacing: -0.5px;
		transition: color 300ms;
	}
	&__text {
		font-size: 1.3rem;
		font-weight: 500;
		letter-spacing: -0.1px;
		color: var(--color-cool-gray);
		transition: color 300ms;
		line-height: 1.6;
	}
	&__buttons {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		& > * {
			padding-left: 2.4rem;
			padding-right: 2.4rem;
		}
	}
	@media only screen and (max-width: 768px) {
		width: 90%;
	}
}

body.dark .modal {
	background-color: var(--color-tertiary);
	&__title {
		color: #fff;
	}
	&__text {
		color: var(--color-lavender-blue);
	}
}
</style>
