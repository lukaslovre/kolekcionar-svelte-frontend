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

  async function handleAddOption(option: string): Promise<{
    label: string;
    value: string;
  }> {
    const response = await kolekcionarApi.createTag({ naziv: option });

    console.log(response);

    if (!response.data) {
      throw new Error(response.message);
    }

    // If it contains necessary fields (id and naziv, both strings)
    if (!response.data.id || !response.data.naziv) {
      throw new Error("Invalid response data");
    }

    return { label: response.data.naziv, value: response.data.id };
  }
</script>

<h1>Tags</h1>

<AdminCombobox
  label="Tags"
  options={tagOptions.map((tag) => ({ label: tag.naziv, value: tag.id }))}
  bind:selectedValues={comboboxValues}
  onAddOption={handleAddOption}
/>
