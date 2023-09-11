import { createSlice } from '@reduxjs/toolkit';

const popups = createSlice({
    name: 'popups',
    initialState: {
        info: null
    },
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload;
        },
    }
});

export const {
    setInfo
} = popups.actions;

export default popups.reducer;