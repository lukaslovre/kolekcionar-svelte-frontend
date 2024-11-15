<script lang="ts">
  type ItemTagProps = {
    tag: Tag;
  };

  let { tag }: ItemTagProps = $props();
</script>

<span
  class="py-1 px-2 text-sky-800 border border-sky-800 rounded-full font-semibold text-xs"
>
  {tag.naziv}
</span>
