<script lang="ts">
	import AdminCombobox from '$lib/components/AdminCombobox/AdminCombobox.svelte';

	let {
		onSelectedChange
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
	} = $props();

	const options = [
		{
			label: 'Croatia',
			value: 'hr'
		},
		{
			label: 'Serbia',
			value: 'rs'
		},
		{
			label: 'Bosnia and Herzegovina',
			value: 'ba'
		},
		{
			label: 'Montenegro',
			value: 'me'
		},
		{
			label: 'Slovenia',
			value: 'si'
		}
	];

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
	{options}
	selectedValues={[]}
	allowMultiple={false}
	{onSelectedChange}
	{onAddOption}
/>
