import React from "react";
import { Card } from "antd";

import { ContentItem, PRICING_OPTION_MAP, PricingOption } from "@utils/types";
import "./style.scss"

interface ContentItemCardProps {
    item: ContentItem;
}

const ItemCard = React.memo(({ item }: ContentItemCardProps) => {
    
    return (
        <div className="container">
            <div className="img-container">
                <img src={item.imagePath}/>
            </div>
            <div className="text-wrapper">
                <div className="text-left">
                    <div className="text-title">{item.title}</div>
                    <div className="text-subtitle">{item.creator}</div>
                </div>
                <div className="text-right">
                    {
                        item.pricingOption == PricingOption.PAID ? `$ ${(new Number(item.price).toFixed(2))}`
                                : PRICING_OPTION_MAP[item.pricingOption]
                    }
                </div>
            </div>
        </div>
    )
})

export default ItemCard;