import React from "react";
import Header from "../../component/part/Header";
import { Link } from "react-router-dom";
import HeaderPolicy from "../../component/part/HeaderPolicy";

export default function ConditionalTerms() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Terms & Conditions</h1>
                    <p>Page that will display the rules of the site and what will append if the rules isn't respected</p>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <HeaderPolicy currentOnglet={"terms-and-condition"}>
                        <h2>Terms & Conditions</h2>
                    </HeaderPolicy>
                </div>
            </div>
        </Header>
    )
}