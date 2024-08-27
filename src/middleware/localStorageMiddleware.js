// middleware/localStorageMiddleware.js
export const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    if (action.type.startsWith('cartSlice/')) {
        const cart = store.getState().cart;
        localStorage.setItem('cartSlice', JSON.stringify(cart));
    }

    return result;
};
