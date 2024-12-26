<script lang="ts">
	import { page } from '$app/state';
	import CategoryDescription from '$lib/components/CategoryDescription.svelte';
	import CategoryTree from '$lib/components/CategoryTree/CategoryTree.svelte';
	import ItemCard from '$lib/components/ItemCard/ItemCard.svelte';

	import type { PageData } from './$types';
	import { filterStore } from './filterStore.svelte';
	import Pagination from './Pagination.svelte';
	import SearchInput from './SearchInput.svelte';
	import SortButton from './SortButton.svelte';

	type PageProps = {
		data: PageData;
	};

	let { data }: PageProps = $props();

	$effect(() => {
		let queryParams: URLSearchParams = page.url.searchParams;
		console.log(page.url);

		filterStore.fromUrlParams(queryParams);
	});
</script>

<main class="flex gap-20">
	<nav class="w-80 shrink-0">
		{#if data.categoryTree}
			<CategoryTree categoryTree={data.categoryTree} />
		{:else}
			<p>Loading...</p>
		{/if}
	</nav>

	<section class="flex flex-1 flex-col gap-10">
		{#if data.categoryTree?.selectedCategory?.opis}
			<CategoryDescription title="Povijest" text={data.categoryTree.selectedCategory.opis} />
		{/if}

		{#if data.items?.length}
			<div class="flex flex-col gap-6">
				<div class="filter-and-sort flex gap-4">
					<SearchInput onInput={(value) => console.log(value)} />
					<SortButton />
				</div>

				<!-- Active filters -->
				<div class="rounded-md border border-orange-200 p-2">
					<span class="text-sm font-semibold text-orange-900">Active filters:</span>
					<div class="mt-1 flex flex-wrap items-center gap-2">
						{#each filterStore.toString() as filter}
							<span class="rounded-md bg-orange-200 px-2 py-1 text-xs font-semibold text-orange-900"
								>{filter}</span
							>
						{/each}
					</div>
				</div>

				<section class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 pb-4">
					{#each data.items as item (item.id)}
						<ItemCard {item} />
					{/each}
				</section>
			</div>
		{:else}
			<p>No items found.</p>
		{/if}

		{#if data.pagination}
			<Pagination pagination={data.pagination} />
		{/if}
	</section>
</main>
