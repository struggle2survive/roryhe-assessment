export enum PricingOption {
    PAID = 0,
    FREE = 1,
    VIEW_ONLY = 2
}

export type FilterTypes = 'content'

export type ContentListFilter = {
    creator: string,
    title: string,
    pricingOption: number,
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