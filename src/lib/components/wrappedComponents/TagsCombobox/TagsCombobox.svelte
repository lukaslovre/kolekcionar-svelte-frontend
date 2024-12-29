<script lang="ts">
	import GroupedAdminCombobox from '$lib/components/GroupedAdminCombobox/GroupedAdminCombobox.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';
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
		onSelectedChange
	}: {
		onSelectedChange: (comboboxValues: string[]) => void;
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

	type CreateTag = Omit<Tag, 'id' | 'items'>;
	async function onAddOption(newTag: CreateTag): Promise<string> {
		const response = await kolekcionarApi.createTag(newTag);

		console.log(response);

		// Nekakav check da li je uspjesno kreiran tag
		if (!response.data.id || response.error) {
			throw new Error('Tag creation failed.' + response.error);
		}

		tagsComboboxStore.addTag(response.data);

		return response.data.id;
	}
</script>

<GroupedAdminCombobox
	label="Tags"
	options={formattedTagOptions}
	selectedValues={[]}
	{onSelectedChange}
	{onAddOption}
/>
