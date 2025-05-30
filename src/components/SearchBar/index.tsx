import React, { useState, useCallback, useImperativeHandle } from 'react';
import { Input } from 'antd';
import type { GetProps } from 'antd';
import { InputRef } from 'antd';

import './style.scss';

type SearchProps = GetProps<typeof Input.Search>;

export interface SearchBarProps extends SearchProps {
    onSearch: (value: string) => void
}

export interface SearchBarRef extends Partial<InputRef> {
    setKeyword: (v: string) => void
}

const SearchBar = React.forwardRef<SearchBarRef, SearchBarProps>(({ onSearch }: SearchBarProps, ref) => {

    const [ value, setValue ] = useState<string>()

    const setKeyword = (v: string) => {
        setValue(v)
    }

    useImperativeHandle(ref, () => ({
        setKeyword: setKeyword
    }))

    return (
        <div className='search-container'>
            <Input.Search
                value={value}
                placeholder="Find the items you're lookng for"
                allowClear={true}
                onSearch={onSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value)}
            />
        </div>
    );
})

export default SearchBar;