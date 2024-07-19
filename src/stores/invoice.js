import { defineStore } from 'pinia';
import { ref } from 'vue';
import data from '@/data.json';

const getInvoices = () => ref(JSON.parse(localStorage.getItem('invoices')) || data);
const setInvoices = invoices => localStorage.setItem('invoices', JSON.stringify(invoices));

export const useInvoiceStore = defineStore('invoice', () => {
	const invoices = getInvoices();

	const markAsPaid = invoice => {
		if (invoice.status === 'paid') return;
		invoice.status = 'paid';
		setInvoices(invoices.value);
	};

	const deleteInvoice = invoice => {
		invoices.value = invoices.value.filter(i => i.id !== invoice.id);
		setInvoices(invoices.value);
	};

	return { invoices, markAsPaid, deleteInvoice };
});
