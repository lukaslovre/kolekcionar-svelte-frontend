<script lang="ts">
  import Checkmark from "$lib/icons/Checkmark.svelte";
  import Search from "$lib/icons/Search.svelte";

  type AdminComboboxProps = {
    label: string;
    options: {
      label: string;
      value: string;
    }[];
    selectedValues: string[];
    onSelectedChange: (selectedValues: string[]) => void;
    onAddOption: (optionLabel: string) => Promise<{
      label: string;
      value: string;
    }>;
  };
  let {
    label,
    options,
    selectedValues,
    onSelectedChange,
    onAddOption,
  }: AdminComboboxProps = $props();

  let isOpen: boolean = $state(false);
  let searchValue: string = $state("");

  let filteredOptions = $derived(
    options.filter(({ value, label }) =>
      label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
  );

  function toggleValue(value: string) {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    selectedValues = newSelectedValues;
    onSelectedChange(newSelectedValues);
  }

  async function createOption() {
    try {
      const newTag = await onAddOption(searchValue);
      options = [...options, newTag];
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="relative">
  <button
    class="bg-white px-4 py-3 rounded-md border font-medium text-sm w-full {isOpen
      ? 'border-sky-700'
      : 'border-neutral-400'} transition-colors"
    type="button"
    onclick={() => {
      isOpen = !isOpen;
    }}
  >
    {selectedValues.length > 0
      ? selectedValues
          .map((value) => options.find((option) => option.value === value)?.label || "")
          .join(", ")
      : `Select ${label}`}
  </button>

  <!-- Dropdown options container -->
  {#if isOpen}
    <div
      class="absolute top-full mt-2 w-full flex flex-col gap-1 p-1 bg-white rounded-md border border-neutral-400 shadow-md"
    >
      <!-- Search -->
      <div class="flex gap-2 items-center px-3 py-2">
        <Search color="#808080" />
        <input
          type="text"
          class="rounded-sm font-normal text-sm flex-1 outline-none"
          placeholder="Search"
          bind:value={searchValue}
        />

        {#if filteredOptions.length === 0}
          <button
            type="button"
            class="text-sky-700 text-sm font-semibold"
            onclick={createOption}>Create "{searchValue}"</button
          >
        {/if}
      </div>

      <!-- Options -->
      {#each filteredOptions as { label, value } (value)}
        <button
          type="button"
          class="px-3 py-2 hover:bg-neutral-100 rounded-sm font-normal text-sm flex gap-2 items-center"
          onclick={() => {
            toggleValue(value);
          }}
        >
          <Checkmark color={selectedValues.includes(value) ? "#000" : "transparent"} />
          {label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  button {
    text-align: left;
  }
</style>
