import React from "react";
import { Link } from "react-router-dom";
import Header from "../../component/part/Header";

export default function News() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>News</h1>
                    <p>Page that will show all new added products</p>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/"}>Home</Link>
                        <span>/</span>
                        <span>News</span>
                    </div>
                </div>
            </div>
        </Header>
    )
}