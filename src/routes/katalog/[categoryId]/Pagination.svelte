<script lang="ts">
	import { filterStore } from './filterStore.svelte';

	type PaginationProps = {
		pagination: {
			offset: number;
			limit: number;
			currentPage: number;
			totalPages: number;
			totalItems: number;
		};
	};

	let { pagination }: PaginationProps = $props();

	function handleMaxItemsPerPageChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		filterStore.setOptions('max', target.value);
	}

	function handlePageChange(page: number) {
		console.log(page);

		// Get offset from page
		// This is the opposite from backend: const currentPage = Math.floor(offset / max) + 1;
		const offset = (page - 1) * filterStore.options.max;
		console.log('offset:', offset);

		filterStore.setOptions('offset', offset);
	}
</script>

<section class=" flex flex-col items-center justify-center gap-4">
	<nav class="flex flex-wrap justify-center gap-4">
		{#each Array.from({ length: pagination.totalPages }).map((_, i) => i + 1) as page}
			<button
				onclick={() => handlePageChange(page)}
				class="flex h-10 w-10 items-center justify-center rounded text-xs font-semibold {pagination.currentPage ===
				page
					? 'bg-orange-800 text-white'
					: 'bg-orange-500/10 text-orange-900 hover:bg-orange-500/50'} transition-colors"
			>
				{page}
			</button>
		{/each}
	</nav>

	<!-- Set max items per page -->
	<select
		class="rounded border border-black/15 bg-white p-4 text-sm font-semibold shadow"
		onchange={handleMaxItemsPerPageChange}
		value={filterStore.options.max.toString()}
	>
		<option value="2">2</option>
		<option value="5">5</option>
		<option value="10">10</option>
		<option value="20">20</option>
		<option value="50">50</option>
		<option value="100">100</option>
	</select>
</section>
