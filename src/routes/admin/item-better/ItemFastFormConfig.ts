export type ItemCreationColumnProps = {
	images: ImageResponse[];
	baseData: FieldConfig[];
	tagsData: FieldConfig;
	additionalData: FieldConfig[];
};

// Validators

const numberValidator: Validator = (value: any) => {
	if (isNaN(value)) {
		return 'Cijena mora biti broj';
	}
	if (value < 0) {
		return 'Cijena ne može biti negativna';
	}
	return null;
};

export function createItemCreationColumnData(image: ImageResponse): ItemCreationColumnProps {
	return {
		images: [image],
		baseData: [
			{
				id: 'kategorijaId',
				label: 'Kategorija ID',
				value: '',
				type: 'text',
				parse: String
			},
			{
				id: 'nazivId',
				label: 'Naziv ID',
				value: '',
				type: 'text',
				parse: String,
				options: { maxLength: 128 }
			},
			{
				id: 'cijena',
				label: 'Cijena',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'opis',
				label: 'Opis',
				value: '',
				type: 'textarea',
				parse: String,
				options: { rows: 4 }
			}
		],
		tagsData: { id: 'tags', label: 'Tags', value: [], type: 'tagsCombobox', parse: String },
		additionalData: [
			{
				id: 'limit',
				label: 'Limit',
				value: 1,
				type: 'number',
				parse: Number,
				validators: [numberValidator]
				// options: { defaultValue: 1 }
			},
			{
				id: 'tip',
				label: 'Tip',
				value: '',
				type: 'typeAutocompleteInput',
				parse: String,
				options: { defaultValue: 'ostalo' }
			},
			{ id: 'groupId', label: 'Group ID', value: '', type: 'text', parse: String },
			{
				id: 'vrijemeDodavanja',
				label: 'Vrijeme dodavanja',
				value: '',
				type: 'text',
				parse: String
			},
			{
				id: 'countryId',
				label: 'Country ID',
				value: '',
				type: 'countryCombobox',
				parse: String
			},
			{
				id: 'nominala',
				label: 'Nominala',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'godina',
				label: 'Godina',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'mintage',
				label: 'Mintage',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'promjer',
				label: 'Promjer (mm)',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'masa',
				label: 'Masa (g)',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'visina',
				label: 'Visina (mm)',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'sirina',
				label: 'Širina (mm)',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			},
			{
				id: 'duljina',
				label: 'Duljina (mm)',
				value: '',
				type: 'number',
				parse: Number,
				validators: [numberValidator]
			}
		]
	};
}
