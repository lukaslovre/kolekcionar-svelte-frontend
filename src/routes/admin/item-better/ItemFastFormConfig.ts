export type ItemCreationColumnProps = {
	images: File[];
	baseData: FieldConfig[];
	additionalData: FieldConfig[];
};

export function createItemCreationColumnData(image: File): ItemCreationColumnProps {
	return {
		images: [image],
		baseData: [
			{
				id: 'kategorijaId',
				label: 'Kategorija ID',
				value: '',
				type: 'text',
				parse: String,
				error: ''
			},
			{
				id: 'nazivId',
				label: 'Naziv ID',
				value: '',
				type: 'text',
				parse: String,
				options: { maxLength: 128 },
				error: ''
			},
			{ id: 'cijena', label: 'Cijena', value: '', type: 'number', parse: Number, error: '' },
			{
				id: 'opis',
				label: 'Opis',
				value: '',
				type: 'textarea',
				parse: String,
				options: { rows: 4 },
				error: ''
			}
		],
		additionalData: [
			{
				id: 'limit',
				label: 'Limit',
				value: '',
				type: 'number',
				parse: Number,
				options: { defaultValue: 1 },
				error: ''
			},
			{
				id: 'tip',
				label: 'Tip',
				value: '',
				type: 'typeAutocompleteInput',
				parse: String,
				options: { defaultValue: 'ostalo' },
				error: ''
			},
			{ id: 'groupId', label: 'Group ID', value: '', type: 'text', parse: String, error: '' },
			{
				id: 'vrijemeDodavanja',
				label: 'Vrijeme dodavanja',
				value: '',
				type: 'text',
				parse: String,
				error: ''
			},
			{
				id: 'countryId',
				label: 'Country ID',
				value: '',
				type: 'countryCombobox',
				parse: String,
				error: ''
			},
			{ id: 'nominala', label: 'Nominala', value: '', type: 'number', parse: Number, error: '' },
			{ id: 'godina', label: 'Godina', value: '', type: 'number', parse: Number, error: '' },
			{ id: 'mintage', label: 'Mintage', value: '', type: 'number', parse: Number, error: '' },
			{ id: 'promjer', label: 'Promjer (mm)', value: '', type: 'number', parse: Number, error: '' },
			{ id: 'masa', label: 'Masa (g)', value: '', type: 'number', parse: Number, error: '' },
			{ id: 'visina', label: 'Visina (mm)', value: '', type: 'number', parse: Number, error: '' },
			{ id: 'sirina', label: 'Širina (mm)', value: '', type: 'number', parse: Number, error: '' },
			{ id: 'duljina', label: 'Duljina (mm)', value: '', type: 'number', parse: Number, error: '' }
		]
	};
}
