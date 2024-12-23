type Kategorija = {
	id: string;
	nazivId: string;
	parentId?: string | undefined;
	drzavaId?: string | undefined;
	isDead?: boolean | undefined;
	opis?: string | undefined;
	count?: number | undefined;
};

type KategorijaWithCount = Kategorija & {
	totalItems?: number;
};

type KategorijaWithLevel = KategorijaWithCount & {
	level: number;
};

type KategorijaTree = {
	selectedCategory: Kategorija;
	parents: KategorijaWithLevel[];
	siblings: KategorijaWithCount[];
	children: KategorijaWithCount[];
};

// Tags
type Tag = {
	id: string;
	naziv: string;
	group: string;
	displayOnCard: boolean;
	displayOnDetails: boolean;
	description?: string;
	items?: [];
};

// Item
interface Item {
	id: number;
	cijena: number;
	limit: number;
	nazivId: string;
	kategorijaId: string;
	opis?: string;
	tags: Tag[];
	images: {
		id: string;
		url: string;
		itemId: number;
	}[];
	vrijemeDodavanja: Date;
	tip: string;
	nominala?: number;
	valuta?: string;
	godina?: number;
	kralj?: string;
	mintage?: number;
	materijal?: string;
	promjer?: number;
	masa?: number;
	kvaliteta?: string;
	pick?: string;
	serija?: string;
	naselje?: string;
	vrstaKamena?: string;
	visina?: number;
	sirina?: number;
	duljina?: number;
}

type ApiResponse<T> = {
	message: string;
	data: T;
	error?: string;
};

// Country
interface Country {
	id: string;
	name: string;
	code: string;
}

// Image

interface ImageResponse {
	filename: {
		original: string;
		new: string;
		lowres: string;
	};
	filesize: {
		original: number; // in bytes
		lowres: number; // in bytes
	};
}

//

//

// FORM
type FieldType =
	| 'text'
	| 'number'
	| 'textarea'
	| 'tagsCombobox'
	| 'typeAutocompleteInput'
	| 'countryCombobox';

type Parser = (value: FormDataEntryValue | null) => any;

type Validator = (value: any) => string | null; // string is error message, null is no error

interface FieldOptions {
	maxLength?: number;
	defaultValue?: any;
	rows?: number;
}

interface FieldConfig {
	id: string;
	label: string;
	type: FieldType;
	value: any;
	parse: Parser;
	required?: boolean;
	disabled?: boolean;
	validators?: Validator[];
	touched?: boolean;
	error?: string;
	options?: FieldOptions;
}
