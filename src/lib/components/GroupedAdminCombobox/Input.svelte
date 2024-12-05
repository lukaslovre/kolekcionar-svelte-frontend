<script lang="ts">
	type InputProps = {
		name: string;
		value?: string;
		placeholder: string;
		onInput?: (value: string) => void;
	};

	let { name, value = '', placeholder, onInput }: InputProps = $props();
</script>

<input
	type="text"
	aria-label={name}
	{placeholder}
	{value}
	{name}
	oninput={(e) => onInput?.(e.currentTarget.value)}
	class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-100
	"
/>
