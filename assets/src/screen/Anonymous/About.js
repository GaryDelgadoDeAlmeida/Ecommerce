import React from "react";
import Header from "../../component/part/Header";

export default function About() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>About</h1>
                    <p>A complete description about the company</p>
                </div>
            </div>

            <div className={"page-wrapper"}>
                <div className={"page-section"}>
                    {/* Content */}
                </div>
            </div>
        </Header>
    )
}