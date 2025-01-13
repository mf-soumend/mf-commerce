import { api, endPoints } from "src/api";

export const fetchAllCategories = async () => {
  return api.get(endPoints.product.category);
};
