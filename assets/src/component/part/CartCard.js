import React from "react";
import { useDispatch } from "react-redux";
import { findParent } from "../utils/DomControl";
import { cartRemoveProduct, cartUpdateProduct } from "../../redux/actions/cart-actions-types";

export default function CartCard({product}) {

    const dispatch = useDispatch();

    const handleQuantity = (e) => {
        dispatch(cartUpdateProduct({
            id: 1,
            quantity: 1
        }))
    }

    const handleRemoveProduct = (e) => {
        const parent = findParent(e.currentTarget, "shopping-card")
        if(!parent) {
            return
        }

        dispatch(cartRemoveProduct({
            id: 1
        }))

        parent.remove()
    }

    return (
        <div className={"shopping-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}/content/img/hero-background.jpg`} alt={""} />
            </div>
            <div className={"-content"}>
                <span className={"name"}>Product name</span>
                
                <div className={"quantity"}>
                    <button>&minus;</button>
                    <input type={"number"} value={1} min={1} onChange={(e) => handleQuantity(e)} />
                    <button>&#43;</button>
                </div>
                
                <span className={"price"}>300 €</span>
                
                <button type={"button"} className={"btn btn-red btn-sm -inline-flex"} onClick={(e) => handleRemoveProduct(e)}>
                    <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={""} />
                </button>
            </div>
        </div>
    )
}