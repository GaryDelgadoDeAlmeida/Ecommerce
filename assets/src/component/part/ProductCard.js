import React from "react";

export default function ProductCard({product}) {

    return (
        <div className={"product-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
            </div>
            <div className={"-content"}>
                <h3 className={"-title"}>Product name</h3>
                <span className={"-category"}>Category</span>
                <p className={"-price"}>1000 €</p>
            </div>
            <div className={"-footer"}>
                <button className={"btn btn-blue w-100"}>Add to card</button>
            </div>
        </div>
    )
}