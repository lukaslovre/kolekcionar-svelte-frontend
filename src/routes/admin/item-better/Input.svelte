<script lang="ts">
	let {
		id,
		label,
		type,
		value,
		parse,
		required = false,
		disabled = false,
		options,
		error
	}: FieldConfig = $props();
</script>

<div>
	<input
		type="text"
		{id}
		{required}
		{disabled}
		{...options}
		{value}
		placeholder={label}
		class="w-full rounded border border-neutral-200 bg-white p-3 text-sm focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-300/25"
	/>
	{#if error}
		<p>{error}</p>
	{/if}
</div>
