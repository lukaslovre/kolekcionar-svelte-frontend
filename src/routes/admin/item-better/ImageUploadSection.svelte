<script lang="ts">
	import { bytesToHumanReadable } from '$lib/utils/formattingUtils';

	type ImageUploadSectionProps = {
		onSubmitImages: (images: File[]) => void;
	};

	let { onSubmitImages }: ImageUploadSectionProps = $props();

	let images: File[] = $state([]);
	// $inspect(images);

	// File dropzone
	let dragActive: boolean = $state(false);

	function handleDrag(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		dragActive = e.type === 'dragenter' || e.type === 'dragover';
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		dragActive = false;

		if (e.dataTransfer?.files) {
			handleFiles(e.dataTransfer.files);
		}
	}

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			handleFiles(target.files);
		}
	}

	function handleFiles(files: FileList) {
		images = Array.from(files);
	}

	// Image reordering
	let draggedIndex: number = $state(-1);

	function handleDragStart(e: DragEvent, index: number) {
		draggedIndex = index;
		// Required for Firefox
		e.dataTransfer?.setData('text/plain', '');
	}

	function handleDragEnd(e: DragEvent) {
		draggedIndex = -1;
	}

	function handleDragOver(e: DragEvent, index: number) {
		e.preventDefault();
		if (draggedIndex === index) return;

		const items = [...images];
		const draggedItem = items[draggedIndex];
		items.splice(draggedIndex, 1);
		items.splice(index, 0, draggedItem);
		images = items;
		draggedIndex = index;
	}
</script>

<div
	class="flex h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed
           border-orange-200 bg-orange-100 p-4 transition-colors
           {dragActive ? 'border-orange-500 bg-orange-200' : ''}"
	ondragenter={handleDrag}
	ondragleave={handleDrag}
	ondragover={handleDrag}
	ondrop={handleDrop}
	role="button"
	tabindex="0"
>
	<input
		type="file"
		id="file-upload"
		class="hidden"
		accept="image/*"
		onchange={handleChange}
		multiple
	/>
	<label for="file-upload" class="cursor-pointer text-center text-xl font-semibold text-orange-800">
		<p>Drag images here or click to upload</p>
	</label>
</div>

{#if images.length > 0}
	<ul class="mt-8 flex flex-col gap-2">
		{#each images as image, i (image.name)}
			<li
				class="flex items-center gap-6 border-y border-gray-200 p-2 {draggedIndex === i
					? 'bg-orange-200'
					: ''}"
				draggable="true"
				ondragstart={(e) => handleDragStart(e, i)}
				ondragend={handleDragEnd}
				ondragover={(e) => handleDragOver(e, i)}
			>
				<div class="h-4 w-4 rounded-full bg-neutral-500"></div>
				<img
					src={URL.createObjectURL(image)}
					alt={image.name}
					class="h-16 w-16 rounded-lg object-cover"
				/>
				<span>
					{image.name} - {bytesToHumanReadable(image.size)}
				</span>
			</li>
		{/each}
	</ul>
{/if}

{#if images.length > 0}
	<button
		class="mt-8 w-full rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-700"
		onclick={() => {
			onSubmitImages(images);
		}}
	>
		Upload
	</button>
{/if}
