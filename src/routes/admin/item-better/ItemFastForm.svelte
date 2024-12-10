<script lang="ts">
	import ItemCreationColumn from './ItemCreationColumn.svelte';
	import { createItemCreationColumnData, type ItemCreationColumnProps } from './ItemFastFormConfig';

	type ItemFastFormProps = {
		images: File[];
	};

	let { images }: ItemFastFormProps = $props();

	$inspect(images);

	let itemForms: ItemCreationColumnProps[] = $state(
		images.map((image) => createItemCreationColumnData(image))
	);

	$inspect(itemForms);
</script>

<div class="flex w-full gap-16 overflow-x-auto px-8">
	{#each itemForms as itemForm, i}
		<ItemCreationColumn {...itemForm} />
	{/each}
</div>
