import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // console.log(state, action);
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // console.log(state, action);
      const indx = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (indx >= 0) {
        newBasket.splice(indx, 1);
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketTotalPrice = (state) =>
  state.basket.items.reduce((total, item) => {
    return total += parseFloat(item.price);
  }, 0);

export const selectBasketItemsById = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketItemTotalPrice = (state, id) => {
  let total = 0;
  state.basket.items.map((item) => {
    if (item.id === id) {
      total += parseFloat(item.price);
    }
  });
  return total;
};

export default basketSlice.reducer;
