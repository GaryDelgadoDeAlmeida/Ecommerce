import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderAdmin(props) {

    const handleDisconnect = (e) => {
        localStorage.setItem("token", "")
    }

    return (
        <>
            {localStorage.getItem("token") == "" && (
                <Navigate to={"/"} />
            )}

            <div className={"page -admin"}>
                <div className={"page-header -admin"}>
                    <nav className={"menu-horizontal"}>
                        <li><Link to={"/admin"}>Dashboard</Link></li>
                        <li><Link to={"/admin/product"}>Products</Link></li>
                        <li><Link to={"/admin/order"}>Orders</Link></li>
                        <li>
                            <button className={"btn btn-red"} onClick={(e) => handleDisconnect(e)}>Logout</button>
                        </li>
                    </nav>
                </div>
                
                <div className={"page-content -admin"}>
                    <div className={"page-banner"}>
                        <Link className={"btn -inline-flex"} to={"/admin/profile"}>
                            <img src={`${window.location.origin}/content/svg/user.svg`} alt={""} />
                        </Link>
                    </div>
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
        </>
    )
}