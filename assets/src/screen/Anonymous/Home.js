import React from "react";
import Header from "../../component/part/Header";

export default function Home() {

    return (
        <Header>
            <div className={"page-home"}>
                <div className={"-hero"}></div>
            </div>
            
            <div className={"page-wrapper"}>
                <div className={"page-about"}></div>
                <div className={"page-product"}></div>
            </div>
        </Header>
    )
}