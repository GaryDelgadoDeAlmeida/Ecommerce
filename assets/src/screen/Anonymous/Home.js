import React from "react";
import Header from "../../component/part/Header";

export default function Home() {

    return (
        <Header>
            <div className={"page-home"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Ecommerce</h1>
                    <small className={"-sub-title"}>Your online</small>
                </div>
            </div>
            
            <div className={"page-wrapper"}>
                <div className={"page-section"}></div>
                <div className={"page-section"}>
                    <h2 className={"page-title"}>Featured Products</h2>

                    <div className={""}>
                        <div className={"product-card"}>
                            <div className={"-header"}></div>
                            <div className={"-content"}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}