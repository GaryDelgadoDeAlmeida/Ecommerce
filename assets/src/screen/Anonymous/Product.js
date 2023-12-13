import React, { useEffect } from "react";
import Header from "../../component/part/Header";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function Product() {

    const {load, items: products, loading, error} = PrivateRessource(`${window.location.origin}/api/product`, false)
    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-section"}>
                    <h1 className={"page-title"}>Products</h1>

                    <div className={"product-list m-t-25"}>
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-1.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <span className={"-title"}>Product 1</span>
                            </div>
                        </div>
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-2.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <span className={"-title"}>Product 2</span>
                            </div>
                        </div>
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-3.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <span className={"-title"}>Product 3</span>
                            </div>
                        </div>
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-4.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <span className={"-title"}>Product 4</span>
                            </div>
                        </div>
                        <div className={"product-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/product-5.png`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <span className={"-title"}>Product 5</span>
                            </div>
                        </div>
                    </div>

                    <div className={"pagination"}>
                        <div className={"item"}>
                            <button type={"button"}>0</button>
                        </div>
                        <div className={"item current-page"}>
                            <span>1</span>
                        </div>
                        <div className={"item"}>
                            <button type={"button"}>2</button>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}