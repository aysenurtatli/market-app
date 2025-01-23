import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkoutProducts: [],
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addToCheckout: (state, action) => {
            const existingProduct = state.checkoutProducts.find((product) => product.id === action.payload.id)
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.checkoutProducts.push({ ...action.payload, quantity: 1 });
            }

        }
    }
})

export const { addToCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer