import { createSlice } from "@reduxjs/toolkit";
import { addBrandAsync, fetchBrandsAsync, deleteBrandAsync } from "./brandThunks";

const initialState = {
    brands: [],
};

const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.brands = action.payload;
            })
            .addCase(addBrandAsync.fulfilled, (state, action) => {
                state.brands.push(action.payload);
            })
            .addCase(deleteBrandAsync.fulfilled, (state, action) => {
                state.brands = state.brands.filter((brand) => brand.id !== action.payload)
            })
    }
})

export default brandSlice.reducer