<script lang="ts">
	import GroupedAdminCombobox from '$lib/components/GroupedAdminCombobox/GroupedAdminCombobox.svelte';
	import { getHoverInfoFromTag } from '$lib/utils/tagUtils';
	import { tagsComboboxStore } from './TagsComboboxStore.svelte';

	type GroupedOption = {
		groupName: string;
		options: {
			label: string;
			value: string;
			hoverInfo: string;
		}[];
	};

	let {
		onSelectedChange,
		selectedValues = []
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
		selectedValues: string[];
	} = $props();

	let groupedTagOptions = $derived(
		tagsComboboxStore.tagOptions.reduce(
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
</script>

<GroupedAdminCombobox
	label="Tags"
	options={formattedTagOptions}
	{selectedValues}
	{onSelectedChange}
	adminMode={false}
/>
