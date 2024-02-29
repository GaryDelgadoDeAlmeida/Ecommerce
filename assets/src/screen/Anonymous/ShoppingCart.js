import React from "react";
import Header from "../../component/part/Header";
import { Link } from "react-router-dom";

export default function ShoppingCart() {

    const handleQuantity = (e) => {}

    const handleRemoveProduct = (e) => {}

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
                            <div className={"shopping-card"}>
                                <div className={"-header"}>
                                    <img src={`${window.location.origin}/content/img/mineral.jpg`} alt={""} />
                                </div>
                                <div className={"-content"}>
                                    <span>Product name</span>
                                    <div className={"quantity"}>
                                        <button></button>
                                        <input type={"text"} />
                                        <button></button>
                                    </div>
                                    <span>300 €</span>
                                    <button type={"button"} className={"btn btn-red btn-sm -inline-flex"}>
                                        <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={""} />
                                    </button>
                                </div>
                            </div>
                            <div className={"shopping-card"}>
                                <div className={"-header"}>
                                    <img src={`${window.location.origin}/content/img/mineral.jpg`} alt={""} />
                                </div>
                                <div className={"-content"}>
                                    <span>Product name</span>
                                    <div className={"quantity"}>
                                        <button></button>
                                        <input type={"text"} />
                                        <button></button>
                                    </div>
                                    <span>300 €</span>
                                    <button type={"button"} className={"btn btn-red btn-sm -inline-flex"}>
                                        <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={""} />
                                    </button>
                                </div>
                            </div>
                            <div className={"shopping-card"}>
                                <div className={"-header"}>
                                    <img src={`${window.location.origin}/content/img/mineral.jpg`} alt={""} />
                                </div>
                                <div className={"-content"}>
                                    <span>Product name</span>
                                    <div className={"quantity"}>
                                        <button></button>
                                        <input type={"text"} />
                                        <button></button>
                                    </div>
                                    <span>300 €</span>
                                    <button type={"button"} className={"btn btn-red btn-sm -inline-flex"}>
                                        <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={""} />
                                    </button>
                                </div>
                            </div>
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
                                    <Link className={"btn btn-blue btn-rounded"} to={"/product"}>Back to Shop</Link>
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