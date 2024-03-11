import React, { useState } from "react";

export default function ShoppingCard({product}) {

    const [quantity, setQuantity] = useState(1)

    const handleQuantity = (operator) => {
        let newQuantity = quantity
        
        if(operator == "minus") {
            newQuantity--
        } else if(operator == "plus") {
            newQuantity++
        }

        setQuantity(newQuantity)
    }

    const handleRemoveProduct = (e) => {
        // 
    }

    return (
        <div className={"shopping-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}/content/img/hero-background.jpg`} alt={""} />
            </div>
            <div className={"-content"}>
                <span className={"name"}>{product.name}</span>
                
                <div className={"quantity"}>
                    <button onClick={handleQuantity("minus")}>&minus;</button>
                    <input type={"number"} value={1} min={1} />
                    <button onClick={handleQuantity("plus")}>&plus;</button>
                </div>
                
                <span className={"price"}>300 €</span>
                
                <button onClick={(e) => handleRemoveProduct(e)} type={"button"} className={"btn btn-red btn-sm -inline-flex"}>
                    <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={""} />
                </button>
            </div>
        </div>
    )
}