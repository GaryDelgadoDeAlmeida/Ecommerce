import React from "react";
import { Link } from "react-router-dom";

export default function HeaderUser(props) {

    return (
        <div className={"page"}>
            <div className={"page-header"}>
                <img src={`${window.location.origin}/content/img/logo.png`} alt={"logo"} />
                <nav className={"menu"}>
                    <li><Link to={"/user"}>Home</Link></li>
                    <li><Link to={"/user/profile"}>Profile</Link></li>
                    <li><Link to={"/user/orders"}>Orders</Link></li>
                    <li><button className={"btn btn-red"}>Logout</button></li>
                </nav>
            </div>
            <div className={"page-content"}>
                <div className={"page-wrapper"}>
                    {props.children}
                </div>
            </div>
            <div className={"page-footer"}>
                <div className={"footer-copyright"}>
                    <p>
                        Copyright &copy; {(new Date()).getFullYear()} &minus; Ecommerce<br />
                        All rigth reserved
                    </p>
                </div>
            </div>
        </div>
    )
}