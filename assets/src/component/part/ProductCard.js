import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({product}) {

    return (
        <div className={"product-card"}>
            <img 
                className={"-product-img"} 
                src={`${window.location.origin}/content/img/products/mineral.jpg`} 
                // src={`${window.location.origin}/content/img/${product.img}`}
                alt={""} 
            />

            <div className={"-content"}>
                <h3 className={"-title"}>Product name</h3>
                <span className={"-category"}>Category</span>
                <p className={"-price"}>1000 €</p>
                
                <div className={"d-flex -g-15"}>
                    <button className={"btn btn-blue"}>Add to card</button>
                    <Link 
                        // to={`/product/${product.id}`} 
                        to={`/product/1`} 
                        className={"btn btn-green"}
                    >See more</Link>
                </div>
            </div>
        </div>
    )
}