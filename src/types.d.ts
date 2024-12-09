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

interface ApiResponse<T> {
	message: string;
	data: T;
}

// Country
interface Country {
	id: string;
	name: string;
	code: string;
}

// FORM
type FieldType =
	| 'text'
	| 'number'
	| 'textarea'
	| 'tagsCombobox'
	| 'typeAutocompleteInput'
	| 'countryCombobox';
type Parser = (value: FormDataEntryValue | null) => string | number | string[];

interface FieldConfig {
	id: string;
	label: string;
	type: FieldType;
	value: string;
	parse: Parser;
	required?: boolean;
	disabled?: boolean;
	options?: {
		maxLength?: number;
		defaultValue?: string | number;
		rows?: number;
	};
	error: string;
}
