<script lang="ts">
	import Checkmark from '$lib/icons/Checkmark.svelte';
	import Chevron from '$lib/icons/Chevron.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { text } from '@sveltejs/kit';

	let {
		category,
		depth = 0,
		current = false,
		onclick
	}: {
		category: Kategorija;
		depth?: number;
		current?: boolean;
		onclick?: () => void;
	} = $props();

	let copySuccess: boolean = $state(false);

	function triggerCopySuccess() {
		copySuccess = true;
		setTimeout(() => {
			copySuccess = false;
		}, 2000);
	}

	function handleCopyClick(event: MouseEvent) {
		event.stopPropagation();
		navigator.clipboard
			.writeText(category.id)
			.then(() => {
				console.log('Copied to clipboard:', category.id);
				triggerCopySuccess();
			})
			.catch((error) => {
				console.error('Failed to copy to clipboard:', error);
			});
	}
</script>

<button
	class="relative flex items-center gap-2 rounded-lg p-3"
	class:bg-red-700={current}
	style={`padding-left: ${0.75 + depth * 1.5}rem;`}
	type="button"
	{onclick}
>
	<Chevron color={current ? '#fff' : '#525252'} size={24} rotate={current ? 0 : -90} />

	<span class="text-base font-medium {current ? 'text-neutral-50' : 'text-neutral-600'}">
		{category.nazivId}
	</span>

	<span
		class="absolute right-3 cursor-pointer"
		onclick={handleCopyClick}
		role="button"
		tabindex="0"
	>
		{#if copySuccess}
			<Checkmark />
		{:else}
			<CopyIcon />
		{/if}
	</span>
</button>
