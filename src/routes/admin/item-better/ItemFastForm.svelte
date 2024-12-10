<script lang="ts">
	import ItemCreationColumn from './ItemCreationColumn.svelte';

	type ItemFastFormProps = {
		images: File[];
	};

	let { images }: ItemFastFormProps = $props();

	$inspect(images);
</script>

<div class="flex w-full gap-16 overflow-x-auto px-8">
	{#each images as image, i (image.name)}
		<ItemCreationColumn imageUrl={URL.createObjectURL(image)} />
	{/each}
</div>
