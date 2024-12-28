<script lang="ts">
	import GroupedAdminCombobox from '$lib/components/GroupedAdminCombobox/GroupedAdminCombobox.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';
	import { getHoverInfoFromTag } from '$lib/utils/tagUtils';

	type GroupedOption = {
		groupName: string;
		options: {
			label: string;
			value: string;
			hoverInfo: string;
		}[];
	};

	let {
		onSelectedChange
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
	} = $props();

	let tagOptions: Tag[] = $state([]);

	let groupedTagOptions = $derived(
		tagOptions.reduce(
			(acc, tag) => {
				const group = tag.group;

				// If the group doesn't exist in the accumulator, create it
				if (!acc[group]) {
					acc[group] = [];
				}

				// Transform the Tag object into the format that the GroupedAdminCombobox expects
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

	let formattedTagOptions: GroupedOption[] = $derived(
		Object.entries(groupedTagOptions).map(([groupName, options]) => ({
			groupName,
			options
		}))
	);

	$inspect(formattedTagOptions);

	// On mount, fetch tags list
	$effect(() => {
		kolekcionarApi.getTagsList().then((response) => {
			tagOptions = response.data;
		});
	});
</script>

<GroupedAdminCombobox
	label="Tags"
	options={formattedTagOptions}
	selectedValues={[]}
	{onSelectedChange}
/>
<!-- onAddOption={handleAddOption} -->
