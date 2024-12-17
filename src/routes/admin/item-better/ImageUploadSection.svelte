<script lang="ts">
	import Chevron from '$lib/icons/Chevron.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';
	import { bytesToHumanReadable } from '$lib/utils/formattingUtils';

	type ImageUploadSectionProps = {
		onSubmitImages: (images: File[]) => void;
	};

	let { onSubmitImages }: ImageUploadSectionProps = $props();

	type ImageUploadState = {
		data: ImageResponse;
		uploading: 'pending' | 'uploading' | 'done';
		error: string;
	};
	let imageUploadStates: ImageUploadState[] = $state([]);

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

	async function handleFiles(files: FileList) {
		const filesArray = Array.from(files);

		imageUploadStates = filesArray.map((file) => ({
			data: {
				filename: {
					original: file.name,
					new: '',
					lowres: ''
				},
				filesize: {
					original: file.size,
					lowres: 0
				}
			},
			uploading: 'pending',
			error: ''
		}));

		// Upload images one by one
		for (let i = 0; i < filesArray.length; i++) {
			try {
				imageUploadStates[i].uploading = 'uploading';

				const response = await kolekcionarApi.uploadImage(filesArray[i]);

				imageUploadStates[i] = {
					data: response.data,
					uploading: 'done',
					error: ''
				};
			} catch (error) {
				console.error(error);
				// TODO handle error (kolekcionarApi class should throw error if status is not 200)
			}
		}
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

		const items = [...imageUploadStates];
		const draggedItem = items[draggedIndex];
		items.splice(draggedIndex, 1);
		items.splice(index, 0, draggedItem);
		imageUploadStates = items;
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

{#if imageUploadStates.length > 0}
	<ul class="mt-8 flex flex-col gap-2">
		{#each imageUploadStates as { data, uploading, error }, i}
			<li
				class="flex items-center gap-6 border-y border-gray-200 p-2 {draggedIndex === i
					? 'bg-orange-200'
					: ''}"
				draggable="true"
				ondragstart={(e) => handleDragStart(e, i)}
				ondragend={handleDragEnd}
				ondragover={(e) => handleDragOver(e, i)}
			>
				<div class="flex flex-col">
					<Chevron size={24} color={'#808080'} rotate={180} />
					<Chevron size={24} color={'#808080'} rotate={0} />
				</div>
				<img
					src={data.filename.lowres
						? kolekcionarApi.imagesUrl + '/' + data.filename.lowres
						: '/item-default-img.jpg'}
					alt={data.filename.original}
					class="h-16 w-16 overflow-hidden rounded-lg object-cover"
				/>
				<div class="flex flex-col items-start gap-2 self-start">
					<p class="text-sm font-medium text-neutral-800">
						{data.filename.original}
					</p>

					<div class="flex gap-2 text-xs font-medium text-neutral-700">
						<p>
							{bytesToHumanReadable(data.filesize.original)}
						</p>
						<span>•</span>
						<p>
							Lowres: {bytesToHumanReadable(data.filesize.lowres)}
						</p>
					</div>

					{#if error}
						<span class="rounded-md bg-red-200 px-2 py-1 text-xs font-semibold text-red-900">
							{error}
						</span>
					{:else if uploading === 'pending'}
						<span class="rounded-md bg-amber-200 px-2 py-1 text-xs font-semibold text-amber-900">
							Waiting to upload...
						</span>
					{:else if uploading === 'uploading'}
						<span class="rounded-md bg-indigo-200 px-2 py-1 text-xs font-semibold text-indigo-900">
							Uploading...
						</span>
					{:else if uploading === 'done'}
						<span class="rounded-md bg-green-200 px-2 py-1 text-xs font-semibold text-green-900">
							Done!
						</span>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{/if}

{#if imageUploadStates.every((state) => state.uploading === 'done') && imageUploadStates.length > 0}
	<button
		class="mt-8 w-full rounded-lg bg-orange-700 px-4 py-2 font-semibold text-orange-50 transition-colors hover:bg-orange-800"
		onclick={() => {
			// onSubmitImages(imageUploadStates);
		}}
	>
		Upload
	</button>
{/if}
