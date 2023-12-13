import React from "react"
import { Link } from "react-router-dom"

export default function Header(props) {

    return (
        <div className={"page"}>
            <div className={"page-header"}>
                <div className={"menu"}>
                    <div className={"logo"}>
                        <img src={`${window.location.origin}/content/img/logo.png`} alt={"logo"} />
                    </div>
                    <nav className={""}>
                        <li className={"-item"}><Link to={"/"}>Home</Link></li>
                        <li className={"-item"}><Link to={"/product"}>Products</Link></li>
                        <li className={"-item"}><Link to={"/login"}>Login</Link></li>
                    </nav>
                    <div className={"cart"}>
                        <img src={`${window.location.origin}/content/img/cart.svg`} />
                        <span>1</span>
                    </div>
                </div>
            </div>
            
            <div className={"page-content"}>
                {props.children}
            </div>
            
            <div className={"page-footer"}>
                <div className={"footer-copyright"}>
                    <p>
                        Copyright &copy; {(new Date()).getFullYear()} &minus; Ecommerce<br/>
                        All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    )
}