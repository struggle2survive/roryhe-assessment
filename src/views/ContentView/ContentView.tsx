import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

import useFilter from '@utils/hooks/useFilter';
import { fetchContentList, getNext, filterContentList } from '@redux/reducer/contentSlice';
import { PricingOption } from '@utils/types';
import { CONTENT_FILTER_PRICE_OPTIONS, DEFAULT_PRICE_RANGE, FILTER_PARAMS_MAPPING } from '@utils/constants';
import SearchBar, { SearchBarRef } from '@components/SearchBar';
import Filter, { FilterRef } from '@components/Filter';
import InfiniteList from '@components/InfiniteList';
import NoData from '@components/Result/NoData';
import './style.scss';

const ContentView = () => {

    const dispatch = useAppDispatch()
    const [ searchParams, setSearchParams] = useSearchParams()
    const filter: {[key: string]: unknown[]} = useAppSelector(state => state.filter.content)
    const totalCount: number = useAppSelector(state => state.content.totalCount)
    const isFetching: boolean = useAppSelector(state => state.content.isFetching)
    const filterRef = useRef<FilterRef>(null)
    const searchRef = useRef<SearchBarRef>(null)
    const params = new URLSearchParams(searchParams);

    useFilter('content')

    useEffect(() => {
        dispatch(fetchContentList())
    }, [])

    useEffect(() => {
        const range: number[] = (filter['price'] as number[]) || DEFAULT_PRICE_RANGE
        const checked: number[] =  (filter['pricingOption'] as number[]) || []
        const keyword: string[] = (filter['keyword'] as string[]) || []
        const disabled: boolean = !checked.includes(PricingOption.PAID)

        filterRef.current?.setCheckedValues(checked)
        filterRef.current?.setSliderRange(disabled ? DEFAULT_PRICE_RANGE : range)
        filterRef.current?.setSliderDisabled(disabled)
        searchRef.current?.setKeyword(keyword[0])

        if (!isFetching) {
            dispatch(filterContentList(filter))
        }

    }, [filter])

    useEffect(() => {
        if (!isFetching) {
            dispatch(filterContentList(filter))
        }
    }, [isFetching])


    const onCheckboxChange = (checkedValues: number[]) => {
        if (checkedValues.length === 0) {
            params.delete('pricingOption')
        } else {
            params.set('pricingOption', checkedValues.join('+'))
            if (!checkedValues.includes(PricingOption.PAID)) {
                params.delete('price')
            }
        }
        setSearchParams(params, {replace: true})
    }

    const onSlideComplete = (value: number[]) => {
        params.set('price', value.join('+'))
        setSearchParams(params, {replace: true})
    }

    const onFilterReset = () => {
        for (let v of FILTER_PARAMS_MAPPING.content) {
            params.delete(v)
        }
        setSearchParams(params, {replace: true})
    }

    const onKeywordSearch = (value: string) => {
        if (!value) {
            params.delete('keyword')
        } else {
            params.set('keyword', value)
        }
        setSearchParams(params, {replace: true})
    }

    return (
        <div className='content-view-container'>
            <div className='content-container'>
                <div className='filter-container'>
                    <SearchBar onSearch={onKeywordSearch} ref={searchRef}/>
                    <Filter ref={filterRef}
                            options={CONTENT_FILTER_PRICE_OPTIONS}
                            onCheckboxChange={onCheckboxChange} 
                            onSlideComplete={onSlideComplete}
                            onReset={onFilterReset}/>
                </div>
                <div className='content-list-container'>
                    {totalCount === 0 && !isFetching ? <NoData /> : <InfiniteList />}
                </div>
            </div>
      </div>
    )
}

export default ContentView