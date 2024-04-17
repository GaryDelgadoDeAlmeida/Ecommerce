import React from "react";
import { useDispatch } from "react-redux";
import { cartRemoveProduct, cartUpdateProduct } from "../../redux/actions/cart-actions-types";

export default function CartCard({item}) {

    const dispatch = useDispatch();

    const handleQuantity = (e) => {
        dispatch(cartUpdateProduct({
            id: 1,
            quantity: 1
        }))
    }

    const handleRemoveProduct = (e, productID) => {
        dispatch(cartRemoveProduct({
            id: productID
        }))
    }

    return (
        <div className={"shopping-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}/content/img/hero-background.jpg`} alt={""} />
            </div>
            <div className={"-content"}>
                <span className={"name"}>{item.product.name}</span>
                
                <div className={"quantity"}>
                    <button>&minus;</button>
                    <input type={"number"} value={item.quantity} min={1} onChange={(e) => handleQuantity(e)} />
                    <button>&#43;</button>
                </div>
                
                <span className={"price"}>{item.product.price * item.quantity} €</span>
                
                <button type={"button"} className={"btn btn-red btn-sm -inline-flex"} onClick={(e) => handleRemoveProduct(e, item.product.id)}>
                    <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={""} />
                </button>
            </div>
        </div>
    )
}