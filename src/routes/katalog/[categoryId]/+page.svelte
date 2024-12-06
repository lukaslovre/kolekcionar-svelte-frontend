<script lang="ts">
	import CategoryDescription from '$lib/components/CategoryDescription.svelte';
	import CategoryTree from '$lib/components/CategoryTree/CategoryTree.svelte';
	import ItemCard from '$lib/components/ItemCard/ItemCard.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';

	import type { PageData } from './$types';

	type PageProps = {
		data: PageData;
	};

	let { data }: PageProps = $props();

	async function fetchCategoryTreeFromId(id: string) {
		// const { data } = await kolekcionarApi.getKategorijaById(id);
		// console.log(data);
		// categoryTree = data;
	}

	// Items

	let items: Item[] = $state([]);
	let itemsLoading: boolean = $state(false);

	async function getItems(categoryId: string) {
		itemsLoading = true;
		const { data } = await kolekcionarApi.getItemsUnderCategory(categoryId);
		console.log(data);
		itemsLoading = false;
		items = data;
	}

	$effect(() => {
		if (data.categoryTree) {
			getItems(data.categoryTree.selectedCategory.id);
		}
	});
</script>

<main class="flex gap-20">
	<nav class="w-80 shrink-0">
		{#if data.categoryTree}
			<CategoryTree categoryTree={data.categoryTree} {fetchCategoryTreeFromId} />
		{:else}
			<p>Loading...</p>
		{/if}
	</nav>

	<section class="flex-1 overflow-y-auto">
		{#if data.categoryTree?.selectedCategory?.opis}
			<CategoryDescription title="Povijest" text={data.categoryTree.selectedCategory.opis} />
		{/if}

		{#if itemsLoading}
			<p>Loading...</p>
		{:else}
			<section class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 pb-4">
				{#each items as item (item.id)}
					<ItemCard {item} />
				{/each}
			</section>
		{/if}
	</section>
</main>
