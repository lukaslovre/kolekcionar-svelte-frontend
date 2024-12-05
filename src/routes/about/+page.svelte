<script lang="ts">
	const listItems: string[] = [
		'Trgovina kolekcionar',
		'Online katalog',
		'Radno vreme: 09:00 - 17:00',
		'Adresa: Beograd, Srbija',
		'Telefon: 011/123-456'
	];
</script>

<h1 class="mb-4 text-3xl font-bold">O nama</h1>

<ul class="list-inside list-disc space-y-2">
	{#each listItems as item}
		<li class="text-lg text-neutral-700">{item}</li>
	{/each}
</ul>
