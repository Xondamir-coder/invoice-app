<template>
	<div class="dropdown-container">
		<p v-if="!multiple" class="dropdown-label dropdown-label--big">{{ label }}</p>
		<p v-if="!multiple" class="dropdown-label dropdown-label--small">
			{{ label.split(' ')[0] }}
		</p>
		<label
			:for="randomLabel"
			class="dropdown"
			:style="{
				'border-color': isChecked ? 'var(--color-secondary)' : ''
			}"
			:class="{ 'dropdown-multiple': multiple }">
			<span class="dropdown-value">{{ multiple ? label : model }}</span>

			<input
				v-model="isChecked"
				type="checkbox"
				name="checkbox"
				:id="randomLabel"
				class="dropdown-checkbox" />
			<div class="dropdown-options">
				<label
					:for="multiple ? option : randomLabel"
					class="dropdown-option"
					v-for="option in options"
					@click="!multiple ? selectOption(option) : null"
					:key="option">
					<input
						class="dropdown-option-checkbox"
						v-if="multiple"
						type="checkbox"
						@change="selectOption(option)"
						:id="option" />
					<span>{{ option }}</span>
				</label>
			</div>
		</label>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const isChecked = ref(false);

const model = defineModel();
const props = defineProps({
	label: String,
	options: Array,
	multiple: {
		type: Boolean,
		default: false
	}
});

const randomLabel = Math.random() * 100;

const selectOption = option => {
	if (!props.multiple) {
		model.value = option;
		return;
	}
	if (model.value.includes(option)) {
		model.value = model.value.filter(e => e != option);
	} else {
		model.value = [...model.value, option];
	}
};
</script>

<style lang="scss" scoped>
@mixin text {
	font-weight: bold;
	font-size: 1.5rem;
	letter-spacing: -0.25px;
	line-height: 1.4;
}
.dropdown {
	width: 100%;
	position: relative;
	padding: 2rem 2.4rem;
	border: 1px solid var(--color-lavender-blue);
	border-radius: 1rem;
	color: var(--color-very-dark-blue);
	transition: border-color 200ms;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: var(--color-very-dark-blue);
	gap: 1rem;
	&-container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
		// justify-content: ;
		.dropdown {
			flex: 1;
		}
	}

	&:hover {
		border-color: var(--color-secondary);
	}
	&-multiple {
		border: none;
		.dropdown-options {
			top: 100%;
		}
	}
	&-options {
		z-index: 10;
		background: #fff;
		display: flex;
		flex-direction: column;
		position: absolute;
		box-shadow: 0px 10px 20px 0px #48549f60;
		border-radius: 1rem;
		top: calc(100% + 20px);
		left: 0;
		width: 100%;
		transition-property: opacity, transform, visibility;
		transition-duration: 300ms;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-20px);

		@media only screen and (max-width: 768px) {
			width: 120%;
		}
	}
	&-option {
		@include text;
		padding: 1.6rem 2.4rem;
		transition: color 200ms;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 13px;
		&:hover &-checkbox {
			border-color: var(--color-primary);
		}
		&-checkbox {
			content: url('@/assets/icon-check-invisible.svg');
			appearance: none;
			object-fit: scale-down;
			background-color: var(--color-lavender-blue);
			width: 16px;
			height: 16px;
			border: 1px solid var(--color-primary);
			border-color: var(--color-lavender-blue);
			border-radius: 3px;
			transition: border-color 300ms, background-color 300ms;
			&:checked {
				content: url('@/assets/icon-check.svg');
				background-color: var(--color-primary);
				border-color: var(--color-primary);
			}
		}
		&:hover {
			color: var(--color-secondary);
		}
		&:not(:last-of-type) {
			border-bottom: 1px solid var(--color-lavender-blue);
		}
	}
	&-checkbox {
		content: url('@/assets/icon-arrow-down.svg');
		transition: transform 500ms;
		cursor: pointer;
		appearance: none;
		&:checked {
			transform: rotate(360deg + 180deg);
		}
		&:checked + .dropdown-options {
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		}
	}
	&-label {
		color: var(--color-blue-gray);
		font-size: 1.5rem;
		font-weight: 500;
		letter-spacing: -0.1px;
		transition: color 300ms;

		&--small {
			@media only screen and (min-width: 768px) {
				display: none;
			}
		}
		&--big {
			@media only screen and (max-width: 768px) {
				display: none;
			}
		}
	}
	&-value {
		@include text;

		&:empty + .dropdown-label {
			top: 50%;
			left: 2rem;
		}
	}
}

body.dark .dropdown {
	background-color: var(--color-tertiary);
	border-color: var(--color-dark-slate-blue);
	color: #fff;
	&-multiple {
		background-color: transparent;
	}
	&-label {
		color: var(--color-lavender-blue);
	}
	&-options {
		background-color: var(--color-dark-slate-blue);
		box-shadow: 0px 10px 20px 0px #00000025;
	}
	&-option {
		border-color: var(--color-tertiary);
		&-checkbox {
			background-color: var(--color-tertiary);
			border-color: var(--color-tertiary);
			&:checked {
				background-color: var(--color-primary);
				border-color: var(--color-primary);
			}
		}
	}
}
</style>
