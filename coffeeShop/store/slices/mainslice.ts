import { createSlice } from "@reduxjs/toolkit";

interface CoffeeProp {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: any;
  size?: string;
}

interface CartItem extends CoffeeProp {
  qty: number;
}

interface StoreState {
  cart: CartItem[];
}

const storeS: StoreState = {
  cart: [],
};

const mainSlice = createSlice({
  name: "mainState",
  initialState: storeS,
  reducers: {
    mainStateReducer: (state, action) => {
      state.cart = action.payload.cart;
    },
  },
});

export const { mainStateReducer } = mainSlice.actions;
export default mainSlice.reducer;
