<script lang="ts">
	import Search from '$lib/icons/Search.svelte';

	type SearchInputProps = {
		onInput: (value: string) => void;
	};

	let { onInput }: SearchInputProps = $props();
	// class="rounded border-black/15 bg-white/75 p-4 text-sm font-semibold shadow">

	function handleInput(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		onInput(value);
	}
</script>

<div class="relative flex-1">
	<input
		type="text"
		name="search"
		id="search"
		placeholder="Pretraži proizvode"
		oninput={handleInput}
		class="w-full rounded-full border border-black/15 bg-white/75 p-4 text-sm shadow focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-100"
	/>

	<div class="absolute inset-y-0 right-4 flex items-center">
		<Search />
	</div>
</div>
