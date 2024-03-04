import React from "react";
import Header from "../../component/part/Header";
import { Link } from "react-router-dom";
import HeaderPolicy from "../../component/part/HeaderPolicy";

export default function Privary() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Privary page</h1>
                    <p>Page that will show how the site treat people informations and for what purpose</p>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/"}>Home</Link>
                        <span>/</span>
                        <span>Policy & Privacy</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <HeaderPolicy currentOnglet={"policy-and-privacy"}>
                        <h2>Policy & Privacy</h2>
                    </HeaderPolicy>
                </div>
            </div>
        </Header>
    )
}