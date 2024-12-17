<script lang="ts">
	import ItemCreationColumn from './ItemCreationColumn.svelte';
	import { createItemCreationColumnData } from './ItemFastFormConfig';
	import type { ItemCreationColumnProps } from './ItemFastFormConfig';

	type ItemFastFormProps = {
		images: ImageResponse[];
	};

	let { images }: ItemFastFormProps = $props();

	$inspect(images);

	//

	let itemForms: ItemCreationColumnProps[] = $state(
		images.map((image) => createItemCreationColumnData(image))
	);

	$inspect(itemForms);

	// Image joining logic
	function joinImageToDirection(direction: 'left' | 'right', fromIndex: number) {
		const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;

		if (toIndex < 0 || toIndex >= itemForms.length) {
			return;
		}

		const fromIndexImages = itemForms[fromIndex].images;
		const toIndexImages = itemForms[toIndex].images;

		itemForms[toIndex].images = [...toIndexImages, ...fromIndexImages];

		// remove the form from the list
		itemForms.splice(fromIndex, 1);
	}
</script>

<div class="flex w-full gap-16 overflow-x-auto p-4">
	{#each itemForms as itemForm, i (itemForm.images[0])}
		<ItemCreationColumn
			images={itemForm.images}
			bind:baseData={itemForm.baseData}
			bind:tagsData={itemForm.tagsData}
			bind:additionalData={itemForm.additionalData}
			onButtonClick={(value) => {
				// const clickedItemForm = itemForms[i];
				// const nextItemFormValue = itemForms[i + 1].baseData.find(
				// 	(field) => field.id === 'kategorijaId'
				// )?.value;
				// itemForms[i].baseData.find((field) => field.id === 'kategorijaId')!.value =
				// 	nextItemFormValue;
				// console.log(nextItemFormValue);
			}}
			getPreviousItemValue={(id) => {
				if (i === 0) {
					return;
				}

				// Join baseData and additionalData
				const previousItemForm = itemForms[i - 1];
				const previousItemFormData = [
					...previousItemForm.baseData,
					...previousItemForm.additionalData
				];

				// Find the previous item form value
				const previousItemFormValue = previousItemFormData.find((field) => field.id === id)?.value;

				return previousItemFormValue;
			}}
			joinImageToDirection={(direction) => joinImageToDirection(direction, i)}
		/>
	{/each}
</div>
