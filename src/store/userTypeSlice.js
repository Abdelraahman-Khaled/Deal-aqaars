import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userType: null, // 'vendor' | 'company' | null
};

const userTypeSlice = createSlice({
    name: 'userType',
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
        clearUserType: (state) => {
            state.userType = null;
        },
    },
});

export const { setUserType, clearUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
