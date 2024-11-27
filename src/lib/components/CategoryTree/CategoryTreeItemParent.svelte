<script lang="ts">
	import Chevron from '$lib/icons/Chevron.svelte';

	let {
		category,
		depth = 0,
		onclick
	}: {
		category: KategorijaTree['parents'][0];
		depth?: number;
		onclick?: () => void;
	} = $props();
</script>

<a
	class="flex items-center gap-2 rounded-lg p-3"
	style={`padding-left: ${0.75 + depth * 1.5}rem;`}
	type="button"
	href={`/katalog/${category.id}`}
>
	<Chevron color={'#525252'} size={24} />

	<span class="text-base font-medium text-neutral-600"
		>{category.nazivId} ({category.totalItems})</span
	>
</a>
