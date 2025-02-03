import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './features/loginSlice'
import productReducer from './features/productSlice'
import checkoutReducer from './features/checkoutSlice'
import brandReducer from './features/brandSlice'
import categoriesReducer from './features/categoriesSlice'

export const store = configureStore({
    reducer: {
        auth: loginReducer,
        products: productReducer,
        brands: brandReducer,
        checkout: checkoutReducer,
        categories: categoriesReducer,
    }
})