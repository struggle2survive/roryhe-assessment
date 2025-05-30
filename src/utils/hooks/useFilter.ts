import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '@redux/hooks';
import { resetFilter, setFilter } from '@redux/reducer/filterSlice';
import { FILTER_PARAMS_MAPPING} from '@utils/constants';
import { FilterTypes } from '@utils/types';

const useFilter = (type: FilterTypes) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const filterParams = FILTER_PARAMS_MAPPING[type]

    useEffect(() => {
        if (searchParams.size === 0) {
            dispatch(resetFilter(type))
        } else {
            const filter = filterParams.reduce((res: {[key: string]: Array<string | number> | null | string}, cur: string) => {
                const value = searchParams.get(cur)
                if (value !== null) {
                    res[cur] = value.split('+').map(val => isNaN(Number(val)) ? val : Number(val))
                }
                return res
            }, {})
            dispatch(setFilter({key: type, filter}))
        }
    }, [searchParams])
}

export default useFilter