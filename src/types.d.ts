type Kategorija = {
  id: string;
  nazivId: string;
  parentId?: string | undefined;
  drzavaId?: string | undefined;
  isDead?: boolean | undefined;
  opis?: string | undefined;
  count?: number | undefined;
};

type KategorijaWithLevel = Kategorija & {
  level: number;
};

type KategorijaTree = {
  selectedCategory: Kategorija;
  parents: KategorijaWithLevel[];
  siblings: Kategorija[];
  children: Kategorija[];
};

// Tags

type Tag = {
  id: string;
  naziv: string;
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
  tags: {
    id: string;
    naziv: string;
  }[];
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
