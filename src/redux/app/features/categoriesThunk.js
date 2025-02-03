import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategoriesAsync = createAsyncThunk("categories/fetchCategories", async (_, thunkAPI) => {
    return axios
        .get("http://localhost:3000/categories")
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        })
})

export const addCategoryAsync = createAsyncThunk("categories/addCategory", async (newCategory, thunkAPI) => {
    return axios
        .post("http://localhost:3000/categories", newCategory)
        .then((response) => response.data)
        .catch((err) => thunkAPI.rejectWithValue(err.response?.data || err.message));
})

export const updateCategoryAsync = createAsyncThunk("categories/updateCategory", async (updatedCategory) => {
    const { id, kdv } = updatedCategory;
    const response = await axios.patch(`http://localhost:3000/categories/${id}`, { kdv });
    return response.data;
})