import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const completeSale = createAsyncThunk('checkout/completeSale', async (checkoutProducts, thunkAPI) => {
    return axios.post('http://localhost:3000/sales', {
        date: new Date(),
        products: checkoutProducts,
    })
        .then((response) => {
            const saleData = response.data;
            const stockUpdate = checkoutProducts.map((product) => {
                return axios.patch(`http://localhost:3000/products/${product.id}`, {
                    stock: product.stock - product.quantity,
                });
            });

            return Promise.all(stockUpdate)
                .then(() => saleData)
                .catch((error) => {
                    throw new Error("stock update failed", error.message);
                })
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(completeSale.fulfilled, (state, action) => {
                console.log('completed', action.payload)
                state.sales.push(action.payload)
                state.checkoutProducts = [];
            })
            .addCase(completeSale.rejected, (state, action) => {
                console.error(action.payload)
            })
    }
})

export const { addToCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer