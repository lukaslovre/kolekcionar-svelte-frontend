<script lang="ts">
	import AdminCombobox from '$lib/components/AdminCombobox/AdminCombobox.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';

	let {
		onSelectedChange
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
	} = $props();

	let tagOptions: Tag[] = $state([]);

	// On mount, fetch tags list
	$effect(() => {
		kolekcionarApi.getTagsList().then((response) => {
			tagOptions = response.data;
		});
	});

	async function handleAddOption(option: string): Promise<{
		label: string;
		value: string;
	}> {
		const response = await kolekcionarApi.createTag({ naziv: option });

		console.log(response);

		if (!response.data?.id || !response.data?.naziv) {
			throw new Error(response.message || 'Invalid response data');
		}

		return {
			label: response.data.naziv,
			value: response.data.id
		};
	}
</script>

<AdminCombobox
	label="Tags"
	options={tagOptions.map((tag) => ({ label: tag.naziv, value: tag.id }))}
	selectedValues={[]}
	{onSelectedChange}
	onAddOption={handleAddOption}
/>
