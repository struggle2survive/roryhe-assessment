import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './reducer/contentSlice';

export const store = configureStore({
    reducer: {
       content: contentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch