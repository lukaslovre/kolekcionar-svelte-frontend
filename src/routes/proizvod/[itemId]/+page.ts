import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const apiUrl = 'http://localhost:3000';

	// Fetch item data
	const response = await fetch(`${apiUrl}/item/${params.itemId}`);

	const data = (await response.json()) as ApiResponse<Item | null>;

	console.log(params);
	console.log(data);

	return {
		title: 'Prozvod page',
		itemIdParam: params.itemId,
		item: data.data
	};
};
