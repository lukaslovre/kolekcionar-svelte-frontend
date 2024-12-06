<script lang="ts">
	import kolekcionarApi from '$lib/kolekcionarApi';
	import CountryCombobox from '$lib/wrappedComponents/CountryCombobox.svelte';
	import ItemTypeAutocompleteInput from '$lib/wrappedComponents/ItemTypeAutocompleteInput.svelte';
	import TagsCombobox from '$lib/wrappedComponents/TagsCombobox.svelte';

	// Types
	type FieldType =
		| 'text'
		| 'number'
		| 'textarea'
		| 'tagsCombobox'
		| 'typeAutocompleteInput'
		| 'countryCombobox';
	type Parser = (value: FormDataEntryValue | null) => string | number | string[];

	interface FieldConfig {
		id: string;
		label: string;
		type: FieldType;
		parse: Parser;
		disabled?: boolean;
		options?: {
			maxLength?: number;
			defaultValue?: string | number;
			rows?: number;
		};
	}

	const imageUrlsParseFunction: Parser = (value) => {
		if (!value || typeof value !== 'string') return '';

		// Split by comma or new line, trim each item and remove empty strings
		const urls = value
			.split(/,|\n/)
			.map((url) => url.trim())
			.filter(Boolean);

		return urls;
	};

	const fields: FieldConfig[] = [
		{ id: 'id', label: 'ID', type: 'number', parse: Number, disabled: true },
		{
			id: 'nazivId',
			label: 'Naziv ID',
			type: 'text',
			parse: String,
			options: { maxLength: 128 }
		},
		{ id: 'kategorijaId', label: 'Kategorija ID', type: 'text', parse: String },
		{ id: 'cijena', label: 'Cijena', type: 'number', parse: Number },
		{
			id: 'limit',
			label: 'Limit',
			type: 'number',
			parse: Number,
			options: { defaultValue: 1 }
		},
		{ id: 'tags', label: 'Tags', type: 'tagsCombobox', parse: String },
		{ id: 'opis', label: 'Opis', type: 'textarea', parse: String, options: { rows: 4 } },
		{
			id: 'images',
			label: 'Images (svaki url u svoj red ili odvojen zarezom)',
			type: 'textarea',
			parse: imageUrlsParseFunction
		},
		{
			id: 'tip',
			label: 'Tip',
			type: 'typeAutocompleteInput',
			parse: String,
			options: { defaultValue: 'ostalo' }
		},

		{ id: 'groupId', label: 'Group ID', type: 'text', parse: String },
		{ id: 'vrijemeDodavanja', label: 'Vrijeme dodavanja', type: 'text', parse: String },
		{ id: 'countryId', label: 'Country ID', type: 'countryCombobox', parse: String },
		{ id: 'nominala', label: 'Nominala', type: 'number', parse: Number },
		{ id: 'godina', label: 'Godina', type: 'number', parse: Number },
		{ id: 'mintage', label: 'Mintage', type: 'number', parse: Number },
		{ id: 'promjer', label: 'Promjer (mm)', type: 'number', parse: Number },
		{ id: 'masa', label: 'Masa (g)', type: 'number', parse: Number },
		{ id: 'visina', label: 'Visina (mm)', type: 'number', parse: Number },
		{ id: 'sirina', label: 'Širina (mm)', type: 'number', parse: Number },
		{ id: 'duljina', label: 'Duljina (mm)', type: 'number', parse: Number }
	];

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		const parsedData = fields.reduce(
			(acc, field) => ({
				...acc,
				[field.id]: formData.get(field.id) ? field.parse(formData.get(field.id)) : undefined
			}),
			{}
		);

		parsedData.tags = tagsSelectedValues.length > 0 ? tagsSelectedValues : undefined;

		console.log(parsedData);

		const response = await kolekcionarApi.createItem(parsedData);

		console.log(response);
	}

	let tagsSelectedValues: string[] = $state([]);

	function handleTagsComboboxSelectedChange(values: string[]) {
		console.log(values);
		tagsSelectedValues = values;
	}
</script>

<form onsubmit={handleSubmit}>
	{#each fields as field}
		<label for={field.id}>{field.label}</label>

		{#if field.type === 'textarea'}
			<textarea id={field.id} name={field.id} rows={field.options?.rows}></textarea>
		{:else if field.type === 'tagsCombobox'}
			<TagsCombobox onSelectedChange={handleTagsComboboxSelectedChange} />
		{:else if field.type === 'typeAutocompleteInput'}
			<ItemTypeAutocompleteInput />
		{:else if field.type === 'countryCombobox'}
			<CountryCombobox onSelectedChange={console.log} />
		{:else}
			<input
				type="text"
				id={field.id}
				name={field.id}
				maxlength={field.options?.maxLength}
				value={field.options?.defaultValue}
				disabled={field.disabled}
			/>
		{/if}
	{/each}

	<button type="submit">Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 600;
		margin-top: 0.5rem;
	}

	input,
	textarea {
		padding: 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid #ccc;
	}

	input[disabled] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	textarea {
		resize: vertical;
	}

	button[type='submit'] {
		padding: 0.5rem;
		margin-top: 1rem;
		border-radius: 0.25rem;
		background-color: #007bff;
		color: white;
		font-weight: 600;
		cursor: pointer;
	}
</style>
