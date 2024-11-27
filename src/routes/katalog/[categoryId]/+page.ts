import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const apiUrl = 'http://localhost:3000';

	// Is UUIDv4 always the same length?
	// A: Yes, it is always 36 characters long.

	const response = await fetch(`${apiUrl}/kategorije/treeFrom/${params.categoryId}`);
	const data = (await response.json()) as ApiResponse<KategorijaTree>;

	console.log(params);
	console.log(data);

	return {
		title: 'Kategorije page',
		categoryIdParam: params.categoryId,
		categoryTree: data.data
	};
};
