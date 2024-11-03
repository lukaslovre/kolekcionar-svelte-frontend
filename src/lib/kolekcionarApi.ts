class kolekcionarApi {
  private static baseUrl = "http://localhost:3000";

  static async getKategorijeList() {
    const response = await fetch(`${this.baseUrl}/kategorije/all`);
    return response.json();
  }

  static async getKategorijaById(id: string): Promise<{
    message: string;
    data: KategorijaTree;
  }> {
    const response = await fetch(`${this.baseUrl}/kategorije/treeFrom/${id}`);
    return response.json();
  }

  static async getKategorijaFromRoot(): Promise<{
    message: string;
    data: KategorijaTree;
  }> {
    const response = await fetch(`${this.baseUrl}/kategorije/treeFrom/root`);
    return response.json();
  }
}

export default kolekcionarApi;
