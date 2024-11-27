<script lang="ts">
	import Chevron from '$lib/icons/Chevron.svelte';

	let {
		category,
		depth = 0,
		onclick
	}: {
		category: Kategorija;
		depth?: number;

		onclick?: () => void;
	} = $props();
</script>

<button
	class="flex items-center gap-2 rounded-lg p-3"
	style={`padding-left: ${0.75 + depth * 1.5}rem;`}
	type="button"
	{onclick}
>
	<Chevron color={'#0a0a0a'} size={24} rotate={-90} />

	<span class="text-base font-medium text-neutral-950">{category.nazivId}</span>
</button>
