import React, { useState } from "react";

import { ContentItem, PricingOption } from "@utils/types";
import { PRICING_OPTION_MAP } from "@utils/constants";
import "./style.scss"

interface ContentItemCardProps {
    item: ContentItem;
}

const ItemCard = React.memo(({ item }: ContentItemCardProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    
    return (
        <div className="item-card-container">
            <div className="img-container">
                <img 
                    src={item.imagePath} 
                    loading="eager"
                    onLoad={() => setIsImageLoaded(true)}
                    style={{ opacity: isImageLoaded ? 1 : 0 }}
                />
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