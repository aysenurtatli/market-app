import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './features/loginSlice'
import productReducer from './features/productSlice'
import checkoutReducer from './features/checkoutSlice'

export const store = configureStore({
    reducer: {
        auth: loginReducer,
        products: productReducer,
        checkout: checkoutReducer,
    }
})