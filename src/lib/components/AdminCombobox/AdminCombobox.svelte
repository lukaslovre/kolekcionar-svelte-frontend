<script lang="ts">
	import Checkmark from '$lib/icons/Checkmark.svelte';
	import Chevron from '$lib/icons/Chevron.svelte';
	import Search from '$lib/icons/Search.svelte';
	import { tick } from 'svelte';

	type AdminComboboxProps = {
		label: string;
		options: {
			label: string;
			value: string;
		}[];
		selectedValues: string[];
		allowMultiple?: boolean;
		onSelectedChange: (selectedValues: string[]) => void;
		onAddOption: (optionLabel: string) => Promise<string>; // ID of the newly created option
	};
	let {
		label,
		options,
		selectedValues,
		allowMultiple = true,
		onSelectedChange,
		onAddOption
	}: AdminComboboxProps = $props();

	let isOpen: boolean = $state(false);
	let searchValue: string = $state('');
	// let showForm: boolean = $state(false);
	let containerRef: HTMLDivElement | undefined = $state();
	let searchInputRef: HTMLInputElement | undefined = $state();
	let errorMessage: string = $state('');
	let focusedOptionIndex: number = $state(-1);

	let filteredOptions = $derived(
		options.filter(({ label }) =>
			label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
		)
	);

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

	function toggleValue(value: string) {
		let newSelectedValues: string[];

		if (allowMultiple) {
			newSelectedValues = selectedValues.includes(value)
				? selectedValues.filter((v) => v !== value)
				: [...selectedValues, value];
		} else {
			newSelectedValues = selectedValues.includes(value) ? [] : [value];
		}

		selectedValues = newSelectedValues;
		onSelectedChange(newSelectedValues);
	}

	async function handleAddOption() {
		try {
			const newOptionId = await onAddOption(searchValue);

			toggleValue(newOptionId);

			searchValue = '';
			errorMessage = '';
		} catch (error: any) {
			console.log(error);
			errorMessage = error.message || 'Failed to add new option.';
		}
	}

	function resetKeyboardFocus() {
		focusedOptionIndex = -1;
	}

	async function openDropdownAndFocus() {
		isOpen = true;
		resetKeyboardFocus();
		await tick(); // Wait for DOM to update so the input exists
		searchInputRef?.focus();
	}

	function closeDropdown() {
		isOpen = false;
		errorMessage = '';
		resetKeyboardFocus();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (!isOpen) {
				openDropdownAndFocus();
			} else {
				focusedOptionIndex = (focusedOptionIndex + 1) % filteredOptions.length;
			}
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (isOpen) {
				focusedOptionIndex =
					(focusedOptionIndex - 1 + filteredOptions.length) % filteredOptions.length;
			}
		} else if (event.key === 'Enter' || event.key === ' ') {
			if (isOpen && focusedOptionIndex >= 0) {
				event.preventDefault();
				toggleValue(filteredOptions[focusedOptionIndex].value);
			}
		} else if (event.key === 'Escape') {
			event.preventDefault();
			closeDropdown();
		} else {
			resetKeyboardFocus(); // Reset focus when typing
		}
	}
</script>

<div class="relative" bind:this={containerRef}>
	<button
		class="w-full rounded-md border bg-white px-3 py-2 text-sm {isOpen
			? 'border-orange-300 ring ring-orange-100'
			: 'border-neutral-300'} flex items-center justify-between transition-colors"
		type="button"
		role="combobox"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		aria-controls="combobox-options"
		aria-labelledby="combobox-label"
		onclick={() => {
			isOpen ? closeDropdown() : openDropdownAndFocus();
		}}
		onkeydown={handleKeyDown}
	>
		{#if selectedValues.length > 0}
			{selectedValues
				.map((value) => options.find((option) => option.value === value)?.label || '')
				.join(', ')}
		{:else}
			{`Select ${label}`}
		{/if}

		<Chevron color="#404040" />
	</button>

	<!-- Dropdown options container -->
	{#if isOpen}
		<div
			id="combobox-options"
			role="listbox"
			class="absolute top-full z-10 mt-2 flex max-h-96 w-full flex-col gap-1 overflow-y-auto rounded-md border border-neutral-400 bg-white p-1 shadow-md"
		>
			<!-- Search -->
			<div class="flex items-center gap-2 px-3 py-2">
				<Search color="#808080" />
				<input
					id="search-input"
					type="text"
					placeholder="Search"
					autocomplete="off"
					class="flex-1 rounded-sm text-sm font-normal outline-none"
					bind:this={searchInputRef}
					bind:value={searchValue}
					oninput={() => {
						errorMessage = '';
					}}
					onkeydown={handleKeyDown}
				/>

				{#if filteredOptions.length === 0}
					<button
						type="button"
						class="text-sm font-semibold text-sky-700 hover:bg-neutral-100"
						onclick={handleAddOption}
					>
						{`Create "${searchValue}"`}
					</button>
				{/if}
			</div>

			{#if errorMessage !== ''}
				<p class="px-3 py-2 text-sm text-red-500">{errorMessage}</p>
			{/if}

			<!-- Options -->
			{#each filteredOptions as { label, value }, index (value)}
				<button
					type="button"
					role="option"
					aria-selected={selectedValues.includes(value) || focusedOptionIndex === index}
					class="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-normal {focusedOptionIndex ===
					index
						? 'bg-neutral-100'
						: 'hover:bg-neutral-100'}"
					onclick={() => {
						toggleValue(value);
					}}
					onmouseenter={() => {
						resetKeyboardFocus();
					}}
				>
					<Checkmark color={selectedValues.includes(value) ? '#000' : 'transparent'} />
					{label}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	button {
		text-align: left;
	}
</style>
