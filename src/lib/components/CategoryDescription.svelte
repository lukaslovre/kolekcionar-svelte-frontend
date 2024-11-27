<script lang="ts">
	type CategoryDescriptionProps = {
		title: string;
		text: string;
	};

	let { title, text }: CategoryDescriptionProps = $props();
</script>

<div class="mb-10 rounded-lg border border-neutral-300 bg-white p-4">
	<p class="mb-3 text-sm font-semibold text-sky-800">{title}</p>
	<p class="text-sm font-normal leading-relaxed">{text}</p>
</div>
