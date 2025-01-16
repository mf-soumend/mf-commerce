import { api, endPoints } from "src/api";

export const getCartDetails = async (id: number) => {
  return api.get(endPoints.cart.getCartDetails + id);
};
