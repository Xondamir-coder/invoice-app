import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import data from '@/data.json';
import { useRoute } from 'vue-router';

const getInvoices = () => ref(JSON.parse(localStorage.getItem('invoices')) || data);
const setInvoices = invoices => localStorage.setItem('invoices', JSON.stringify(invoices));

export const useInvoiceStore = defineStore('invoice', () => {
	const route = useRoute();

	const invoices = getInvoices();
	const invoice = computed(() => invoices.value.find(i => i.id == route.params.id));

	const markAsPaid = () => {
		if (invoice.value.status === 'paid') return;
		invoice.value.status = 'paid';
		setInvoices(invoices.value);
	};

	const deleteInvoice = () => {
		invoices.value = invoices.value.filter(i => i.id !== invoice.value.id);
		setInvoices(invoices.value);
	};

	const addInvoice = newInvoice => {
		invoices.value = [...invoices.value, newInvoice];
		setInvoices(invoices.value);
	};

	const updateInvoice = updatedInvoice => {
		invoices.value = invoices.value.map(invoice => {
			if (invoice.id === updatedInvoice.id) {
				return updatedInvoice;
			}
			return invoice;
		});
		setInvoices(invoices.value);
	};

	return { invoices, invoice, markAsPaid, deleteInvoice, addInvoice, updateInvoice };
});
