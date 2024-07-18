<template>
	<div class="input-container">
		<input type="text" id="input" class="input" placeholder=" " v-model="model" />
		<label for="input" class="input-label">{{ label }}</label>
	</div>
</template>

<script setup>
const model = defineModel();
const props = defineProps({
	label: String
});
</script>

<style lang="scss" scoped>
.input {
	padding: 2rem 1.8rem;
	font-weight: bold;
	font-size: 1.5rem;
	letter-spacing: -0.25px;
	border-radius: 1rem;
	transition: border-color 200ms;
	border: 1px solid var(--color-lavender-blue);
	color: var(--color-very-dark-blue);
	outline: none;
	&:focus {
		border-color: var(--color-secondary);
	}
	&:placeholder-shown + &-label {
		top: 50%;
		left: 2rem;
	}
	&-container {
		position: relative;
	}
	&-label {
		color: var(--color-blue-gray);
		font-size: 1.5rem;
		font-weight: 500;
		letter-spacing: -0.1px;
		position: absolute;
		top: -2rem;
		left: 0;
		transform: translateY(-50%);
		transition: top 200ms, left 200ms;
	}
}
body.dark {
	.input {
		color: #fff;
		background-color: var(--color-tertiary);
		border-color: var(--color-dark-slate-blue);
		&:focus {
			border-color: var(--color-secondary);
		}
		&-label {
			color: var(--color-lavender-blue);
		}
	}
}
</style>
