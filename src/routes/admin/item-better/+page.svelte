<script lang="ts">
	import ImageUploadSection from './ImageUploadSection.svelte';
	import ItemFastForm from './ItemFastForm.svelte';

	let waitingForImageUpload: boolean = $state(true);
	let images: File[] = $state([]);

	function handleSubmitImages(newImages: File[]): void {
		images = newImages;
		waitingForImageUpload = !waitingForImageUpload;
	}
</script>

{#if waitingForImageUpload}
	<ImageUploadSection onSubmitImages={handleSubmitImages} />
{:else}
	<ItemFastForm {images} />
{/if}
