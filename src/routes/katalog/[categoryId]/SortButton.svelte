<!-- Issues Found
Missing Click Outside Handler

Dropdown stays open when clicking outside
Should close on outside clicks
Missing Keyboard Navigation

No keyboard support for dropdown
Needs Escape key to close
Needs arrow key navigation
Missing Accessibility Attributes

No ARIA attributes for dropdown menu
Missing focus management
URL Updates

Effect runs on mount, causing unnecessary navigation
No error handling for invalid URLs -->

<script lang="ts">
	import { filterStore } from './filterStore.svelte';

	// values: cijena, nazivId, vrijemeDodavanja, godina, masa (for now)
	const sortOptions: { value: keyof Item; label: string }[] = [
		{ value: 'vrijemeDodavanja', label: 'Vrijeme dodavanja' },
		{ value: 'cijena', label: 'Cijena' },
		{ value: 'nazivId', label: 'Naziv' },
		{ value: 'godina', label: 'Godina' },
		{ value: 'masa', label: 'Masa' },
		{ value: 'nominala', label: 'Nominala' }
	];

	let dropdownOpen: boolean = $state(false);
	let selectedOptionIndex: number = $derived.by(() => {
		const foundOption = sortOptions.find((option) => option.value === filterStore.options.sortBy);
		return foundOption ? sortOptions.indexOf(foundOption) : -1;
	});
</script>

<div class="relative">
	<button
		type="button"
		class="rounded border border-black/15 bg-white/75 p-4 text-sm font-semibold shadow {dropdownOpen
			? 'border-orange-300 ring ring-orange-100'
			: ''}"
		onclick={() => (dropdownOpen = !dropdownOpen)}
	>
		Sortiraj
	</button>

	{#if dropdownOpen}
		<div
			class="absolute right-0 top-full mt-1 w-max min-w-32 rounded-xl border border-black/15 bg-white py-3 shadow-lg"
		>
			<ul class="flex flex-col">
				{#each sortOptions as option, i}
					<li>
						<button
							type="button"
							class="w-full px-4 py-3 text-left text-sm font-medium hover:bg-gray-100 {`${
								selectedOptionIndex === i ? ' text-red-800' : ''
							}`}"
							onclick={() => {
								console.log(option.value);
								if (filterStore.options.sortBy === option.value) {
									filterStore.toggleSortDirection();
								} else {
									filterStore.setOptions('sortBy', option.value);
								}

								dropdownOpen = false;
							}}
						>
							{option.label}
							{#if selectedOptionIndex === i}
								{filterStore.options.sort === 'asc' ? '(asc)' : '(desc)'}
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
