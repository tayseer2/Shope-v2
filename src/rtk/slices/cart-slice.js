import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
    const cart = localStorage.getItem('cartSlice');
    return cart ? JSON.parse(cart) : [];
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: loadFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            const findProduct = state.find((product) => product.id === action.payload.id);
            if (findProduct) {
                findProduct.quantity += 1;
            } else {
                const cloneProducts = { ...action.payload, quantity: 1 }
                state.push(cloneProducts)
            }
        },
        deleteFromCart: (state, action) => {
            return state.filter((product) => product.id !== action.payload.id);
        },
        clear: (state, action) => {
            return [];
        },
        increaseQuantity: (state, action) => {
            const itemIndex = state.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
              state[itemIndex].quantity += 1;
            }
          },
          decreaseQuantity: (state, action) => {
            const itemIndex = state.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0 && state[itemIndex].quantity > 1) {
              state[itemIndex].quantity -= 1;
            }
          }
    },
})

export const { addToCart, deleteFromCart, clear, increaseQuantity, decreaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;

