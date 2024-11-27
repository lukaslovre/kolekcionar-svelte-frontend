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
	<Chevron color={'#525252'} size={24} />

	<span class="text-base font-medium text-neutral-600">{category.nazivId}</span>
</button>
