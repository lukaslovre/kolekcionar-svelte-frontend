<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { tagsComboboxStore } from '$lib/components/wrappedComponents/TagsCombobox/TagsComboboxStore.svelte';

	let { children } = $props();

	const navItems = [
		{ name: 'Katalog', href: '/katalog' },
		{ name: 'O nama', href: '/about' },
		// { name: 'item', href: '/admin/item' },
		{ name: 'Item pro', href: '/admin/item-better' },
		{ name: 'Kategorije', href: '/admin/kategorije' }
	];

	// Initialize stores for global state
	void tagsComboboxStore.initializeStore();
</script>

<header class="flex justify-center border-b border-black/25 bg-orange-200 px-8 py-4 shadow-md">
	<div class="flex w-full max-w-screen-xl items-center justify-between">
		<a class="flex items-center gap-4" href="/">
			<img src="/kolekcionar-logo-96.png" alt="Logo" />
			<div>
				<h1 class="lora-font pb-1 text-2xl font-medium">Trgovina kolekcionar</h1>
				<h2 class="lora-font text-xl text-neutral-800">Online katalog</h2>
			</div>
		</a>

		<nav class="flex gap-2">
			{#each navItems as { name, href }}
				<a
					class="rounded-lg px-6 py-3 text-lg uppercase transition-colors {page.route.id?.startsWith(
						href
					)
						? 'bg-red-800 font-semibold text-white shadow'
						: 'text-neutral-700 hover:text-red-900'}"
					{href}>{name}</a
				>
			{/each}
		</nav>
	</div>
</header>

<main class="mx-auto max-w-screen-xl border px-4 py-12">
	{@render children()}
</main>

<style>
	.lora-font {
		font-family: 'Lora', serif;
	}
</style>
