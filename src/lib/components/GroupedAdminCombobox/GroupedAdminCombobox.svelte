<script lang="ts">
	import Checkmark from '$lib/icons/Checkmark.svelte';
	import Chevron from '$lib/icons/Chevron.svelte';
	import Search from '$lib/icons/Search.svelte';
	import kolekcionarApi from '$lib/kolekcionarApi';
	import { getHoverInfoFromTag } from '$lib/utils/tagUtils';
	import AutocompleteInput from '../FormComponents/AutocompleteInput.svelte';
	import Input from './Input.svelte';

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
		onAddOption?: (optionLabel: string) => Promise<AdminComboboxProps['options'][0]['options'][0]>;
	};
	let { label, options, selectedValues, onSelectedChange, onAddOption }: AdminComboboxProps =
		$props();

	let isOpen: boolean = $state(false);
	let searchValue: string = $state('');
	let showForm: boolean = $state(false);

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

	function toggleValue(value: string) {
		const newSelectedValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];

		selectedValues = newSelectedValues;
		onSelectedChange(newSelectedValues);
	}

	async function handleAddOption(e: Event) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		type createTag = Omit<Tag, 'id' | 'items'>;

		const newTag: createTag = {
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
			const response = await kolekcionarApi.createTag(newTag);
			console.log(response);

			// Nekakav check da li je uspesno kreiran tag
			if (!response.data.id) {
				alert('!response.data.id');
				return;
			}

			const newOption = {
				label: response.data.naziv,
				value: response.data.id,
				hoverInfo: getHoverInfoFromTag(response.data)
			};

			if (!options.find((group) => group.groupName === response.data.group)) {
				options = [...options, { groupName: response.data.group, options: [newOption] }];
			} else {
				options = options.map((group) => {
					if (group.groupName === response.data.group) {
						return {
							...group,
							options: [...group.options, newOption]
						};
					} else {
						return group;
					}
				});
			}

			selectedValues = [...selectedValues, response.data.id];
			onSelectedChange(selectedValues);
			searchValue = '';
			toggleFormVisibility();
		} catch (error) {
			console.log(error);
		}
	}

	function toggleFormVisibility() {
		showForm = !showForm;
	}
</script>

<div class="relative">
	<button
		class="w-full rounded-md border bg-white px-4 py-3 text-sm font-medium {isOpen
			? 'border-sky-700'
			: 'border-neutral-400'} flex items-center justify-between transition-colors"
		type="button"
		onclick={() => {
			isOpen = !isOpen;
		}}
	>
		{selectedValues.length > 0
			? selectedValues
					.map((value) => flatOptions.find((option) => option.value === value)?.label || '')
					.join(', ')
			: `Select ${label}`}

		<Chevron color="#404040" />
	</button>

	<!-- Dropdown options container -->
	{#if isOpen}
		<div
			class="absolute top-full mt-2 flex w-full flex-col gap-1 rounded-md border border-neutral-400 bg-neutral-50 p-1 shadow-md"
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
						type="text"
						class="flex-1 rounded-sm bg-neutral-50 text-sm font-normal outline-none"
						placeholder="Search"
						bind:value={searchValue}
					/>

					{#if filteredOptions.length === 0}
						<button
							type="button"
							class="text-sm font-semibold text-sky-700"
							onclick={toggleFormVisibility}>Create "{searchValue}"</button
						>
					{/if}
				</div>

				<!-- Options -->
				{#each filteredOptions as { groupName, options } (groupName)}
					<div class="px-3 py-2 text-sm font-semibold">{groupName}</div>

					{#each options as { label, value, hoverInfo } (value)}
						<button
							type="button"
							class="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-normal hover:bg-neutral-100"
							onclick={() => {
								toggleValue(value);
							}}
							onmouseenter={() => {
								console.log(JSON.parse(hoverInfo));
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
