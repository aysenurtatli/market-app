import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBrandsAsync = createAsyncThunk("brands/fetchBrands", async (_, thunkAPI) => {
    return axios
        .get("http://localhost:3000/brands")
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
});

export const addBrandAsync = createAsyncThunk(
    "brands/addBrand",
    async (newBrand, thunkAPI) => {
        return axios
            .post("http://localhost:3000/brands", newBrand)
            .then((response) => response.data)
            .catch((err) => thunkAPI.rejectWithValue(err.response?.data || err.message));
    }
)

export const deleteBrandAsync = createAsyncThunk(
    "brands/deleteBrandAsync", async (id, thunkAPI) => {
        return axios.delete(`http://localhost:3000/brands/${id}`)
            .then(() => id)
            .catch((err) => thunkAPI.rejectWithValue(err.response?.data || err.message))
    }
)

