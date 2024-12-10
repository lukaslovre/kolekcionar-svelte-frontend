<script lang="ts">
	type FormField = {
		name: string;
		label: string;
		type: string;
		value: string;
		required: boolean;
		error: string;
	};

	let { name, label, type, value, required, error }: FormField = $props();
</script>

<div>
	<input
		{type}
		id={name}
		bind:value
		{required}
		placeholder={label}
		class="w-full rounded border border-neutral-200 bg-white p-3 text-sm focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-300/25"
	/>
	{#if error}
		<p>{error}</p>
	{/if}
</div>
