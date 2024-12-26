<script lang="ts">
	import { filterStore } from './filterStore.svelte';

	type PaginationProps = {
		pagination: {
			offset: number;
			limit: number;
			currentPage: number;
			totalPages: number;
		};
	};

	let { pagination }: PaginationProps = $props();

	function handleMaxItemsPerPageChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		filterStore.setFilter('max', target.value);
	}
</script>

<section class=" flex flex-col items-center justify-center gap-4">
	<nav class="flex flex-wrap justify-center gap-4">
		{#each Array.from({ length: pagination.totalPages }).map((_, i) => i + 1) as page}
			<button
				onclick={() => console.log(page)}
				class="flex h-10 w-10 items-center justify-center rounded text-xs font-semibold {pagination.currentPage ===
				page
					? 'bg-sky-800 text-white'
					: 'bg-sky-500/10 text-sky-900 hover:bg-sky-500/50'} transition-colors"
			>
				{page}
			</button>
		{/each}
	</nav>

	<!-- Set max items per page -->
	<select
		class="rounded border border-black/15 bg-white p-4 text-sm font-semibold shadow"
		onchange={handleMaxItemsPerPageChange}
		value={filterStore.filters.max.toString()}
	>
		<option value="10">10</option>
		<option value="20">20</option>
		<option value="50">50</option>
		<option value="100">100</option>
	</select>
</section>
