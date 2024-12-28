<script lang="ts">
	import Checkmark from '$lib/icons/Checkmark.svelte';
	import Chevron from '$lib/icons/Chevron.svelte';
	import Search from '$lib/icons/Search.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';
	import { getHoverInfoFromTag } from '$lib/utils/tagUtils';
	import { tick } from 'svelte';
	import AutocompleteInput from '../FormComponents/AutocompleteInput.svelte';
	import Input from './Input.svelte';

	type CreateTag = Omit<Tag, 'id' | 'items'>;

	type AdminComboboxProps = {
		label: string;
		options: {
			groupName: string;
			options: {
				label: string;
				value: string;
				hoverInfo: string;
			}[];
		}[];

		selectedValues: string[];
		onSelectedChange: (selectedValues: string[]) => void;
		onAddOption: (tag: CreateTag) => Promise<string>; // Returns the ID of the newly created tag
	};
	let { label, options, selectedValues, onSelectedChange, onAddOption }: AdminComboboxProps =
		$props();

	let isOpen: boolean = $state(false);
	let searchValue: string = $state('');
	let showForm: boolean = $state(false);
	let containerRef: HTMLDivElement | undefined = $state();
	let searchInputRef: HTMLInputElement | undefined = $state();
	let errorMessage: string = $state('');
	let focusedOptionIndex: number = $state(-1);

	let filteredOptions = $derived(
		options
			.map((group) => {
				const optionsInGroupMatchingSearch = group.options.filter(({ value, label }) =>
					label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
				);

				if (optionsInGroupMatchingSearch.length > 0) {
					return {
						groupName: group.groupName,
						options: optionsInGroupMatchingSearch
					};
				} else {
					return null;
				}
			})
			.filter((group) => group !== null)
	);

	let flatOptions = $derived(options.flatMap((group) => group.options));
	let flatFilteredOptions = $derived(filteredOptions.flatMap((group) => group.options));

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
		const newSelectedValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];

		selectedValues = newSelectedValues;
		onSelectedChange(newSelectedValues);
	}

	// TODO: extract to parent component
	async function handleAddOption(e: Event) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const newTag: CreateTag = {
			naziv: formData.get('naziv') as string,
			group: formData.get('group') as string,
			description: formData.get('description') as string,
			displayOnCard: (formData.get('displayOnCard') as string) === 'on',
			displayOnDetails: (formData.get('displayOnDetails') as string) === 'on'
		};

		console.log(newTag);

		if (!newTag.naziv || !newTag.group) {
			alert("Please fill out 'Tag name' and 'Group' fields.");
			return;
		}

		try {
			const newTagId = await onAddOption(newTag);
			selectedValues = [...selectedValues, newTagId];

			onSelectedChange(selectedValues);
			searchValue = '';
			toggleFormVisibility(e);
		} catch (error: any) {
			console.log(error);
			errorMessage = error.message || 'An error occurred';
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
				focusedOptionIndex = (focusedOptionIndex + 1) % flatFilteredOptions.length;
			}
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (isOpen) {
				focusedOptionIndex =
					(focusedOptionIndex - 1 + flatFilteredOptions.length) % flatFilteredOptions.length;
			}
		} else if (event.key === 'Enter' || event.key === ' ') {
			if (isOpen && focusedOptionIndex >= 0) {
				event.preventDefault();
				toggleValue(flatFilteredOptions[focusedOptionIndex].value);
			}
		} else if (event.key === 'Escape') {
			event.preventDefault();
			closeDropdown();
		} else {
			resetKeyboardFocus(); // Reset focus when typing
		}
	}

	function toggleFormVisibility(e: Event) {
		e.stopPropagation();
		showForm = !showForm;
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
				.map((value) => flatOptions.find((option) => option.value === value)?.label || '')
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
			{#if showForm}
				<!-- Close form button -->
				<button
					type="button"
					class="p-3 text-sm font-semibold text-sky-700 hover:bg-neutral-100"
					onclick={toggleFormVisibility}>&lt; Exit form</button
				>

				<form onsubmit={handleAddOption}>
					<div class="flex flex-col gap-3 p-3">
						<Input name="naziv" placeholder="Tag name" value={searchValue} />
						<AutocompleteInput
							name="group"
							placeholder="Group"
							autocompleteOptions={options.map((group) => group.groupName)}
						/>
						<Input name="description" placeholder="Description (optional)" />
						<div class="flex items-center gap-2 text-sm font-normal text-neutral-700">
							<input type="checkbox" name="displayOnCard" checked id="displayOnCard" />
							<label for="displayOnCard">Display on card</label>
						</div>
						<div class="flex items-center gap-2 text-sm font-normal text-neutral-700">
							<input type="checkbox" name="displayOnDetails" checked id="displayOnDetails" />
							<label for="displayOnDetails">Display on details</label>
						</div>

						<button
							type="submit"
							class="rounded bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-800"
						>
							Create
						</button>
					</div>
				</form>
			{:else}
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
							class="text-sm font-semibold text-sky-700"
							onclick={toggleFormVisibility}
						>
							{`Create "${searchValue}"`}
						</button>
					{/if}
				</div>

				{#if errorMessage !== ''}
					<p class="px-3 py-2 text-sm text-red-500">{errorMessage}</p>
				{/if}

				<!-- Options -->
				{#each filteredOptions as { groupName, options } (groupName)}
					<div class="px-3 py-2 text-sm font-semibold">{groupName}</div>

					{#each options as { label, value, hoverInfo } (value)}
						<button
							type="button"
							role="option"
							aria-selected={selectedValues.includes(value) ||
								focusedOptionIndex ===
									flatFilteredOptions.findIndex((option) => option.value === value)}
							class="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-normal {focusedOptionIndex ===
							flatFilteredOptions.findIndex((option) => option.value === value)
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
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	button {
		text-align: left;
	}

	form button {
		text-align: center;
	}
</style>
