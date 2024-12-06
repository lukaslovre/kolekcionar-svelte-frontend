<script lang="ts">
	import InfoHover from '../InfoHover.svelte';

	type ItemTagProps = {
		tag: Tag;
	};

	let { tag }: ItemTagProps = $props();

	const rand = Math.random();
</script>

<!-- randomly decide the style -->

{#if rand < 0.55}
	<span
		class="relative rounded-full bg-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-800"
	>
		{tag.naziv}
		{#if tag.description}
			<InfoHover text={tag.description} />
		{/if}
	</span>
{:else}
	<span
		class="relative flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-950"
	>
		{tag.naziv}
		{#if tag.description}
			<InfoHover text={tag.description} />
		{/if}
	</span>
{/if}
