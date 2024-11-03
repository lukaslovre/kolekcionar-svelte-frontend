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
