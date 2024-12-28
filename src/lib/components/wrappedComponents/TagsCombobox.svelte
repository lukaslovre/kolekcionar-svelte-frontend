<script lang="ts">
	import AdminCombobox from '$lib/components/AdminCombobox/AdminCombobox.svelte';
	import GroupedAdminCombobox from '$lib/components/GroupedAdminCombobox/GroupedAdminCombobox.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';
	import { getHoverInfoFromTag } from '$lib/utils/tagUtils';

	let {
		onSelectedChange
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
	} = $props();

	let tagOptions: Tag[] = $state([]);

	$inspect(tagOptions);

	// Group the tagOptions by their .group property.
	// This is the `options` prop that the GroupedAdminCombobox expects.
	// 	options: {
	// 	groupName: string;
	// 	options: {
	// 		label: string;
	// 		value: string;
	// 		hoverInfo: string;
	// 	}[];
	// }[];

	let comboboxOptions = $derived(
		tagOptions.reduce(
			(acc, tag) => {
				const group = tag.group;

				if (!acc[group]) {
					acc[group] = [];
				}

				acc[group].push({
					label: tag.naziv,
					value: tag.id,
					hoverInfo: getHoverInfoFromTag(tag)
				});

				return acc;
			},
			{} as Record<string, { label: string; value: string; hoverInfo: string }[]>
		)
	);

	$inspect(comboboxOptions);

	// On mount, fetch tags list
	$effect(() => {
		kolekcionarApi.getTagsList().then((response) => {
			tagOptions = response.data;
		});
	});

	// async function handleAddOption(option: string): Promise<{
	// 	label: string;
	// 	value: string;
	// 	hoverInfo: string;
	// }> {
	// 	const response = await kolekcionarApi.createTag({ naziv: option });

	// 	console.log(response);

	// 	if (!response.data?.id || !response.data?.naziv) {
	// 		throw new Error(response.message || 'Invalid response data');
	// 	}

	// 	return {
	// 		label: response.data.naziv,
	// 		value: response.data.id
	// 	};
	// }
</script>

<!-- <AdminCombobox
	label="Tags"
	options={tagOptions.map((tag) => ({ label: tag.naziv, value: tag.id }))}
	selectedValues={[]}
	{onSelectedChange}
	onAddOption={handleAddOption}
/> -->

<GroupedAdminCombobox
	label="Tags"
	options={Object.entries(comboboxOptions).map(([groupName, options]) => ({
		groupName,
		options
	}))}
	selectedValues={[]}
	{onSelectedChange}
/>
<!-- onAddOption={handleAddOption} -->
