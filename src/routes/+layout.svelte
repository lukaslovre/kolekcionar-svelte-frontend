<script lang="ts">
  import "../app.css";
  let { children } = $props();

  const navItems = [
    { name: "Katalog", href: "/catalog" },
    { name: "O nama", href: "/about" },
    { name: "item", href: "/item" },
  ];
</script>

<header
  class="bg-orange-200 flex justify-between items-center px-8 py-4 border-b border-neutral-500 shadow-md"
>
  <a class="flex items-center gap-4" href="/">
    <img src="/kolekcionar-logo-96.png" alt="Logo" />
    <div>
      <h1 class="pb-1 lora-font font-medium text-2xl">Trgovina kolekcionar</h1>
      <h2 class="lora-font text-xl text-neutral-800">Online katalog</h2>
    </div>
  </a>

  <nav class="flex gap-8">
    {#each navItems as { name, href }}
      <a class="text-neutral-800 uppercase text-lg hover:text-red-700" {href}>{name}</a>
    {/each}
  </nav>
</header>

<main class="px-4 py-12 max-w-screen-lg mx-auto">
  {@render children()}
</main>

<style>
  .lora-font {
    font-family: "Lora", serif;
  }
</style>
