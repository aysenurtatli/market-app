import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoriesAsync, addCategoryAsync, updateCategoryAsync } from "./categoriesThunk";

const initialState = {
    categories: [],
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload
                }
            })
    }

})

export default categoriesSlice.reducer