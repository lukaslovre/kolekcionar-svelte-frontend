<script lang="ts">
  import ItemTag from "./ItemTag.svelte";

  type ItemCardProps = {
    item: Item;
  };

  let { item }: ItemCardProps = $props();
</script>

<div
  class="flex-1 max-w-80 min-w-40 flex flex-col bg-white border border-neutral-300 rounded"
>
  <img
    src={item.images.at(0)?.url || "item-default-img.jpg"}
    alt={item.nazivId}
    class="w-full h-64 object-cover rounded"
  />

  <div class="p-3 flex flex-col gap-2">
    <p class="text-lg font-semibold">€ {item.cijena}</p>
    {#if item.tags.length > 0}
      <div class="flex flex-wrap gap-2">
        {#each item.tags as tag}
          <ItemTag {tag} />
        {/each}
      </div>
    {/if}
    <h2 class="text-neutral-800">{item.nazivId}</h2>
  </div>
</div>
