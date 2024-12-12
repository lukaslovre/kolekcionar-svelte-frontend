<script lang="ts">
	import Chevron from '$lib/icons/Chevron.svelte';
	import CountryCombobox from '$lib/wrappedComponents/CountryCombobox.svelte';
	import ItemTypeAutocompleteInput from '$lib/wrappedComponents/ItemTypeAutocompleteInput.svelte';
	import TagsCombobox from '$lib/wrappedComponents/TagsCombobox.svelte';
	import GenerateFieldsButton from './GenerateFieldsButton.svelte';
	import Input from './Input.svelte';
	import ItemColumnImage from './ItemColumnImage.svelte';
	import type { ItemCreationColumnProps } from './ItemFastFormConfig';
	import Textarea from './Textarea.svelte';

	type ComponentProps = ItemCreationColumnProps & {
		onButtonClick: (value: string) => void;
		getPreviousItemValue: (id: string) => any;
		joinImageToDirection: (direction: 'left' | 'right') => void;
	};

	let {
		images,
		baseData = $bindable(),
		tagsData = $bindable(),
		additionalData = $bindable(),

		onButtonClick,
		getPreviousItemValue,
		joinImageToDirection
	}: ComponentProps = $props();

	let additionalDataVisible: boolean = $state(false);
</script>

<div class="w-80 flex-shrink-0">
	<ItemColumnImage {images} {joinImageToDirection} />

	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-3">
			{#each baseData as field}
				{#if field.type === 'text' || field.type === 'number'}
					<Input
						{...field}
						onInput={(value: string) => (field.value = value)}
						{getPreviousItemValue}
					/>
				{:else if field.type === 'textarea'}
					<Textarea
						{...field}
						onInput={(value: string) => (field.value = value)}
						{getPreviousItemValue}
					/>
				{:else}
					<p>
						{field.type} is not supported yet.
					</p>
				{/if}
			{/each}
		</div>

		<div class="flex flex-col gap-3">
			<GenerateFieldsButton onClick={() => onButtonClick('')} />
			<TagsCombobox
				onSelectedChange={(comboboxValues: string[]) => {
					tagsData.value = comboboxValues;
				}}
			/>
		</div>

		<button
			type="button"
			class="flex items-center gap-1"
			onclick={() => (additionalDataVisible = !additionalDataVisible)}
		>
			<Chevron size={24} color={'#1a1a1a'} rotate={additionalDataVisible ? 0 : -90} />
			<span class="text-left text-sm font-semibold text-neutral-900"> Pokaži dodatna polja </span>
		</button>

		{#if additionalDataVisible}
			<div class="flex flex-col gap-3">
				{#each additionalData as field, i}
					{#if field.type === 'text' || field.type === 'number'}
						<Input
							{...field}
							onInput={(value: any) => (field.value = value)}
							{getPreviousItemValue}
						/>
					{:else if field.type === 'textarea'}
						<Textarea
							{...field}
							onInput={(value: any) => (field.value = value)}
							{getPreviousItemValue}
						/>
					{:else if field.type === 'typeAutocompleteInput'}
						<ItemTypeAutocompleteInput onInput={(value: string) => (field.value = value)} />
					{:else if field.type === 'countryCombobox'}
						<CountryCombobox
							onSelectedChange={(comboboxValues: string[]) => (field.value = comboboxValues[0])}
						/>
					{:else}
						<p>
							{field.type} is not supported yet.
						</p>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
