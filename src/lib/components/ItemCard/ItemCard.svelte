<script lang="ts">
	import kolekcionarApi from '$lib/kolekcionarApi';
	import ItemTag from './ItemTag.svelte';

	type ItemCardProps = {
		item: Item;
	};

	let { item }: ItemCardProps = $props();

	const imageUrl = (() => {
		const url = item.images.at(0)?.url;

		if (url == undefined) {
			return '/item-default-img.jpg';
		} else if (url.startsWith('http')) {
			return url;
		} else {
			return kolekcionarApi.imagesUrl + '/lowres-' + url;
			// return kolekcionarApi.imagesUrl + '/' + url;
		}
	})();
</script>

<!-- border border-neutral-300 -->
<div class="flex flex-col rounded-lg bg-white/75 shadow-md">
	<img
		src={imageUrl || '/item-default-img.jpg'}
		alt={item.nazivId}
		class="h-64 w-full rounded-lg rounded-b-sm object-cover"
	/>

	<div class="flex flex-1 flex-col gap-2 p-4">
		<a href={`/proizvod/${item.id}`} class="text-xl font-semibold text-neutral-800 hover:underline"
			>{item.nazivId}</a
		>
		<p class="text-lg font-medium text-neutral-700">€{item.cijena}</p>
		{#if item.tags.length > 0}
			<div class="my-2 flex flex-wrap gap-2">
				{#each item.tags as tag}
					<ItemTag {tag} />
				{/each}
			</div>
		{/if}
		<button
			class="mt-auto rounded-lg bg-sky-800 py-3 font-medium text-white
		transition-colors hover:bg-sky-900"
		>
			Dodaj u košaricu
		</button>
	</div>
</div>
