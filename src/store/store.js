import { configureStore } from '@reduxjs/toolkit';
import popups from './reducers/popups.js';

const store = configureStore({
    reducer: {
        popup: popups
    },
});

export default store;