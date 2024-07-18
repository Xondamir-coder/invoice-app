import { defineStore } from 'pinia';
import { ref } from 'vue';

const getTheme = () => {
	const theme = localStorage.getItem('theme') || 'light';
	theme === 'light'
		? document.body.classList.remove('dark')
		: document.body.classList.add('dark');
	return ref(theme);
};

export const useThemeStore = defineStore('theme', () => {
	const theme = getTheme();

	const toggleTheme = () => {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
		document.body.classList.toggle('dark');
		localStorage.setItem('theme', theme.value);
	};

	return { theme, toggleTheme };
});
