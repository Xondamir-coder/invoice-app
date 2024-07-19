<template>
	<span class="status" :class="`status--${status}`">
		<div class="circle"></div>
		<span>{{ status }}</span>
	</span>
</template>

<script setup>
const props = defineProps({
	status: String
});
</script>

<style lang="scss" scoped>
.status {
	padding: 1.7rem 1.8rem;
	border-radius: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	text-transform: capitalize;
	transition: background-color 300ms, color 300ms;
	.circle {
		transition: background-color 300ms;
	}
	span {
		font-weight: bold;
		font-size: 1.5rem;
		letter-spacing: -0.25px;
	}
	&--paid {
		background-color: rgba(#33d69f, 0.1);
		color: #33d69f;
		.circle {
			background-color: #33d69f;
		}
	}
	&--pending {
		background-color: rgba(#ff8f00, 0.1);
		color: #ff8f00;
		.circle {
			background-color: #ff8f00;
		}
	}
	&--draft {
		background-color: rgba(#373b53, 0.1);
		color: #373b53;
		.circle {
			background-color: #373b53;
		}
	}
}
.circle {
	height: 8px;
	width: 8px;
	border-radius: 50%;
}

body.dark .status {
	&--draft {
		background-color: #292c44;
		color: var(--color-lavender-blue);
		.circle {
			background-color: var(--color-lavender-blue);
		}
	}
}
</style>
