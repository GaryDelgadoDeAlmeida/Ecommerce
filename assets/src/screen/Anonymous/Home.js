import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../component/part/Header";
import ContactForm from "../../component/form/ContactForm";
import ProductCard from "../../component/part/ProductCard";
import CategoryCard from "../../component/part/CategoryCard";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function Home() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/home`, false)

    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            {/* Hero */}
            <div className={"page-suphero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>E-commerce App</h1>
                    <p className={"-sub-title"}>Your best online shop</p>
                </div>
            </div>

            {/* Categories */}
            <div className={"page-section bg-white"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Categories</h2>

                    <div className={"m-t-25"}>
                        {!loading ? (
                            Object.keys(items.categories ?? []).length > 0 ? (
                                <div className={"d-grid -col-4 -m-col-2"}>
                                    {Object.values(items.categories).map((item, index) => (
                                        <CategoryCard key={index} category={item} />
                                    ))}
                                </div>
                            ) : (
                                <Notification classname={"information"} message={"There is no categories registered"} />
                            )
                        ) : null}
                    </div>

                    <div className={"m-t-25 txt-right"}>
                        <Link className={"btn btn-blue"} to={"/categories"}>See all</Link>
                    </div>
                </div>
            </div>
                
            {/* Featured product */}
            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Featured Products</h2>

                    <div className={"m-t-25"}>
                        {!loading ? (
                            Object.keys(items.products ?? []).length > 0 ? (
                                <div className={"d-grid -col-4 -m-col-2 m-t-25"}>
                                    {Object.values(items.products).map((item, index) => (
                                        <ProductCard key={index} product={item} />
                                    ))}
                                </div>
                            ) : (
                                <Notification classname={"information"} message={"There is no categories registered"} />
                            )
                        ) : null}
                    </div>
                    
                    <div className={"m-t-25 txt-right"}>
                        <Link className={"btn btn-blue"} to={"/products"}>See all</Link>
                    </div>
                </div>
            </div>

            {/* Service */}
            <div className={"page-section bg-white"}>
                <div className={"page-wrapper"}>
                    <div className={"d-grid p-tb-50 -col-4 -m-col-2"}>
                        <div className={"offered-service-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/svg/world.svg`} />
                                <label>Wordwide Shipping</label>
                            </div>
                            <div className={"-content"}>
                                <p>It elit tellus, luctus nec ullamcorper matlis, pulviner, dapibus leo</p>
                            </div>
                        </div>
                        <div className={"offered-service-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/svg/female-dress.svg`} />
                                <label>Best Quality</label>
                            </div>
                            <div className={"-content"}>
                                <p>It elit tellus, luctus nec ullamcorper matlis, pulviner, dapibus leo</p>
                            </div>
                        </div>
                        <div className={"offered-service-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/svg/discount-label-interface-commercial-symbol-with-percentage-sign.svg`} />
                                <label>Best Offers</label>
                            </div>
                            <div className={"-content"}>
                                <p>It elit tellus, luctus nec ullamcorper matlis, pulviner, dapibus leo</p>
                            </div>
                        </div>
                        <div className={"offered-service-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/svg/lock.svg`} />
                                <label>Secure Payments</label>
                            </div>
                            <div className={"-content"}>
                                <p>It elit tellus, luctus nec ullamcorper matlis, pulviner, dapibus leo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div id={"contact"} className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Contact</h2>

                    <div className={"m-t-25"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Header>
    )
}