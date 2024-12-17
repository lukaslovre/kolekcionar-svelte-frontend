<script lang="ts">
	import Chevron from '$lib/icons/Chevron.svelte';
	import ImageIcon from '$lib/icons/ImageIcon.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';

	let {
		images,
		joinImageToDirection
	}: { images: ImageResponse[]; joinImageToDirection: (direction: 'left' | 'right') => void } =
		$props();

	let currentImageIndex: number = $state(0);

	const topButtonHandlers = [
		{
			onclick: () => {
				joinImageToDirection('left');
			}
		},
		{
			onclick: () => {
				joinImageToDirection('right');
			}
		}
	];

	function displayNextImage(direction: 'left' | 'right') {
		if (direction === 'left') {
			currentImageIndex = Math.max(0, currentImageIndex - 1);
		} else {
			currentImageIndex = Math.min(images.length - 1, currentImageIndex + 1);
		}
	}
</script>

<div class="relative mb-4 h-48 w-full">
	<img
		src={kolekcionarApi.imagesUrl + '/' + images[currentImageIndex].filename.lowres}
		alt="Item"
		class="h-full w-full rounded-b-md rounded-t-xl object-cover"
	/>

	<!-- top row -->
	<div class="absolute inset-x-4 top-4 flex items-center justify-between">
		{#each topButtonHandlers as { onclick }}
			<button
				type="button"
				class="flex h-10 w-10 items-center justify-center rounded bg-black/80 transition-colors hover:bg-black/90"
				{onclick}
			>
				<span class="text-2xl font-medium text-white">+</span>
			</button>
		{/each}
	</div>

	<!-- bottom-row -->
	<div class="absolute inset-x-4 bottom-4 flex items-center justify-center gap-3">
		<button
			type="button"
			class="flex h-10 w-10 items-center justify-center rounded bg-black/80 transition-colors hover:bg-black/90"
			onclick={() => displayNextImage('left')}
		>
			<Chevron size={24} color={'#fff'} rotate={90} />
		</button>

		<div
			class="flex h-10 items-center justify-center gap-1 rounded bg-black/80 px-4 transition-colors hover:bg-black/90"
		>
			<ImageIcon size={24} color={'#fff'} />
			<span class="font-medium text-white">
				{currentImageIndex + 1} / {images.length}
			</span>
		</div>

		<button
			type="button"
			class="flex h-10 w-10 items-center justify-center rounded bg-black/80 transition-colors hover:bg-black/90"
			onclick={() => displayNextImage('right')}
		>
			<Chevron size={24} color={'#fff'} rotate={-90} />
		</button>
	</div>
</div>
