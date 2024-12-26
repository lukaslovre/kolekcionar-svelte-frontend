<script lang="ts">
	type CategoryDescriptionProps = {
		title: string;
		text: string;
	};

	let { title, text }: CategoryDescriptionProps = $props();

	function splitParagraphs(text: string) {
		return text.split('\n');
	}
</script>

<div class="rounded-lg border border-neutral-300 bg-white/50 p-4">
	<p class="mb-3 text-sm font-semibold text-sky-800">{title}</p>
	<div class="flex flex-col gap-2">
		{#each splitParagraphs(text) as paragraph}
			<p class="text-sm font-normal leading-relaxed">{paragraph}</p>
		{/each}
	</div>
</div>
