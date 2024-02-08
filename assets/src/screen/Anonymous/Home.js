import React from "react";
import Header from "../../component/part/Header";
import ProductCard from "../../component/part/ProductCard";

export default function Home() {

    // Temporary
    const generateProductCard = () => {
        let $html = []
        
        for (let index = 0; index < 10; index++) {
            $html.push(<ProductCard key={index} />)
        }

        return $html
    }

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>E-commerce App</h1>
                    <p className={"-sub-title"}>Your best online shop</p>
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

                    <div className={"d-grid -col-4 m-t-25"}>
                        {generateProductCard()}
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