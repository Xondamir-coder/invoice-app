import { useInvoiceStore } from '@/stores/invoice';

export const formatDate = str => {
	const date = new Date(str);
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'short' });
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};

export const generateRandomID = () => {
	const invoiceStore = useInvoiceStore();
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numbers = '0123456789';

	let id = '';

	// Generate first 2 uppercase letters
	for (let i = 0; i < 2; i++) {
		id += letters.charAt(Math.floor(Math.random() * letters.length));
	}

	// Generate last 4 numbers
	for (let i = 0; i < 4; i++) {
		id += numbers.charAt(Math.floor(Math.random() * numbers.length));
	}

	if (invoiceStore.invoices.some(invoice => invoice.id == id)) {
		generateRandomID();
	}

	return id;
};
