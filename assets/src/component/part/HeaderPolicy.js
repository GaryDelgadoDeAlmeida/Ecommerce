import React from "react";
import { Link } from "react-router-dom";

export default function HeaderPolicy(props) {

    const currentOnglet = props.currentOnglet ?? null
    const pages = [
        {
            url: "/policy-and-privacy",
            value: "policy-and-privacy",
            text: "Policy & Privacy"
        },
        {
            url: "/terms-and-condition",
            value: "terms-and-condition",
            text: "Terms & Conditions"
        },
        {
            url: "/cookie",
            value: "cookie",
            text: "Cookie"
        }
    ]

    return (
        <div className={"policies"}>
            <div className={"policy-menu"}>
                <div className={"menu-widget"}>
                    {pages.map((item, index) => (
                        <Link key={index} to={item.url} className={`${item.value == currentOnglet ? "-active" : ""}`}>{item.text}</Link>
                    ))}
                </div>
            </div>
            <div className={"policy-content"}>
                {props.children}
            </div>
        </div>
    )
}