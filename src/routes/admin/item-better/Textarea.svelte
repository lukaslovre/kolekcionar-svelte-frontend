<script lang="ts">
	import { get } from 'svelte/store';

	type InputProps = FieldConfig & {
		onInput: (value: any) => void;
		getPreviousItemValue?: (id: string) => any;
	};

	let {
		id,
		label,
		type,
		value,
		parse,
		required,
		disabled,
		validators,
		touched,
		error,
		options,

		onInput,
		getPreviousItemValue
	}: InputProps = $props();

	function handleInput(e: Event) {
		const originalValue = (e.target as HTMLTextAreaElement).value;

		const parsedValue = parse ? parse(originalValue) : originalValue;

		error = validators
			? validators
					.map((validator) => validator(parsedValue))
					.filter(Boolean)
					.join('. ')
			: '';

		if (!error) {
			onInput(parsedValue);
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		// If ctrl + enter is pressed
		if (e.ctrlKey && e.key === 'Enter') {
			if (getPreviousItemValue) {
				const nextItemValue = getPreviousItemValue(id);

				if (nextItemValue) {
					onInput(nextItemValue);
				}
			}
		}
	}
</script>

<div>
	{#if error}
		<p class="text-xs font-medium text-red-700">{error}</p>
	{/if}
	<textarea
		{id}
		{required}
		{disabled}
		{value}
		placeholder={label}
		oninput={handleInput}
		onkeypress={handleKeyPress}
		class="min-h-32 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-100"
	></textarea>
</div>
