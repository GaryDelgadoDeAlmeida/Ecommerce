import React from "react"
import { Link } from "react-router-dom"
import SubscribeForm from "../form/SubscribeForm"

export default function Header(props) {

    const storageUser = localStorage.getItem("user")

    return (
        <div className={"page"}>
            <div className={"page-header"}>
                <div className={"header-wrapper"}>

                    {/* Desktop */}
                    <div className={"header-desktop"}>
                        <div className={"-left"}>
                            <img className={"logo"} src={`${window.location.origin}/content/img/logo.png`} alt={"logo"} />
                        </div>
                        <div className={"-center"}>
                            <div className={"menu"}>
                                <Link className={"-item"} to={"/"}>Home</Link>
                                <Link className={"-item"} to={"/categories"}>Categories</Link>
                                <Link className={"-item"} to={"/products"}>Products</Link>
                                <Link className={"-item"} to={"/#contact"}>Contact</Link>
                            </div>
                        </div>
                        <div className={"-right"}>
                            <Link to={"/shopping-cart"} className={"cart"}>
                                <img src={`${window.location.origin}/content/svg/cart-shopping.svg`} />
                                <span>1</span>
                            </Link>

                            {storageUser.length > 0 ? (
                                <li className={"profile-menu-link"}>
                                    <div className={"profile-avatar"}>
                                        <img src={`${window.location.origin}/content/avatar.svg`} alt={""} />
                                    </div>
                                    <ul>
                                        <li><Link to={"/user"}>Profile</Link></li>
                                        <li><Link to={"/user/orders"}>Orders</Link></li>
                                    </ul>
                                </li>
                            ) : (
                                <Link className={"btn btn-blue btn-rounded"} to={"/login"}>Sign-in</Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile / Tablet */}
                    <div className={"header-mobile"}>
                        <input id={"menubars"} type={"checkbox"} hidden />
                        <label className={"menulabel"} htmlFor={"menubars"}>
                            <img src={`${window.location.origin}/content/svg/bars.svg`} alt={""} />
                        </label>
                        
                        <div className={"header-mobile-widget"}>
                            <label className={"menulabel"} htmlFor={"menubars"}>
                                <img src={`${window.location.origin}/content/svg/bars.svg`} alt={""} />
                            </label>

                            <nav className={"menu"}>
                                <li className={"-item"}><Link to={"/"}>Home</Link></li>
                                <li className={"-item"}><Link to={"/categories"}>Categories</Link></li>
                                <li className={"-item"}><Link to={"/products"}>Products</Link></li>
                                <li className={"-item"}><Link to={"/#contact"}>Contact</Link></li>
                                <li className={"-item"}><Link to={"/login"}>Login</Link></li>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={"page-content"}>
                {props.children}
            </div>
            
            <div className={"page-footer"}>
                <div className={"footer-quick-links"}>
                    <div className={"quick-links-wrapper"}>
                        <div className={"d-grid -col-4"}>
                            <div className={"links-col"}>
                                <div className={"-header"}>
                                    <label className={"txt-bold"}>Site links</label>
                                </div>
                                <div className={"-content"}>
                                    <Link to={"/news"}>News</Link>
                                    <Link to={"/"}>Home</Link>
                                    <Link to={"/products"}>Product</Link>
                                    <Link to={"/categories"}>Category</Link>
                                    <Link to={"/best-seller"}>Best seller</Link>
                                    <Link to={"/#contact"}>Contact</Link>
                                    <Link to={"/login"}>Login</Link>
                                </div>
                            </div>
                            <div className={"links-col"}>
                                <div className={"-header"}>
                                    <label className={"txt-bold"}>Help</label>
                                </div>
                                <div className={"-content"}>
                                    <Link to={"/help"}>Help</Link>
                                    <Link to={"/policy-and-privacy"}>Policy & Privacy</Link>
                                    <Link to={"/terms-and-condition"}>Terms & Conditions</Link>
                                </div>
                            </div>
                            <div className={"links-col"}>
                                <div className={"-header"}>
                                    <label className={"txt-bold"}>About</label>
                                </div>
                                <div className={"-content"}>
                                    <Link to={"/about"}>About</Link>
                                </div>
                            </div>
                            <div className={"links-col"}>
                                <div className={"-header"}>
                                    <label className={"txt-bold"}>Subscribe to the newsletter</label>
                                </div>
                                <div className={"-content"}>
                                    <SubscribeForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"footer-copyright"}>
                    <p>Copyright &copy; {(new Date()).getFullYear()} Ecommerce &minus; All rights reserved</p>
                </div>
            </div>
        </div>
    )
}