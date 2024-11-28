<script lang="ts">
	type MajorCategoryCardProps = {
		label: string;
		href: string;
		imgSrc: string;
		disabled?: boolean;
	};

	let { label, href, imgSrc, disabled = false }: MajorCategoryCardProps = $props();
</script>

<a {href} class="relative h-64 w-full {disabled && 'pointer-events-none'}">
	<img src={imgSrc} alt={label} class="absolute inset-0 h-full w-full rounded-lg object-cover" />

	<div
		class="absolute inset-0 flex items-end rounded-lg bg-gradient-to-b from-black/15 to-black/75
         transition-colors hover:from-black/10 hover:to-black/15
        "
	>
		<h2 class="p-4 text-2xl font-bold text-white">{label}</h2>
	</div>
</a>
