import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartAddProduct } from "../../redux/actions/cart-actions-types";

export default function ProductCard({product}) {

    const dispatch = useDispatch()

    const handleAddProductToCart = (e) => {
        e.preventDefault()

        dispatch(cartAddProduct({
            product: product,
            quantity: 1
        }))
    }

    return (
        <div className={"product-card"}>
            <img 
                className={"-product-img"} 
                src={`${window.location.origin}/content/img/products/mineral.jpg`} 
                // src={`${window.location.origin}/content/img/${product.image}`}
                alt={""} 
            />

            <div className={"-content"}>
                <h3 className={"-title"}>{product.name}</h3>
                <span className={"-category"}>{product.category ? product.category.name : ""}</span>
                <p className={"-price"}>{product.price} €</p>
                
                <div className={"d-justify"}>
                    <button 
                        className={"btn btn-blue"} 
                        onClick={(e) => handleAddProductToCart(e)}
                    >Add to card</button>
                    
                    <Link 
                        to={`/product/${product.id}`} 
                        className={"btn btn-green"}
                    >See more</Link>
                </div>
            </div>
        </div>
    )
}