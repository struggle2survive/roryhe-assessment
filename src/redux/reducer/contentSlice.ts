import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ContentItem, PricingOption } from '@utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const PAGE_SIZE = 8

interface ContentState {
    allData: Array<ContentItem>
    displayList: Array<ContentItem>
    filteredList: Array<ContentItem>
    cursor: number
    totalCount: number
    isFetching: boolean
}

const initialState: ContentState = {
    allData: [],
    displayList: [],
    filteredList: [],
    cursor: 0,
    totalCount: 0,
    isFetching: false
} satisfies ContentState as ContentState

export const fetchContentList = createAsyncThunk<ContentItem[]>(
    'content/fetchContentList',
    async (_, thunkAPI) => {
        let response = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data')
        let data = await response.json()
        return data
    }
)

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        getNext(state) {
            const items = state.filteredList.slice(state.cursor, state.cursor + PAGE_SIZE)
            state.displayList = [...state.displayList, ...items]
            state.cursor += PAGE_SIZE
        },
        resetPaging(state) {
            state.cursor = 0
        },
        filterContentList(state, action: PayloadAction<{[key: string]: any}>) {
            const filter = action.payload
            const filterProps = Object.keys(filter)
            let data: Array<ContentItem> = []
            if (filterProps.length === 0) {
                data = state.allData
                state.filteredList = state.allData
            } else {
                data = state.allData.filter((item: ContentItem) => {
                    return Object.keys(filter).every((key: string) => {
                        if (key === 'keyword') {
                            const searchText = filter.keyword[0].toLocaleLowerCase()
                            return item.creator.toLocaleLowerCase().includes(searchText) || item.title.toLowerCase().includes(searchText)
                        } else if (key === 'pricingOption') {
                            return filter.pricingOption.includes(item.pricingOption)
                        } else if (key === 'price') {
                            const [min, max] = filter.price
                            return item.price >= min && item.price <= max   && item.pricingOption === PricingOption.PAID
                        }
                    })
                })
            }
            state.filteredList = [...data]
            const cursor = Math.min(data.length, PAGE_SIZE)
            state.displayList = data.slice(0, cursor)
            state.totalCount = data.length
            state.cursor = Math.min(data.length, PAGE_SIZE)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchContentList.fulfilled, (state, action) => {
            const data = action.payload
            const cursor = Math.min(data.length, PAGE_SIZE)
            state.allData = data
            state.filteredList = data
            state.displayList = data.slice(0, cursor)
            state.cursor = cursor
            state.totalCount = data.length
            state.isFetching = false
        })
        .addCase(fetchContentList.pending, (state, _) => {
            state.isFetching = true
        })
        .addCase(fetchContentList.rejected, (state, _) => {
            state.isFetching = false
        })
    },
})

export const { getNext, resetPaging, filterContentList } = contentSlice.actions

export default contentSlice.reducer