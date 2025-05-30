import { FilterTypes } from "./types";

export const PRICING_OPTION_MAP = {
    '0': 'Paid',
    '1': 'FREE', 
    '2': 'View Only'
} as const;

export const CONTENT_FILTER_PRICE_OPTIONS = [
    { label: 'Paid', value: 0},
    { label: 'Free', value: 1},
    { label: 'View Only', value: 2}
]

export const FILTER_PARAMS_MAPPING: Record<FilterTypes, string[]> = {
    content: ['pricingOption', 'price', 'keyword']
}

export const DEFAULT_PRICE_RANGE = [0, 999]