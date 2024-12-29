<script lang="ts">
	type InfoHoverProps = {
		text: string;
	};

	let { text }: InfoHoverProps = $props();
</script>

<span class="peer cursor-pointer">🛈</span>

<div
	class="absolute top-full z-20 hidden w-max max-w-56 rounded-lg border border-gray-200 bg-white p-4 leading-relaxed shadow-lg hover:block peer-hover:block"
>
	{text}
</div>
