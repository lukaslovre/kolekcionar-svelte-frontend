// This is Svelte 5

import { goto } from '$app/navigation';
import { page } from '$app/state';

type filtersFormType =
	| {
			field: string;
			label: string;
			type: 'number';
			min: number | undefined;
			max: number | undefined;
			parser: (value: string) => any;
			validator: (value: any) => boolean;
	  }
	| {
			field: string;
			label: string;
			type: 'string';
			value: string | undefined;
			parser: (value: string) => any;
			validator: (value: any) => boolean;
	  };

function numberValidator(value: any): boolean {
	return typeof value === 'number' && !isNaN(value);
}

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

	private defaultOptions = {
		max: 5,
		offset: 0,
		sort: 'desc',
		sortBy: 'cijena'
	};

	defaultFilters: filtersFormType[] = [
		{
			field: 'cijena',
			label: 'Cijena',
			type: 'number',
			min: undefined,
			max: undefined,
			parser: parseFloat,
			validator: numberValidator
		},
		{
			field: 'nominala',
			label: 'Nominala',
			type: 'number',
			min: undefined,
			max: undefined,
			parser: parseFloat,
			validator: numberValidator
		},
		{
			field: 'countryId',
			label: 'Država',
			type: 'string',
			value: undefined,
			parser: (value: string) => value.trim(),
			validator: (value: any) => true
		}
	];

	options = $state({ ...this.defaultOptions });
	filters = $state(this.defaultFilters);

	// For setting the non-filter options
	setOptions = (key: string, value: any) => {
		// Validate key
		if (!(key in this.defaultOptions)) {
			throw new Error(`Option ${key} is not allowed`);
		}

		this.options = {
			...this.options,
			[key]: value
		};

		this.setUrlFromState();
	};

	// Make a setter type method for filters
	setFilter = (key: string, value: any, valueField: 'min' | 'max' | 'exact') => {
		const fieldIndex = this.filters.findIndex((filter) => filter.field === key);

		if (fieldIndex === -1) {
			throw new Error(`Filter ${key} is not allowed`);
		}

		if (this.filters[fieldIndex].type === 'number') {
			if (valueField === 'min') {
				this.filters[fieldIndex].min = value;
			} else {
				this.filters[fieldIndex].max = value;
			}
		} else if (this.filters[fieldIndex].type === 'string') {
			this.filters[fieldIndex].value = value;
		} else {
			throw new Error(`Filter ${key} has invalid type`);
		}
	};

	// Helper to convert URL params to store state
	fromUrlParams = (urlParams: URLSearchParams) => {
		console.log('fromUrlParams', urlParams);

		const newOptions = {
			max: Number(urlParams.get('max')) || this.defaultOptions.max,
			offset: Number(urlParams.get('offset')) || this.defaultOptions.offset,
			sort: urlParams.get('sort') || this.defaultOptions.sort,
			sortBy: urlParams.get('sortBy') || this.defaultOptions.sortBy
		};

		const newFilters = this.defaultFilters.map((filter) => {
			// Check if exits in URL params
			const value = urlParams.get(filter.field);

			if (!value) {
				return filter;
			}

			// Parse value based on type
			if (filter.type === 'number') {
				// Value could be also just a number, in which case min and max are same
				if (!value.includes('-')) {
					const min = parseFloat(value);
					return { ...filter, min, max: min };
				} else {
					const [min, max] = value.split('-').map((v) => (v ? parseFloat(v) : undefined));

					return { ...filter, min, max };
				}
			} else if (filter.type === 'string') {
				return { ...filter, value };
			}

			return filter;
		});

		this.options = newOptions;
		this.filters = newFilters;

		console.log('fromUrlParams', newOptions, newFilters);
	};

	// Helper to convert store state to URL params
	toUrlParams = () => {
		const urlParams = new URLSearchParams();

		for (const [key, value] of Object.entries(this.options)) {
			urlParams.set(key, value as string);
		}

		// Rules for filters:
		// if its type = number, use this format: `${min}-${max}` (e.g. 10-20, 10-, -20)
		// if its type = string, use this format: `${value}`
		for (const filter of this.filters) {
			if (filter.type === 'number') {
				if (filter.min || filter.max) {
					const value = `${filter.min || ''}-${filter.max || ''}`;
					urlParams.set(filter.field, value);
				}
			} else if (filter.type === 'string') {
				if (filter.value) {
					urlParams.set(filter.field, filter.value);
				}
			}
		}

		return urlParams;
	};

	// For displaying filters in the UI
	toString: () => string[] = () => {
		const options = Object.keys(this.options).map((key) => `${key}: ${(this.options as any)[key]}`);
		const filters = this.filters.map((filter) => {
			if (filter.type === 'number') {
				return `${filter.field}: ${filter.min} - ${filter.max}`;
			} else {
				return `${filter.field}: ${filter.value}`;
			}
		});

		return [...options, ...filters];
	};

	// For resetting filters
	reset = () => {
		this.options = { ...this.defaultOptions };
		this.filters = this.defaultFilters; // TODO: deep copy maybe?
	};

	// Set URL params from store state
	setUrlFromState = () => {
		// Get current url (without search params) and add new search params
		const baseUrl = page.url.origin + page.url.pathname;
		const url = new URL(baseUrl);
		url.search = this.toUrlParams().toString();

		goto(url.toString(), { replaceState: false });
	};

	// Field specific methods:
	toggleSortDirection = () => {
		this.setOptions('sort', this.options.sort === 'asc' ? 'desc' : 'asc');
	};
}

export const filterStore = new FilterStore();
