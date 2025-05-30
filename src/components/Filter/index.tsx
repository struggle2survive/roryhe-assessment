import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Checkbox, Slider } from 'antd';
import type { CheckboxOptionType } from 'antd';

import { DEFAULT_PRICE_RANGE } from "@utils/constants";

import './style.scss'

interface FilterProps {
    options: CheckboxOptionType<number>[];
    onCheckboxChange: (checkedValues: number[]) => void;
    onSlideComplete: (value: number[]) => void;
    onReset: () => void
}

export interface FilterRef {
    setSliderRange: (value: number[]) => void;
    setCheckedValues: (value: number[]) => void;
    setSliderDisabled: (value: boolean) => void;
}

const Filter = forwardRef<FilterRef, FilterProps>(({options, onCheckboxChange, onSlideComplete, onReset}: FilterProps, ref) => {

    const [sliderRange, setRange] = useState<number[]>(DEFAULT_PRICE_RANGE)
    const [checkedValues, setChecked] = useState<number[]>([])
    const [sliderDisabled, setDisabled] = useState<boolean>(false)

    const setSliderRange = (value: number[]) => {
        setRange(value)
    }

    const setCheckedValues = (value: number[]) => {
        setChecked(value)
    }

    const setSliderDisabled = (value: boolean) => {
        setDisabled(value)
    }

    useImperativeHandle(ref, () => ({
        setSliderRange,
        setCheckedValues,
        setSliderDisabled
    }))

    return (
        <div className="inner-filter-container">
            <div className="inner-filter-left">
                <div className="checkbox-group-label">Pricing Option</div>
                <Checkbox.Group 
                    className="filter-checkbox-group"
                    options={options} 
                    onChange={onCheckboxChange}  
                    value={checkedValues}
                />
                <div className="filter-slider">
                    <Slider range={true} 
                            disabled={sliderDisabled}
                            value={sliderRange}
                            min={DEFAULT_PRICE_RANGE[0]} max={DEFAULT_PRICE_RANGE[1]} 
                            onChange={setSliderRange}
                            onChangeComplete={onSlideComplete}
                    />
                </div>
            </div>
            <div className="filter-reset-btn" onClick={onReset}>RESET</div>
        </div>
    )
})

export default Filter;