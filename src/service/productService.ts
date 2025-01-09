import { api, endPoints } from "src/api";

export interface ProductPayload {
  limit: number;
  skip: number;
  shortBy?: string;
  order?: "asc" | "dsc";
  select?: string[];
  selectedCategory: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export const fetchAllProducts = async (
  productPayload: ProductPayload
): Promise<ProductsResponse> => {
  if (productPayload.selectedCategory === "all") {
    return api.get(endPoints.product.getProducts, {
      params: {
        ...productPayload,
      },
    });
  }
  return api.get(
    endPoints.product.getProductsByCategory + productPayload.selectedCategory,
    {
      params: {
        ...productPayload,
      },
    }
  );
};
