<script lang="ts">
  import Chevron from "$lib/icons/Chevron.svelte";
  import { text } from "@sveltejs/kit";

  let {
    category,
    depth = 0,
    current = false,
    onclick,
  }: {
    category: Kategorija;
    depth?: number;
    current?: boolean;
    onclick?: () => void;
  } = $props();
</script>

<button
  class="p-3 flex items-center gap-2 rounded-lg"
  class:bg-red-700={current}
  style={`padding-left: ${0.75 + depth * 1.5}rem;`}
  type="button"
  {onclick}
>
  <Chevron color={current ? "#fff" : "#525252"} size={24} rotate={current ? 0 : -90} />

  <span class="text-base font-medium text-neutral-600" class:text-neutral-50={current}
    >{category.nazivId}</span
  >
</button>
