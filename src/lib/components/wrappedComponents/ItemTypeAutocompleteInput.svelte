<script lang="ts">
	import AutocompleteInput from '$lib/components/FormComponents/AutocompleteInput.svelte';

	let { onInput }: { onInput: (value: string) => void } = $props();

	const autocompleteOptions: string[] = ['kovanica', 'novcanica', 'razglednica', 'kamen', 'ostalo'];
</script>

<AutocompleteInput
	name="tip"
	placeholder="tip proizvoda"
	value="ostalo"
	{autocompleteOptions}
	{onInput}
/>
