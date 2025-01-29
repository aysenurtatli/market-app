import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//FETCH
export const fetchProductsAsync = createAsyncThunk('products/fetchProductsAsync', async () => {
    return axios.get('http://localhost:3000/products')
        .then(response => response.data)
        .catch(err => {
            throw err;
        })
})

//ADD
export const addNewProduct = createAsyncThunk('products/addNewProduct', async (newProduct, thunkAPI) => {
    return axios.post('http://localhost:3000/products', newProduct)
        .then(response => response.data)
        .catch(err => thunkAPI.rejectWithValue(err.response?.data || err.message))
});

//DELETE
export const deleteProductAsync = createAsyncThunk('products/deleteProductAsync', async (id, thunkAPI) => {
    return axios.delete(`http://localhost:3000/products/${id}`)
        .then(() => id)
        .catch(err => thunkAPI.rejectWithValue(err.response?.data || err.message))
});






const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product.id !== action.payload)
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                console.error('Failed', action.payload)
            })
    },
});




export default productSlice.reducer