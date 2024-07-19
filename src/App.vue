<template>
	<div class="container">
		<Sidebar />
		<RouterView />
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	min-height: 100vh;

	// RouterView to grow full width
	& > *:not(.sidebar) {
		flex-grow: 1;
	}

	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
}
</style>
