<script lang="ts">
	import MajorCategoryCard from './MajorCategoryCard.svelte';

	const majorCategories = [
		{
			label: 'Numizmatika',
			href: '/katalog/numizmatika',
			imgSrc: '/264133_A cinematic close-up shot of old coins and money p_xl-1024-v1-0.png'
		},
		{
			label: 'Kristali i poludrago kamenje',
			href: '/katalog/kristali-i-poludrago-kamenje',
			imgSrc: '/888150_A cinematic close-up shot of a collection of spark_xl-1024-v1-0.png'
		}
	];
</script>

<!-- TODO: this will show the main categories and redirect to further katalog/slug -->
<a href="/katalog/root">Root</a>

<section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each majorCategories as category}
		<MajorCategoryCard {...category} />
	{/each}
</section>
