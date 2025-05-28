import { RootState } from '@redux/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ContentItem } from '@utils/types';

const PAGE_SIZE = 8

interface ContentState {
    contentList: Array<ContentItem>
    displayList: Array<ContentItem>
    cursor: number
    totalCount: number
}

const initialState: ContentState = {
    contentList: [],
    displayList: [],
    cursor: 0,
    totalCount: 0
} satisfies ContentState as ContentState

export const fetchContentList = createAsyncThunk<ContentItem[]>(
    'content/fetchContentList',
    async (_, thunkAPI) => {
        let response = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data')
        const data = await response.json()
        return data
    }
)

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        getNext(state) {
            const items = state.contentList.slice(state.cursor, state.cursor + PAGE_SIZE)
            state.displayList = [...state.displayList, ...items]
            state.cursor += 1
        },
        resetPaging(state) {
            state.cursor = 0
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchContentList.fulfilled, (state, action) => {
            const data = action.payload
            state.contentList = data
            state.totalCount = data.length
        })
    },
})

export const { getNext, resetPaging } = contentSlice.actions

export default contentSlice.reducer