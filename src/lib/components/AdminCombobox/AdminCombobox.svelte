<script lang="ts">
	import Checkmark from '$lib/icons/Checkmark.svelte';
	import Search from '$lib/icons/Search.svelte';

	type AdminComboboxProps = {
		label: string;
		options: {
			label: string;
			value: string;
		}[];
		selectedValues: string[];
		onSelectedChange: (selectedValues: string[]) => void;
		onAddOption: (optionLabel: string) => Promise<{
			label: string;
			value: string;
		}>;
	};
	let { label, options, selectedValues, onSelectedChange, onAddOption }: AdminComboboxProps =
		$props();

	let isOpen: boolean = $state(false);
	let searchValue: string = $state('');

	let filteredOptions = $derived(
		options.filter(({ value, label }) =>
			label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
		)
	);

	function toggleValue(value: string) {
		const newSelectedValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];

		selectedValues = newSelectedValues;
		onSelectedChange(newSelectedValues);
	}

	async function createOption() {
		try {
			const newTag = await onAddOption(searchValue);
			options = [...options, newTag];
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="relative">
	<button
		class="w-full rounded-md border bg-white px-4 py-3 text-sm font-medium {isOpen
			? 'border-sky-700'
			: 'border-neutral-400'} transition-colors"
		type="button"
		onclick={() => {
			isOpen = !isOpen;
		}}
	>
		{selectedValues.length > 0
			? selectedValues
					.map((value) => options.find((option) => option.value === value)?.label || '')
					.join(', ')
			: `Select ${label}`}
	</button>

	<!-- Dropdown options container -->
	{#if isOpen}
		<div
			class="absolute top-full mt-2 flex w-full flex-col gap-1 rounded-md border border-neutral-400 bg-white p-1 shadow-md"
		>
			<!-- Search -->
			<div class="flex items-center gap-2 px-3 py-2">
				<Search color="#808080" />
				<input
					type="text"
					class="flex-1 rounded-sm text-sm font-normal outline-none"
					placeholder="Search"
					bind:value={searchValue}
				/>

				{#if filteredOptions.length === 0}
					<button type="button" class="text-sm font-semibold text-sky-700" onclick={createOption}
						>Create "{searchValue}"</button
					>
				{/if}
			</div>

			<!-- Options -->
			{#each filteredOptions as { label, value } (value)}
				<button
					type="button"
					class="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-normal hover:bg-neutral-100"
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
