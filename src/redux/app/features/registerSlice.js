import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { register, setError } = registerSlice.actions;
export default registerSlice.reducer;