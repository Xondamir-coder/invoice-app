import { defineStore } from 'pinia';
import { ref } from 'vue';
import data from '@/data.json';

export const useInvoiceStore = defineStore('invoice', () => {
	const invoices = ref(data);

	const filterByStatus = options => {
		const changedOptions = options.map(e => e.toLowerCase());
		if (!options.length) {
			invoices.value = data;
			return;
		}
		invoices.value = data.filter(invoice => changedOptions.includes(invoice.status));
	};

	return { invoices, filterByStatus };
});
