import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const completeSale = createAsyncThunk('checkout/completeSale', async (checkoutProducts, thunkAPI) => {
    return axios.post('http://localhost:3000/sales', {
        date: new Date().toISOString(),
        products: checkoutProducts,
    })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        })
})

const initialState = {
    checkoutProducts: [],
    sales: [],
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