<script lang="ts">
	import AdminCombobox from '$lib/components/AdminCombobox/AdminCombobox.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';

	let {
		onSelectedChange
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
	} = $props();

	let countryOptions: Country[] = $state([]);

	$inspect(countryOptions);

	let comboboxOptions: { label: string; value: string }[] = $derived(
		countryOptions.map((country) => ({
			label: country.name,
			value: country.id
		}))
	);

	// On mount, fetch tags list
	$effect(() => {
		kolekcionarApi.getCountriesList().then((countries) => {
			countryOptions = countries.data;
		});
	});

	async function onAddOption(optionLabel: string) {
		throw new Error('Not implemented');

		return {
			label: optionLabel,
			value: optionLabel.toLowerCase().replace(/\s/g, '-')
		};
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
