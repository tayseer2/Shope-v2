// import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products-slice'
import cartSlice from './slices/cart-slice'
import { localStorageMiddleware } from '../middleware/localStorageMiddleware'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
})
