<script lang="ts">
	import kolekcionarApi from '$lib/kolekcionarApi';
	import Input from '../item-better/Input.svelte';
	import Textarea from '../item-better/Textarea.svelte';

	// interface FieldConfig {
	// 	id: string;
	// 	label: string;
	// 	type: FieldType;
	// 	value: any;
	// 	parse: Parser;
	// 	required?: boolean;
	// 	disabled?: boolean;
	// 	validators?: Validator[];
	// 	touched?: boolean;
	// 	error?: string;
	// 	options?: FieldOptions;
	// }

	// export const kategorijeSchema = z.object({
	// 	id: z.string().uuid(),
	// 	nazivId: z.string(),
	// 	parentId: z.string().uuid().optional(),
	// 	drzavaId: z.string().optional(),
	// 	isDead: z.boolean().optional(),
	// 	opis: z.string().optional(),
	// 	count: z.number().int().optional()
	// });

	const isUuid: Validator = (value: any) => {
		if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)) {
			return 'Value must be a valid UUID';
		}
		return '';
	};

	const formData: FieldConfig[] = [
		{
			id: 'nazivId',
			label: 'Naziv',
			type: 'text',
			value: '',
			parse: String,
			required: true
		},
		{
			id: 'parentId',
			label: 'Parent uuid',
			type: 'text',
			value: '',
			parse: String,
			required: false,
			validators: [isUuid]
		},
		// {
		// 	id: 'drzavaId',
		// 	label: 'Država',
		// 	type: 'text',
		// 	value: '',
		// 	parse: String,
		// 	required: false
		// },
		// {
		// 	id: 'isDead',
		// 	label: 'Is Dead',
		// 	type: 'text',
		// 	value: '',
		// 	parse: String,
		// 	required: false
		// },
		{
			id: 'opis',
			label: 'Opis',
			type: 'textarea',
			value: '',
			parse: String,
			required: false
		}
		// {
		// 	id: 'count',
		// 	label: 'Count',
		// 	type: 'text',
		// 	value: '',
		// 	parse: String,
		// 	required: false
		// }
	];

	async function handleSubmitClick() {
		const formattedData = formatForApi(formData) as Kategorija;

		console.log(formattedData);

		const response = await kolekcionarApi.createKategorija(formattedData);

		console.log(response);
	}

	function formatForApi(fields: FieldConfig[]): Record<string, any> {
		const dataValues = fields.reduce(
			(acc, field) => {
				acc[field.id] = field.value !== '' ? field.value : null;
				return acc;
			},
			{} as Record<string, any>
		);

		const dataValuesNonEmpty = Object.fromEntries(
			Object.entries(dataValues).filter(([_, value]) => value !== null)
		);

		return dataValuesNonEmpty;
	}
</script>

<section class="flex flex-col gap-3">
	{#each formData as field}
		{#if field.type === 'text' || field.type === 'number'}
			<Input {...field} onInput={(value: string) => (field.value = value)} />
		{:else if field.type === 'textarea'}
			<Textarea {...field} onInput={(value: string) => (field.value = value)} />
		{:else}
			<p>
				{field.type} is not supported yet.
			</p>
		{/if}
	{/each}

	<button
		type="button"
		class="rounded-md bg-orange-700 px-4 py-2 font-semibold text-orange-50 transition-colors hover:bg-orange-800"
		onclick={handleSubmitClick}
	>
		Create "Kategorija"
	</button>
</section>
