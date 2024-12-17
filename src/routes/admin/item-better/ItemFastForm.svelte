<script lang="ts">
	import kolekcionarApi from '$lib/kolekcionarApi';
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

	async function handleSubmitClick() {
		const formattedData = formatDataForSendingToApi(itemForms);

		console.log(formattedData);

		for (let i = 0; i < formattedData.length; i++) {
			const response = await kolekcionarApi.createItem(formattedData[i]);

			console.log(response);

			if (response.error) {
				itemForms[i].baseData[0].error = response.error;
			}
		}
	}

	function formatDataForSendingToApi(itemForms: ItemCreationColumnProps[]) {
		// Format the data for sending to the API
		const items = itemForms.map(({ images, baseData, additionalData, tagsData }) => {
			const imageFilenames: string[] = images.map((image) => image.filename.new);
			const tags: string[] = tagsData.value as string[]; // List of uuid's
			const otherDataValues: Record<string, any> = [...baseData, ...additionalData].reduce(
				(acc, field) => {
					acc[field.id] = field.value !== '' ? field.value : null;
					return acc;
				},
				{} as Record<string, any>
			);

			const otherDataValuesNonEmpty = Object.fromEntries(
				Object.entries(otherDataValues).filter(([_, value]) => value !== null)
			);

			return {
				images: imageFilenames,
				tags,
				...otherDataValuesNonEmpty
			};
		});

		return items;
	}
</script>

<div class="flex flex-col gap-8">
	<button
		type="button"
		class="self-end rounded-lg bg-orange-700 px-4 py-2 font-semibold text-orange-50 transition-colors hover:bg-orange-800"
		onclick={handleSubmitClick}
	>
		Submit all items
	</button>

	<div class="flex w-full gap-16 overflow-x-auto pb-4">
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
					const previousItemFormValue = previousItemFormData.find(
						(field) => field.id === id
					)?.value;

					return previousItemFormValue;
				}}
				joinImageToDirection={(direction) => joinImageToDirection(direction, i)}
			/>
		{/each}
	</div>
</div>
