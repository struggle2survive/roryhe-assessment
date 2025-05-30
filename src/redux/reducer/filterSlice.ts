import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {[key: string]: {}} = {
    content: {}
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<{ key: string, filter: {} }>) {
            state[action.payload.key] = action.payload.filter;
        },
        resetFilter(state, action: PayloadAction<string>) {
            state[action.payload] = {} 
        }
    }
})

export const { setFilter, resetFilter } = filterSlice.actions

export default filterSlice.reducer