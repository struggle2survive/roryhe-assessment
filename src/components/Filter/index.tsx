import React from "react";
import { Checkbox, Slider } from 'antd';
import type { CheckboxOptionType, GetProp } from 'antd';

import './style.scss'

interface FilterProps {
    options: CheckboxOptionType<number>[];
    onChange: (checkedValues: number[]) => void;
}

const Filter: React.FC<FilterProps> = ({options, onChange}: FilterProps) => {
    return (
        <div className="inner-filter-container">
            <div className="inner-filter-left">
                <div className="checkbox-group-label">Pricing Option</div>
                <Checkbox.Group options={options} onChange={onChange} className="filter-checkbox-group"/>
                <div className="filter-slider"><Slider range defaultValue={[0, 9999]} /></div>
            </div>
            <div className="filter-reset-btn">RESET</div>
        </div>
    )
}

export default Filter;