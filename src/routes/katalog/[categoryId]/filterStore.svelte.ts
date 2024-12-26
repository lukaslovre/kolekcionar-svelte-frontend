// This is Svelte 5

import { goto } from '$app/navigation';
import { page } from '$app/state';

class FilterStore {
	private allowedFilters = {
		cijena: 'number',
		limit: 'number',
		tags: 'string[]',
		vrijemeDodavanja: 'number',
		tip: 'string',
		countryId: 'string',
		nominala: 'number',
		godina: 'number',
		mintage: 'number',
		promjer: 'number',
		masa: 'number',
		visina: 'number',
		sirina: 'number',
		duljina: 'number'
	};

	private defaultFilters = {
		max: 5,
		offset: 0,
		sort: 'desc',
		sortBy: 'cijena'
	};

	filters = $state(this.defaultFilters);

	// Make a setter type method for filters
	setFilter = (key: string, value: any) => {
		// // Validate key
		// if (!(key in this.allowedFilters) && !(key in this.defaultFilters)) {
		// 	throw new Error(`Filter ${key} is not allowed`);
		// }

		this.filters = {
			...this.filters,
			[key]: value
		};

		// Get current url (without search params) and add new search params
		const baseUrl = page.url.origin + page.url.pathname;
		const url = new URL(baseUrl);
		url.search = this.toUrlParams().toString();

		goto(url.toString(), { replaceState: true });
	};

	// Helper to convert URL params to store state
	fromUrlParams = (urlParams: URLSearchParams) => {
		console.log('fromUrlParams', urlParams);

		const filters = {
			max: Number(urlParams.get('max')) || 5,
			offset: Number(urlParams.get('offset')) || 0,
			sort: urlParams.get('sort') || 'desc',
			sortBy: urlParams.get('sortBy') || 'cijena',

			// Filter out only allowed filters
			...Object.fromEntries(
				Array.from(urlParams.entries()).filter(([key, value]) => {
					if (key in this.allowedFilters) {
						// TODO: parse value based on type
						return true;
					}
					return false;
				})
			)
		};

		this.filters = filters;

		console.log('fromUrlParams', filters);
	};

	// Helper to convert store state to URL params
	toUrlParams = () => {
		const urlParams = new URLSearchParams();

		for (const [key, value] of Object.entries(this.filters)) {
			urlParams.set(key, value as string);
		}

		return urlParams;
	};

	// For displaying filters in the UI
	toString: () => string[] = () => {
		return Object.keys(this.filters).map((key) => `${key}: ${(this.filters as any)[key]}`);
	};

	// For resetting filters
	reset = () => {
		this.filters = this.defaultFilters;
	};

	// Field specific methods:
	toggleSortDirection = () => {
		this.setFilter('sort', this.filters.sort === 'asc' ? 'desc' : 'asc');
	};
}

export const filterStore = new FilterStore();
