import React from "react";
import Header from "../../component/part/Header";
import { Link } from "react-router-dom";
import HeaderPolicy from "../../component/part/HeaderPolicy";

export default function Cookie() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1>Cookie</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/"}>Home</Link>
                        <span>/</span>
                        <span>Cookie</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <HeaderPolicy currentOnglet={"cookie"}>
                        <h2>Cookie</h2>
                    </HeaderPolicy>
                </div>
            </div>
        </Header>
    )
}