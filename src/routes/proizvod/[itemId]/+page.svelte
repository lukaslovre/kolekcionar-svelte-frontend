<script lang="ts">
	import type { PageData } from './$types';

	type LoadReturn = {
		title: string;
		itemIdParam: string;
		item: Item | null;
	};
	type PageProps = {
		// data: PageData;
		data: LoadReturn;
	};

	let { data }: PageProps = $props();
</script>

<h1>Welcome to /proizvod/{data.itemIdParam}</h1>

{#if data.item}
	<pre>
    {JSON.stringify(data.item, null, 2)}
</pre>
{:else}
	<p>Item not found</p>
{/if}
