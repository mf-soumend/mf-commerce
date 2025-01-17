import { createSlice } from "@reduxjs/toolkit";

export interface SingleCartProp {
  productId: number;
  quantity: number;
  price: number;
  name: string;
  thumbnail: string;
  minimumOrderQuantity: number;
}

interface CartProps {
  cart: SingleCartProp[];
}
const initialState: CartProps = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const idx = state.cart.findIndex(
        ({ productId }) => productId === action.payload.productId
      );
      if (idx !== -1) {
        state.cart[idx].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    updateCart: (state, action) => {
      const idx = state.cart.findIndex(
        ({ productId }) => productId === action.payload.productId
      );
      if (idx !== -1) {
        state.cart[idx].quantity = action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        ({ productId }) => productId !== action.payload.productId
      );
    },
    removeAll: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, updateCart, removeFromCart, removeAll } =
  cartSlice.actions;
export const selectCart = (state: any) => state.cart.cart;

export default cartSlice.reducer;
