import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../component/part/Header";
import CartCard from "../../component/part/CartCard";
import Notification from "../../component/part/Notification";

export default function ShoppingCart() {

    const { carts, user } = useSelector(state => state);

    const handlePayNow = (e) => {}

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1>Shopping Cart</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/"}>Home</Link>
                        <span>/</span>
                        <span>Shopping Cart</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"page-shopping"}>
                        <div className={"-left"}>
                            <div className={"d-justify p-b-15"}>
                                <h2 className={"m-0"}>Ordered products</h2>
                                <span>4 items</span>
                            </div>
                            {carts.length > 0 ? (
                                carts.map((item, index) => (
                                    <CartCard key={index} product={item} />
                                ))
                            ) : (
                                <Notification classname={"information"} message={"There is no product in your cart to command"} />
                            )}
                        </div>
                        <div className={"-right"}>
                            <div className={"shopping-resume"}>
                                <div className={"-content"}>
                                    <div className={"-order-resume"}>
                                        <div className={"-row"}>
                                            <span>Total Price :</span>
                                            <span>189.99 €</span>
                                        </div>
                                        <div className={"-row"}>
                                            <span>Discount :</span>
                                            <span>-0 €</span>
                                        </div>
                                        <div className={"-row"}>
                                            <span>Tax :</span>
                                            <span>37.99 €</span>
                                        </div>
                                    </div>
                                    <div className={"-order-price"}>
                                        <div className={"-row"}>
                                            <span>Total Price :</span>
                                            <span>227.99 €</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"-footer"}>
                                    <Link className={"btn btn-blue btn-rounded"} to={"/products"}>Back to Shop</Link>
                                    <button className={"btn btn-radient-green btn-rounded"}>Pay now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}