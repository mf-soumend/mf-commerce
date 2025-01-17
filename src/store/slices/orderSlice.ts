import { createSlice } from "@reduxjs/toolkit";
import { SingleCartProp } from "./cartSlice";

interface OrderProp {
  id: number;
  cartData: SingleCartProp[];
  items: number;
  date: Date;
  status: string;
  address: string;
}

interface OrdersProps {
  orders: OrderProp[];
}

const initialState: OrdersProps = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const lastId =
        state.orders.length > 0 ? state.orders[state.orders.length - 1].id : 0;
      state.orders.push({
        id: lastId + 1,
        cartData: action.payload.cart,
        date: new Date(),
        status: "Processing",
        items: action.payload.cart.length,
        address: action.payload.address,
      });
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export const selectOrder = (state: any) => state.orders.orders;

export default ordersSlice.reducer;
