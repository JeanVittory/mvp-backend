export const paginationFormater = (page: string | number, pageSize: string | number) => {
	const pagination = {
		page: +page || 1,
		pageSize: +pageSize || 10,
	};
	if (pagination.page <= 0 || pagination.pageSize <= 0) {
		return {
			page: 1,
			pageSize: 10,
		};
	}
	return pagination;
};
