<script lang="ts">
  import CategoryTreeItem from "./CategoryTreeItem.svelte";
  import CategoryTreeItemChildren from "./CategoryTreeItemChildren.svelte";
  import CategoryTreeItemParent from "./CategoryTreeItemParent.svelte";

  let {
    categoryTree,
    fetchCategoryTreeFromId,
  }: { categoryTree: KategorijaTree; fetchCategoryTreeFromId: (id: string) => void } =
    $props();

  const maxDepth = $derived(Math.max(...categoryTree.parents.map((p) => p.level), -1));

  $inspect(maxDepth);
</script>

<div class="flex flex-col gap-1">
  {#each categoryTree.parents as category (category.id)}
    <CategoryTreeItemParent
      {category}
      depth={category.level}
      onclick={() => fetchCategoryTreeFromId(category.id)}
    />
  {/each}

  {#each categoryTree.siblings as category (category.id)}
    <CategoryTreeItem
      {category}
      current={category.id === categoryTree.selectedCategory.id}
      depth={maxDepth + 1}
      onclick={() => fetchCategoryTreeFromId(category.id)}
    />
  {/each}

  {#each categoryTree.children as category (category.id)}
    <CategoryTreeItemChildren
      {category}
      depth={maxDepth + 2}
      onclick={() => fetchCategoryTreeFromId(category.id)}
    />
  {/each}
</div>
