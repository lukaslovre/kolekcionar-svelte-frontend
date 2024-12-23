<script lang="ts">
	import CategoryDescription from '$lib/components/CategoryDescription.svelte';
	import CategoryTree from '$lib/components/CategoryTree/CategoryTree.svelte';
	import ItemCard from '$lib/components/ItemCard/ItemCard.svelte';

	import type { PageData } from './$types';

	type PageProps = {
		data: PageData;
	};

	let { data }: PageProps = $props();
</script>

<main class="flex gap-20">
	<nav class="w-80 shrink-0">
		{#if data.categoryTree}
			<CategoryTree categoryTree={data.categoryTree} />
		{:else}
			<p>Loading...</p>
		{/if}
	</nav>

	<section class="flex-1">
		{#if data.categoryTree?.selectedCategory?.opis}
			<CategoryDescription title="Povijest" text={data.categoryTree.selectedCategory.opis} />
		{/if}

		{#if data.items?.length}
			<section class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 pb-4">
				{#each data.items as item (item.id)}
					<ItemCard {item} />
				{/each}
			</section>
		{:else}
			<p>No items found.</p>
		{/if}
	</section>
</main>
