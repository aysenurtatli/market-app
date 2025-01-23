import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    user: JSON.parse(localStorage.getItem('user')) || null,
};

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
        }
    }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer