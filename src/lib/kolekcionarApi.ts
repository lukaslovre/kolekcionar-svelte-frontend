type ApiResponse<T> = {
  message: string;
  data: T;
};

class kolekcionarApi {
  private static baseUrl = "http://localhost:3000";

  // Kategorije

  static async getKategorijeList(): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/kategorije/all`);
    return response.json();
  }

  static async getKategorijaById(id: string): Promise<ApiResponse<KategorijaTree>> {
    const response = await fetch(`${this.baseUrl}/kategorije/treeFrom/${id}`);
    return response.json();
  }

  static async getKategorijaFromRoot(): Promise<ApiResponse<KategorijaTree>> {
    const response = await fetch(`${this.baseUrl}/kategorije/treeFrom/root`);
    return response.json();
  }

  // Tags

  static async getTagsList(): Promise<ApiResponse<Tag[]>> {
    const response = await fetch(`${this.baseUrl}/tag`);
    return response.json();
  }

  static async createTag(tag: Omit<Tag, "id">): Promise<ApiResponse<Tag>> {
    const response = await fetch(`${this.baseUrl}/tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    return response.json();
  }

  // Items

  static async getItemsAll(): Promise<ApiResponse<Item[]>> {
    const response = await fetch(`${this.baseUrl}/item`);
    return response.json();
  }

  static async createItem(itemData: any) {
    const response = await fetch(`${this.baseUrl}/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    return response.json();
  }
}

export default kolekcionarApi;
