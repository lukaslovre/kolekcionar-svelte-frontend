<script lang="ts">
	type InputProps = {
		name: string;
		value?: string;
		placeholder: string;
		autocompleteOptions: string[];
		showOptionsIfValueEmpty?: boolean;
		onInput?: (value: string) => void;
	};

	let {
		name,
		value = '',
		placeholder,
		autocompleteOptions,
		showOptionsIfValueEmpty = true,
		onInput
	}: InputProps = $props();

	let viableAutocompleteOptions = $derived(
		showOptionsIfValueEmpty && !value
			? autocompleteOptions
			: autocompleteOptions.filter((option) => option.toLowerCase().includes(value.toLowerCase()))
	);

	function setValue(newValue: string) {
		console.log(newValue);
		value = newValue;
	}
</script>

<div class="relative">
	<input
		type="text"
		aria-label={name}
		{placeholder}
		bind:value
		{name}
		oninput={(e) => onInput?.(e.currentTarget.value)}
		class="peer w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-100"
	/>

	<div
		class="absolute z-10 mt-1 hidden w-full flex-col gap-1 rounded-md border border-gray-300 bg-white p-1 shadow-lg peer-focus:flex"
	>
		{#each viableAutocompleteOptions as option}
			<button
				type="button"
				class="cursor-pointer rounded-sm px-3 py-2 text-left text-sm font-normal hover:bg-neutral-100"
				onmousedown={() => setValue(option)}
			>
				{option}
			</button>
		{/each}
	</div>
</div>
