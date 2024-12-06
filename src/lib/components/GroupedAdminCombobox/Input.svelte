<script lang="ts">
	type InputProps = {
		name: string;
		value?: string;
		placeholder: string;
	};

	let { name, value = '', placeholder }: InputProps = $props();
</script>

<input
	type="text"
	aria-label={name}
	{placeholder}
	{value}
	{name}
	class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-100"
/>
