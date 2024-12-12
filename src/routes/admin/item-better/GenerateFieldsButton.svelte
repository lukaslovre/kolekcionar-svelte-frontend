<script lang="ts">
	import AiIcon from '$lib/icons/AiIcon.svelte';

	let { onClick }: { onClick: () => void } = $props();
</script>

<button
	type="button"
	class="flex items-center justify-center gap-2 rounded-md bg-sky-800/10 px-4 py-2 transition-all hover:bg-sky-800/20 active:scale-95 active:bg-sky-800/40"
	onclick={onClick}
>
	<AiIcon color="#075985" />
	<span class=" text-sm font-semibold text-sky-800"> Generiraj ostala polja </span>
</button>
