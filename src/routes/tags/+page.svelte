<script lang="ts">
	import TagsCombobox from '$lib/wrappedComponents/TagsCombobox.svelte';
</script>

<h1>Tags</h1>

<!-- <AdminCombobox
	label="Tags"
	options={tagOptions.map((tag) => ({ label: tag.naziv, value: tag.id }))}
	bind:selectedValues={comboboxValues}
	onAddOption={handleAddOption}
/> -->

<TagsCombobox onSelectedChange={console.log} />
