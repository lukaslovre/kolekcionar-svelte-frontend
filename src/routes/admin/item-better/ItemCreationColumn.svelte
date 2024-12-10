<script lang="ts">
	import Input from './Input.svelte';
	import type { ItemCreationColumnProps } from './ItemFastFormConfig';
	import Textarea from './Textarea.svelte';

	let { images, baseData, additionalData }: ItemCreationColumnProps = $props();

	let additionalDataVisible: boolean = $state(false);
</script>

<div class="w-64 flex-shrink-0">
	<div class="mb-4 h-48 w-full">
		<img
			src={URL.createObjectURL(images.at(0))}
			alt="Item"
			class="h-full w-full rounded-b-md rounded-t-xl object-cover"
		/>
	</div>

	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-3">
			{#each baseData as field, i}
				{#if field.type === 'text' || field.type === 'number'}
					<Input {...field} />
				{:else if field.type === 'textarea'}
					<Textarea {...field} />
				{:else}
					<p>
						{field.type} is not supported yet.
					</p>
				{/if}
			{/each}
		</div>

		<button
			type="button"
			class=" text-left text-sm font-semibold text-neutral-900"
			onclick={() => (additionalDataVisible = !additionalDataVisible)}>Pokaži dodatna polja</button
		>

		{#if additionalDataVisible}
			<div class="flex flex-col gap-3">
				{#each additionalData as field, i}
					{#if field.type === 'text' || field.type === 'number'}
						<Input {...field} />
					{:else if field.type === 'textarea'}
						<Textarea {...field} />
					{:else}
						<p>
							{field.type} is not supported yet.
						</p>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
