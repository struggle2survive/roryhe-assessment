

export enum PricingOption {
    PAID = 0,
    FREE = 1,
    VIEW_ONLY = 2
}

export const PRICING_OPTION_MAP = ['Paid','FREE','View Only'] as const;

export type FilterOptions = {
    creator: string,
    title: string,
    pricingOptions: number,
    price: {
        min: number,
        max: number
    }
}

export type ContentItem = {
    "id": string,
    "creator": string,
    "title": string,
    "pricingOption": PricingOption.PAID | PricingOption.FREE | PricingOption.VIEW_ONLY,
    "imagePath": string,
    "price": number
}