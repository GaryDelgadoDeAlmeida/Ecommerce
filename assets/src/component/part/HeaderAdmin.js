import React from "react";
import { Link } from "react-router-dom";

export default function HeaderAdmin(props) {

    return (
        <div className={"page -admin"}>
            <div className={"page-header -admin"}>
                <nav className={"menu-horizontal"}>
                    <li><Link to={"/admin"}>Dashboard</Link></li>
                    <li><Link to={"/admin/profile"}>Profile</Link></li>
                    <li><Link to={"/admin/product"}>Products</Link></li>
                    <li><Link to={"/admin/order"}>Orders</Link></li>
                    <li><button className={"btn btn-red"}>Logout</button></li>
                </nav>
            </div>
            
            <div className={"page-content -admin"}>
                <div className={"page-wrapper"}>
                    {props.children}
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
        </div>
    )
}