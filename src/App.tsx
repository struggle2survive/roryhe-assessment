import React, { useEffect } from 'react';
import { useAppDispatch } from '@redux/hooks';
import { CheckboxOptionType, ConfigProvider } from 'antd';

import { fetchContentList, getNext } from '@redux/reducer/contentSlice';
import SearchBar from '@components/SearchBar';
import Filter from '@components/Filter';
import InfiniteList from '@components/InfiniteList';
import '@styles/style.scss';
import { theme } from '@styles/theme';

const options: CheckboxOptionType<number>[] = [
  { label: 'Paid', value: 0},
  { label: 'Free', value: 1},
  { label: 'View Only', value: 2}
]

const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchContentList()).then(() => {
      dispatch(getNext())
    })
  }, [])

  const onChange = (checkedValues: number[]) => {
    console.log(checkedValues)
  }

  return (
      <ConfigProvider theme={theme}>
        <div className='container'>
          <div className='content-container'>
            <div className='filter-container'>
              <SearchBar />
              <Filter options={options} onChange={onChange}/>
            </div>
            <div className='content-list-container'>
              <InfiniteList />
            </div>
          </div>
        </div>
      </ConfigProvider>
  )
};

export default App;