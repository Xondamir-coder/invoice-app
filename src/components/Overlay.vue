<template>
	<div class="overlay" @click="$emit('close')"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.overlay {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.703);
	position: fixed;
	inset: 0;
	transition: opacity 300ms, visibility 300ms;
	cursor: pointer;
	z-index: 1;
}
</style>
