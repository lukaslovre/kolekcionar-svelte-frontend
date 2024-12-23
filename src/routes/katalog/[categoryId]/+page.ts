import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, url }) => {
	const apiUrl = 'http://localhost:3000';

	console.log(url.searchParams);

	const response = await fetch(`${apiUrl}/kategorije/treeFrom/${params.categoryId}`);
	const data = (await response.json()) as ApiResponse<KategorijaTree>;

	const itemsResponse = await fetch(`${apiUrl}/item/underCategory/${params.categoryId}`);
	const itemsData = (await itemsResponse.json()) as ApiResponse<Item[]>;

	console.log(params);
	console.log(data);

	if (data.error) {
		error(500, data.error);
	}
	if (itemsData.error) {
		error(500, itemsData.error);
	}

	return {
		title: 'Kategorije page',
		categoryIdParam: params.categoryId,
		categoryTree: data.data,
		items: itemsData.data
	};
};
