<script lang="ts">
  import CategoryTree from "$lib/components/CategoryTree/CategoryTree.svelte";
  import kolekcionarApi from "$lib/kolekcionarApi";

  let categoryTree: KategorijaTree | undefined = $state();

  $effect(() => {
    getKategorije();
  });

  async function getKategorije() {
    const { data } = await kolekcionarApi.getKategorijaFromRoot();
    console.log(data);

    categoryTree = data;
  }

  async function fetchCategoryTreeFromId(id: string) {
    const { data } = await kolekcionarApi.getKategorijaById(id);
    console.log(data);

    categoryTree = data;
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>

{#if categoryTree}
  <CategoryTree {categoryTree} {fetchCategoryTreeFromId} />
{:else}
  <p>Loading...</p>
{/if}
