<script lang="ts">
	type InputProps = {
		name: string;
		autocompleteOptions: string[];
		value?: string;
		placeholder?: string;
		showOptionsIfValueEmpty?: boolean;
		onInput?: (value: string) => void;
	};

	let {
		name,
		value = '',
		placeholder = '',
		autocompleteOptions,
		showOptionsIfValueEmpty = true,
		onInput
	}: InputProps = $props();

	let isOpen: boolean = $state(false);
	let containerRef: HTMLDivElement | undefined = $state();
	let focusedOptionIndex: number = $state(-1);

	$effect(() => {
		if (containerRef) {
			const handleClickOutside = (event: MouseEvent) => {
				if (!containerRef!.contains(event.target as Node)) {
					isOpen = false;
				}
			};

			document.addEventListener('click', handleClickOutside);

			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});

	$effect(() => {
		if (onInput) {
			onInput(value);
		}
	});

	let viableAutocompleteOptions = $derived(
		showOptionsIfValueEmpty && !value
			? autocompleteOptions
			: autocompleteOptions.filter((option) => option.toLowerCase().includes(value.toLowerCase()))
	);

	function setValue(newValue: string) {
		value = newValue;
		isOpen = false;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (!isOpen) {
				isOpen = true;
				focusedOptionIndex = -1;
			} else {
				focusedOptionIndex = (focusedOptionIndex + 1) % viableAutocompleteOptions.length;
			}
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (isOpen) {
				focusedOptionIndex =
					(focusedOptionIndex - 1 + viableAutocompleteOptions.length) %
					viableAutocompleteOptions.length;
			}
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (isOpen && focusedOptionIndex >= 0) {
				setValue(viableAutocompleteOptions[focusedOptionIndex]);
			}
		} else if (event.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<div class="relative" bind:this={containerRef}>
	<input
		type="text"
		{placeholder}
		{name}
		bind:value
		class="z-0 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-100"
		oninput={() => {
			isOpen = true;
			focusedOptionIndex = -1;
		}}
		onfocus={() => (isOpen = true)}
		onkeydown={handleKeyDown}
		aria-label={name}
		aria-expanded={isOpen}
		aria-controls="autocomplete-listbox"
		role="combobox"
		autocomplete="off"
	/>

	{#if isOpen && viableAutocompleteOptions.length > 0}
		<ul
			id="autocomplete-listbox"
			class="absolute z-10 mt-1 w-full flex-col gap-1 rounded-md border border-gray-300 bg-white p-1 shadow-lg"
			role="listbox"
		>
			{#each viableAutocompleteOptions as option, index}
				<li role="option" aria-selected={focusedOptionIndex === index}>
					<button
						type="button"
						class="w-full cursor-pointer rounded-sm px-3 py-2 text-left text-sm font-normal {focusedOptionIndex ===
						index
							? 'bg-neutral-100'
							: 'hover:bg-neutral-100'}"
						onclick={() => setValue(option)}
					>
						{option}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
