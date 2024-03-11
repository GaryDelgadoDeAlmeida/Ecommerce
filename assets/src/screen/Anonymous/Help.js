import React from "react";
import Header from "../../component/part/Header";
import HeaderPolicy from "../../component/part/HeaderPolicy";

export default function Help() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Help page</h1>
                    <p>Page that answer about most given question by customers</p>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <HeaderPolicy currentOnglet={"help"}>
                        <h2>Help</h2>
                    </HeaderPolicy>
                </div>
            </div>
        </Header>
    )
}