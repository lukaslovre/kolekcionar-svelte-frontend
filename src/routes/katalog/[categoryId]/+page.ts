import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, url }) => {
	const apiUrl = 'http://localhost:3000';

	console.log(url.searchParams);
	console.log(params);

	const response = await fetch(`${apiUrl}/kategorije/treeFrom/${params.categoryId}`);
	const data = (await response.json()) as ApiResponse<KategorijaTree>;

	const itemsResponse = await fetch(
		`${apiUrl}/item/underCategory/${params.categoryId}?${url.searchParams}`
	);
	const itemsData = (await itemsResponse.json()) as ApiResponse<Item[]>;

	// console.log(data);

	if (data.error) {
		error(500, data.error);
	}
	if (itemsData.error) {
		error(500, itemsData.error);
	}

	// simulate .pagination
	const offset = 40;
	const limit = 10;

	const currentPage = Math.floor(offset / limit) + 1;
	// const totalPages = Math.ceil(itemsData.data.length / limit);
	const totalPages = Math.ceil(500 / limit);
	// END simulate .pagination

	return {
		title: 'Kategorije page',
		categoryIdParam: params.categoryId,
		categoryTree: data.data,
		items: itemsData.data,
		pagination: {
			offset,
			limit,
			currentPage,
			totalPages
		}
	};
};
