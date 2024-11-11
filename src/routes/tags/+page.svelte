<script lang="ts">
  import AdminCombobox from "$lib/components/AdminCombobox/AdminCombobox.svelte";
  import kolekcionarApi from "$lib/kolekcionarApi";

  let comboboxValues: string[] = $state([]);

  let tagOptions: Tag[] = $state([]);

  $effect(() => {
    (async () => {
      const response = await kolekcionarApi.getTagsList();

      tagOptions = response.data;
    })();
  });

  $inspect(comboboxValues);

  async function handleAddOption(option: string) {
    const response = await kolekcionarApi.createTag({ naziv: option });

    alert(response.message);
  }
</script>

<h1>Tags</h1>

<AdminCombobox
  label="Tags"
  options={tagOptions.map((tag) => tag.naziv)}
  bind:values={comboboxValues}
  onAddOption={handleAddOption}
/>
