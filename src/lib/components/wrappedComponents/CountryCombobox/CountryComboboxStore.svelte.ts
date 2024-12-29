// This is Svelte 5

import kolekcionarApi from '$lib/kolekcionarApi';

class CountryComboboxStore {
	countryOptions: Country[] = $state([]);

	async initializeStore(): Promise<void> {
		try {
			const response = await kolekcionarApi.getCountriesList();
			console.log(response);

			if (response.error) throw new Error(response.error);

			this.countryOptions = response.data;
		} catch (error) {
			console.log(error);
		}
	}

	addCountry(newCountry: Country): void {
		this.countryOptions.push(newCountry);
	}
}

export const countryComboboxStore = new CountryComboboxStore();
