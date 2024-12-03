<script lang="ts">
	import MajorCategoryCard from './MajorCategoryCard.svelte';

	const majorCategories = [
		{
			label: 'Numizmatika',
			href: '/katalog/843a7a8a-cac9-4bac-ae20-30c08d626b6c',
			imgSrc: '/264133_A cinematic close-up shot of old coins and money p_xl-1024-v1-0.png'
		},
		{
			label: 'Kristali i poludrago kamenje',
			href: '/katalog/60e9708b-e28f-4a85-9f05-0965845cc2ba',
			imgSrc: '/888150_A cinematic close-up shot of a collection of spark_xl-1024-v1-0.png'
		},
		{
			label: 'Razglednice',
			href: '/katalog/fbf0947c-fd1b-4b86-ae53-c9136dc76d84',
			imgSrc: '/105386_A cinematic close-up shot of a scattered collectio_xl-1024-v1-0.png'
		},
		{
			label: 'Albumi, listovi i pribor',
			href: '/katalog/d95bc6be-2405-402f-ba69-a590ed6dbcf5',
			imgSrc: '/135141_A cinematic close-up shot of vintage numismatic an_xl-1024-v1-0.png'
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
