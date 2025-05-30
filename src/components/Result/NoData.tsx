import React from "react";
import { Result } from "antd";

const NoData: React.FC = () => {
    return (
        <Result 
            title="No Results Found"
            subTitle="Check the spelling, or try a different search term."
        />
    )
}

export default NoData