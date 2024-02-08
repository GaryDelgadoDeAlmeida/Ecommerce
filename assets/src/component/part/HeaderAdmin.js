import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderAdmin(props) {

    const storageUser = localStorage.getItem("user")
    const [logged, setLogged] = useState(storageUser.length > 0 ? true : false)

    useEffect(() => {
        updateLoggedStatus
    }, [storageUser])

    const handleDisconnect = (e) => {
        localStorage.setItem("user", "")
    }

    const updateLoggedStatus = (status) => {
        if(storageUser.length == 0) {
            setLogged(status)
        }
    }

    return (
        <>
            {!logged && (
                <Navigate to={"/admin-login"} />
            )}

            <div className={"page-admin"}>
                <div className={"page-header"}>
                    <nav className={"menu-horizontal"}>
                        <li><Link to={"/admin"}>Dashboard</Link></li>
                        <li><Link to={"/admin/product"}>Products</Link></li>
                        <li><Link to={"/admin/order"}>Orders</Link></li>
                        <li>
                            <button type={"button"} className={"btn btn-red"} onClick={(e) => handleDisconnect(e)}>Logout</button>
                        </li>
                    </nav>
                </div>
                
                <div className={"page-content"}>
                    <div className={"page-banner"}>
                        <Link className={"btn -inline-flex"} to={"/admin/profile"}>
                            <img src={`${window.location.origin}/content/svg/user.svg`} alt={""} />
                        </Link>
                    </div>
                    <div className={"page-wrapper"}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}