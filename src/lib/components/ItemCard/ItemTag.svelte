<script lang="ts">
	type ItemTagProps = {
		tag: Tag;
	};

	let { tag }: ItemTagProps = $props();
</script>

<span class="rounded-full border border-sky-800 px-2 py-1 text-xs font-semibold text-sky-800">
	{tag.naziv}
</span>
