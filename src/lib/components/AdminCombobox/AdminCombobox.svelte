<script lang="ts">
	import Checkmark from '$lib/icons/Checkmark.svelte';
	import Chevron from '$lib/icons/Chevron.svelte';
	import Search from '$lib/icons/Search.svelte';

	type AdminComboboxProps = {
		label: string;
		options: {
			label: string;
			value: string;
		}[];
		selectedValues: string[];
		allowMultiple?: boolean;
		onSelectedChange: (selectedValues: string[]) => void;
		onAddOption: (optionLabel: string) => Promise<{
			label: string;
			value: string;
		}>;
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
	let errorMessage: string = $state('');
	let focusedOptionIndex: number = $state(-1);

	let filteredOptions = $derived(
		options.filter(({ label }) =>
			label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
		)
	);

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
			if (options.some((option) => option.label.toLowerCase() === searchValue.toLowerCase())) {
				errorMessage = 'Option already exists.';
				return;
			}

			const newOption = await onAddOption(searchValue);
			options = [...options, newOption];
			searchValue = '';
			errorMessage = '';
		} catch (error) {
			errorMessage = 'Failed to add new option.';
			console.error(error);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (!isOpen) {
				isOpen = true;
				focusedOptionIndex = -1;
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
			event.preventDefault();
			if (isOpen && focusedOptionIndex >= 0) {
				toggleValue(filteredOptions[focusedOptionIndex].value);
			}
		} else if (event.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<div class="relative">
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
			isOpen = !isOpen;
			focusedOptionIndex = -1;
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
			class="absolute top-full mt-2 flex w-full flex-col gap-1 rounded-md border border-neutral-400 bg-white p-1 shadow-md"
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
					bind:value={searchValue}
					oninput={() => {
						errorMessage = '';
					}}
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
