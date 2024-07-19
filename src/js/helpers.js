export const formatDate = str => {
	const date = new Date(str);
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'short' });
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};
