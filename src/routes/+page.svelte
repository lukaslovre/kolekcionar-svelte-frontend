<script lang="ts">
	import CategoryTree from '$lib/components/CategoryTree/CategoryTree.svelte';
	import ItemCard from '$lib/components/ItemCard/ItemCard.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';

	let categoryTree: KategorijaTree | undefined = $state();

	$effect(() => {
		getKategorije();
	});

	async function getKategorije() {
		const { data } = await kolekcionarApi.getKategorijaFromRoot();
		console.log(data);

		categoryTree = data;
	}

	async function fetchCategoryTreeFromId(id: string) {
		const { data } = await kolekcionarApi.getKategorijaById(id);
		console.log(data);

		categoryTree = data;
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
		if (categoryTree) {
			getItems(categoryTree.selectedCategory.id);
		}
	});
</script>

<main class="flex gap-20">
	<nav class="w-80 shrink-0">
		{#if categoryTree}
			<CategoryTree {categoryTree} {fetchCategoryTreeFromId} />
		{:else}
			<p>Loading...</p>
		{/if}
	</nav>

	<section class="flex flex-1 flex-wrap gap-8">
		{#if itemsLoading}
			<p>Loading...</p>
		{:else}
			{#each items as item (item.id)}
				<ItemCard {item} />
			{/each}
		{/if}
	</section>
</main>
