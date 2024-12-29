<script lang="ts">
	import AdminCombobox from '$lib/components/AdminCombobox/AdminCombobox.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';
	import { countryComboboxStore } from './CountryComboboxStore.svelte';

	let {
		onSelectedChange
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
	} = $props();

	// Format the country options in the way that the AdminCombobox expects
	let comboboxOptions: { label: string; value: string }[] = $derived(
		countryComboboxStore.countryOptions.map((country) => ({
			label: country.name,
			value: country.id
		}))
	);

	$inspect(comboboxOptions);

	async function onAddOption(optionLabel: string): Promise<string> {
		throw new Error('Not implemented');

		return '';
	}
</script>

<AdminCombobox
	label="Country"
	options={comboboxOptions}
	selectedValues={[]}
	allowMultiple={false}
	{onSelectedChange}
	{onAddOption}
/>
