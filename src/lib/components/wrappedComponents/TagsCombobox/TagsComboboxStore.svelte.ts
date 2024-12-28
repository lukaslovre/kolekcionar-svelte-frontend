// This is Svelte 5

import kolekcionarApi from '$lib/kolekcionarApi';

class TagsComboboxStore {
	tagOptions: Tag[] = $state([]);

	async initializeStore(): Promise<void> {
		try {
			const response = await kolekcionarApi.getTagsList();
			console.log(response);

			if (response.error) throw new Error(response.error);

			this.tagOptions = response.data;
		} catch (error) {
			console.log(error);
		}
	}

	addTag(tag: Tag): void {
		this.tagOptions.push(tag);
	}
}

export const tagsComboboxStore = new TagsComboboxStore();
