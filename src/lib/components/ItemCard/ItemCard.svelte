<script lang="ts">
	import ItemTag from './ItemTag.svelte';

	type ItemCardProps = {
		item: Item;
	};

	let { item }: ItemCardProps = $props();
</script>

<a href={`/proizvod/${item.id}`} class="flex flex-col rounded border border-neutral-300 bg-white">
	<img
		src={item.images?.at(0)?.url || '/item-default-img.jpg'}
		alt={item.nazivId}
		class="h-64 w-full rounded object-cover"
	/>

	<div class="flex flex-col gap-2 p-3">
		<p class="text-lg font-semibold">€ {item.cijena}</p>
		{#if item.tags.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each item.tags as tag}
					<ItemTag {tag} />
				{/each}
			</div>
		{/if}
		<h2 class="text-neutral-800">{item.nazivId}</h2>
	</div>
</a>
