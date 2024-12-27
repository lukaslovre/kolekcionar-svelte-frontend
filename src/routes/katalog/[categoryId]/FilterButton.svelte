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

	let dropdownOpen: boolean = $state(false);

	const range: ('min' | 'max')[] = ['min', 'max'];

	function handleFieldInput(
		event: Event,
		field: string,
		range: 'min' | 'max' | 'exact',
		parser: (value: string) => any,
		validator: (value: any) => boolean
	) {
		event.preventDefault();

		const target = event.target as HTMLInputElement;
		const value = parser(target.value);

		console.log('field:', field, 'value:', value);

		filterStore.setFilter(field, validator(value) ? value : undefined, range);
	}

	function handleSubmitClick() {
		// TODO TOMMOROW:
		// treba vidjet kako rjesavat min-max brojeve, dali u store-u imat oboje, ili ovdje na temelju vrijednosti složit ispravan string
		filterStore.setUrlFromState();
	}
</script>

<div class="relative">
	<button
		type="button"
		class="rounded border border-black/15 bg-white/75 p-4 text-sm font-semibold shadow {dropdownOpen
			? 'border-orange-300 ring ring-orange-100'
			: ''}"
		onclick={() => (dropdownOpen = !dropdownOpen)}
	>
		Filtriraj
	</button>

	{#if dropdownOpen}
		<div
			class="absolute right-0 top-full mt-1 w-max min-w-32 rounded-xl border border-black/15 bg-white py-3 shadow-lg"
		>
			<ul class="flex flex-col">
				{#each filterStore.filters as filter}
					{#if filter.type === 'number'}
						<li>
							<div class="flex flex-col gap-2 px-4 py-2">
								<p class="text-sm font-semibold text-neutral-800">{filter.label}</p>
								<div class="flex gap-4">
									{#each range as range}
										<input
											type="text"
											placeholder={range === 'min' ? 'Min' : 'Max'}
											class="rounded border border-neutral-300 px-2 py-1 outline-none transition-colors focus:border-orange-300 focus:ring focus:ring-orange-100"
											aria-label="Minimalna {filter.label}"
											oninput={(e) =>
												handleFieldInput(e, filter.field, range, filter.parser, filter.validator)}
											value={filter[range] ?? ''}
										/>
									{/each}
								</div>
							</div>
						</li>
					{:else if filter.type === 'string'}
						<li>
							<div class="flex flex-col gap-2 px-4 py-2">
								<p class="text-sm font-semibold text-neutral-800">{filter.label}</p>
								<div class="flex gap-4">
									<input
										type="text"
										placeholder="Unesite vrijednost"
										class="rounded border border-neutral-300 px-2 py-1 outline-none transition-colors focus:border-orange-300 focus:ring focus:ring-orange-100"
										aria-label={filter.label}
										oninput={(e) =>
											handleFieldInput(e, filter.field, 'exact', filter.parser, filter.validator)}
										value={filter.value ?? ''}
									/>
								</div>
							</div>
						</li>
					{/if}
				{/each}

				<li class="mt-4">
					<div class="px-4">
						<button
							type="button"
							class="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
							onclick={handleSubmitClick}
						>
							Submit
						</button>
					</div>
				</li>
			</ul>
		</div>
	{/if}
</div>
