<script lang="ts">
  import Checkmark from "$lib/icons/Checkmark.svelte";
  import Search from "$lib/icons/Search.svelte";

  type AdminComboboxProps = {
    label: string;
    options: string[];
    values: string[];
    onAddOption: (option: string) => void;
  };

  let {
    label,
    options,
    values = $bindable(),
    onAddOption,
  }: AdminComboboxProps = $props();

  let isOpen: boolean = $state(true);
  let searchValue: string = $state("");

  let filteredOptions = $derived(
    options.filter((option) => option.includes(searchValue))
  );

  function toggleValue(value: string) {
    if (values.includes(value)) {
      values = values.filter((v) => v !== value);
    } else {
      values = [...values, value];
    }
  }

  function createOption() {
    onAddOption(searchValue);
  }
</script>

<div class="flex flex-col gap-1">
  <button
    class="bg-white px-4 py-3 rounded-md border font-medium text-sm {isOpen
      ? 'border-sky-700'
      : 'border-neutral-400'}"
    type="button"
    onclick={() => {
      isOpen = !isOpen;
    }}
  >
    {values.length > 0 ? values.join(", ") : "Select tags"}
  </button>

  <!-- Dropdown options container -->
  {#if isOpen}
    <div
      class="flex flex-col gap-1 p-1 bg-white rounded-md border border-neutral-400 shadow-md"
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
      {#each filteredOptions as option (option)}
        <button
          type="button"
          class="px-3 py-2 hover:bg-neutral-100 rounded-sm font-normal text-sm flex gap-2 items-center"
          onclick={() => {
            toggleValue(option);
          }}
        >
          <Checkmark color={values.includes(option) ? "#000" : "transparent"} />
          {option}
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
