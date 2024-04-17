import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderAdmin(props) {

    const storageUser = localStorage.getItem("user")
    const [logged, setLogged] = useState(storageUser.length > 0 ? true : false)

    useEffect(() => {
        updateLoggedStatus
    }, [storageUser])

    const handleDisconnect = (e) => {
        e.preventDefault()
        localStorage.setItem("user", "")
        setLogged(false)
    }

    const updateLoggedStatus = (status) => {
        if(storageUser.length == 0) {
            setLogged(status)
        }
    }

    return (
        <>
            {!logged && (
                <Navigate to={"/login"} />
            )}

            <div className={"page-admin"}>
                <div className={"page-header"}>
                    <nav className={"menu-horizontal"}>
                        <li><Link to={"/admin"}>Dashboard</Link></li>
                        <li><Link to={"/admin/users"}>Users</Link></li>
                        <li><Link to={"/admin/brands"}>Brands</Link></li>
                        <li><Link to={"/admin/categories"}>Categories</Link></li>
                        <li><Link to={"/admin/products"}>Products</Link></li>
                        <li><Link to={"/admin/orders"}>Orders</Link></li>
                        <li><Link to={"/admin/statistics"}>Statistics</Link></li>
                        <li><Link to={"/admin/settings"}>Settings</Link></li>
                        <li><Link to={"#"} onClick={(e) => handleDisconnect(e)}>Logout</Link></li>
                    </nav>
                </div>
                
                <div className={"page-content"}>
                    <div className={"page-menu"}>
                        <Link className={"link-avatar"} to={"/admin/profile"}>
                            <div className={"avatar-infos"}>
                                <span>Garry ALMEIDA</span>
                                <span className={"txt-bold"}>Administrateur</span>
                            </div>
                            <div className={"avatar-img"}>
                                <img src={`${window.location.origin}/content/svg/avatar.svg`} alt={""} />
                            </div>
                        </Link>

                        <label className={"icon-menu"} htmlFor={"burger"}>
                            <img src={`${window.location.origin}/content/svg/bars.svg`} alt={""} />
                        </label>

                        <input id={"burger"} type={"checkbox"} hidden />
                        <ul className={"mobile-menu"}>
                            <li><Link to={"/admin"}>Dashboard</Link></li>
                            <li><Link to={"/admin/profile"}>Profile</Link></li>
                            <li><Link to={"/admin/users"}>Users</Link></li>
                            <li><Link to={"/admin/brands"}>Brands</Link></li>
                            <li><Link to={"/admin/categories"}>Categories</Link></li>
                            <li><Link to={"/admin/products"}>Products</Link></li>
                            <li><Link to={"/admin/orders"}>Orders</Link></li>
                            <li><Link to={"/admin/statistics"}>Statistics</Link></li>
                            <li><Link to={"/admin/settings"}>Settings</Link></li>
                            <li><Link to={"/logout"} onClick={(e) => handleLogout(e)}>logout</Link></li>
                            <label className={"icon-menu"} htmlFor={"burger"}>
                                <img src={`${window.location.origin}/content/svg/bars.svg`} alt={""} />
                            </label>
                        </ul>
                    </div>
                    <div className={"page-wrapper"}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}