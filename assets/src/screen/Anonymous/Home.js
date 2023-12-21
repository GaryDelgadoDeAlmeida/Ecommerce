import React from "react";
import Header from "../../component/part/Header";

export default function Home() {

    return (
        <Header>
            <div className={"page-home"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Ecommerce</h1>
                    <small className={"-sub-title"}>Your best online shop</small>
                </div>
            </div>
            
            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>About</h2>
                </div>
            </div>
                
            <div className={"page-section bg-white"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Featured Products</h2>

                    <div className={"d-grid -col-5 m-t-25"}>
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <h3 className={"-title"}>Product name</h3>
                                <span className={"-category"}>Category</span>
                                <p className={"-price"}>1000 €</p>
                            </div>
                            <div className={"-footer d-flex"}>
                                <button className={"btn btn-blue item"}>Add to card</button>
                            </div>
                        </div>
                        
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <h3 className={"-title"}>Product name</h3>
                                <span className={"-category"}>Category</span>
                                <p className={"-price"}>1000 €</p>
                            </div>
                            <div className={"-footer d-flex"}>
                                <button className={"btn btn-blue item"}>Add to card</button>
                            </div>
                        </div>
                        
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <h3 className={"-title"}>Product name</h3>
                                <span className={"-category"}>Category</span>
                                <p className={"-price"}>1000 €</p>
                            </div>
                            <div className={"-footer d-flex"}>
                                <button className={"btn btn-blue item"}>Add to card</button>
                            </div>
                        </div>
                        
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <h3 className={"-title"}>Product name</h3>
                                <span className={"-category"}>Category</span>
                                <p className={"-price"}>1000 €</p>
                            </div>
                            <div className={"-footer d-flex"}>
                                <button className={"btn btn-blue item"}>Add to card</button>
                            </div>
                        </div>
                        
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <h3 className={"-title"}>Product name</h3>
                                <span className={"-category"}>Category</span>
                                <p className={"-price"}>1000 €</p>
                            </div>
                            <div className={"-footer d-flex"}>
                                <button className={"btn btn-blue item"}>Add to card</button>
                            </div>
                        </div>
                        
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <h3 className={"-title"}>Product name</h3>
                                <span className={"-category"}>Category</span>
                                <p className={"-price"}>1000 €</p>
                            </div>
                            <div className={"-footer d-flex"}>
                                <button className={"btn btn-blue item"}>Add to card</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Contact</h2>
                </div>
            </div>
        </Header>
    )
}