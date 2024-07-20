<template>
	<div class="sidebar">
		<div class="sidebar__logo">
			<img class="sidebar__logo-icon" src="@/assets/logo.svg" alt="logo" />
			<div class="sidebar__logo-mask"></div>
		</div>
		<div class="sidebar__bottom">
			<ThemeIcon />
			<div class="sidebar__profile">
				<img class="sidebar__avatar" src="@/assets/me.jpg" alt="avatar" />
			</div>
		</div>
	</div>
</template>

<script setup>
import ThemeIcon from '@/components/ThemeIcon.vue';
</script>

<style lang="scss" scoped>
.sidebar {
	$border-radius: 3rem;
	background-color: #373b53;
	flex-grow: 1;
	max-width: 10.3rem;
	border-top-right-radius: $border-radius;
	border-bottom-right-radius: $border-radius;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: background-color 300ms;
	z-index: 3;
	@media only screen and (max-width: 768px) {
		max-width: initial;
		flex-direction: row;
		border-top-right-radius: initial;
		border-bottom-right-radius: initial;
		max-height: 80px;
	}
	&__bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.2rem;

		@media only screen and (max-width: 768px) {
			flex-direction: row;
		}
	}
	&__profile {
		padding: 2.4rem;
		align-self: stretch;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid #494e6e;

		@media only screen and (max-width: 768px) {
			border-top: none;
			border-left: 1px solid #494e6e;
		}
	}
	&__avatar {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		object-fit: cover;
	}
	&__logo {
		border-top-right-radius: $border-radius;
		border-bottom-right-radius: $border-radius;
		background-color: var(--color-primary);
		height: 11rem;
		display: grid;
		place-items: center;
		position: relative;
		overflow: hidden;

		@media only screen and (max-width: 768px) {
			height: auto;
			width: 12rem;
		}
		&-icon {
			z-index: 1;
			height: 4rem;
			width: 4rem;
		}
		&-mask {
			background-color: var(--color-secondary);
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 50%;
			border-top-left-radius: $border-radius;
		}
	}
}

body.dark .sidebar {
	background-color: var(--color-tertiary);
}
</style>
