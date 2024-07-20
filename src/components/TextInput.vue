<template>
	<div class="input-container">
		<input
			required
			:type="type"
			id="input"
			class="input"
			:placeholder="label || ''"
			v-model="model" />
		<div class="label-container" :class="{ positioned: !label }">
			<label v-if="label" for="input" class="input-label">{{ label }}</label>
			<label for="input" class="input-error">can't be empty</label>
		</div>
	</div>
</template>

<script setup>
const model = defineModel();
const props = defineProps({
	label: String,
	type: {
		type: String,
		default: 'text'
	}
});
</script>

<style lang="scss" scoped>
.positioned {
	position: absolute;
	top: -15px;
	right: 0;
}
.label-container {
	order: -1;
	display: flex;
	justify-content: space-between;
}
.input {
	width: 100%;
	font-family: inherit;
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
	&:user-invalid {
		border-color: var(--color-red-orange) !important;
		& + .label-container .input-label {
			color: var(--color-red-orange);
		}
		& + .label-container .input-error {
			opacity: 1;
			transform: translateY(0);
		}
	}

	&-container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	&-label {
		color: var(--color-blue-gray);
		font-size: 1.5rem;
		font-weight: 500;
		letter-spacing: -0.1px;
		transition: color 300ms;
	}
	&-error {
		color: var(--color-red-orange);
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: -0.21px;
		transition: color 300ms;
		transform: translateY(-10px);
		opacity: 0;
		transition: transform 300ms, opacity 300ms;
	}
}
body.dark {
	.input {
		color: #fff;
		background-color: var(--color-tertiary);
		border-color: var(--color-dark-slate-blue);
		color-scheme: dark;
		&::placeholder {
			color: #ffffffa6;
		}
		&:focus {
			border-color: var(--color-secondary);
		}
		&-label {
			color: var(--color-lavender-blue);
		}
	}
}
</style>
