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

	// Pagination
	// TODO: Ove sve default vrijednosti bi trebalo imat negdje centralno jer ih rucno koristim i na frontendu i na backendu na vise mjesta
	const totalItems =
		data.data.siblings.find((s) => s.id === data.data.selectedCategory.id)?.totalItems || 500;
	const offset = Number(url.searchParams.get('offset')) || 0; // Does NaN get turned into a falsy value and 0 is the default? A: Yes
	const max = Number(url.searchParams.get('max')) || 5;

	const currentPage = Math.floor(offset / max) + 1;
	const totalPages = Math.ceil(totalItems / max);

	return {
		title: 'Kategorije page',
		categoryIdParam: params.categoryId,
		categoryTree: data.data,
		items: itemsData.data,
		pagination: {
			offset,
			limit: max,
			currentPage,
			totalPages,
			totalItems
		}
	};
};
