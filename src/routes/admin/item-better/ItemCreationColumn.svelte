<script lang="ts">
	import Input from './Input.svelte';

	type ComponentProps = {
		imageUrl: string;
	};

	let { imageUrl }: ComponentProps = $props();

	type FormField = {
		name: string;
		label: string;
		type: string;
		value: string;
		required: boolean;
		error: string;
	};

	const formFields: FormField[] = [
		{
			name: 'name',
			label: 'Name',
			type: 'text',
			value: '',
			required: true,
			error: ''
		},
		{
			name: 'price',
			label: 'Price',
			type: 'number',
			value: '',
			required: true,
			error: ''
		}
	];
</script>

<div class="w-64 flex-shrink-0">
	<div class="mb-4 h-48 w-full">
		<img src={imageUrl} alt="Item" class="h-full w-full rounded-b-md rounded-t-xl object-cover" />
	</div>

	<div class="flex flex-col gap-3">
		{#each formFields as field, i}
			<Input {...field} />
		{/each}
	</div>
</div>
