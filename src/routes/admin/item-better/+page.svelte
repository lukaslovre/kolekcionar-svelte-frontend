<script lang="ts">
	import ImageUploadSection from './ImageUploadSection.svelte';
	import ItemFastForm from './ItemFastForm.svelte';

	let waitingForImageUpload: boolean = $state(true);
	let images: File[] = $state([]);

	function handleSubmitImages(newImages: File[]): void {
		waitingForImageUpload = !waitingForImageUpload;
		images = newImages;
	}
</script>

{#if waitingForImageUpload}
	<ImageUploadSection onSubmitImages={handleSubmitImages} />
{:else}
	<ItemFastForm {images} />
{/if}
