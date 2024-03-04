import React from "react";
import Header from "../../component/part/Header";
import ContactForm from "../../component/form/ContactForm";
import ProductCard from "../../component/part/ProductCard";
import { Link } from "react-router-dom";
import CategoryCard from "../../component/part/CategoryCard";
import Notification from "../../component/part/Notification";

export default function Home() {

    // Temporary
    const generateProductCard = () => {
        let $html = []
        
        for (let index = 0; index < 4; index++) {
            $html.push(<ProductCard key={index} />)
        }

        return $html
    }

    const generateCategoryCard = () => {
        let $html = []
        
        for (let index = 0; index < 4; index++) {
            // $html.push(<CategoryCard key={index} />)
        }

        return $html
    }

    return (
        <Header>
            {/* Hero */}
            <div className={"page-suphero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>E-commerce App</h1>
                    <p className={"-sub-title"}>Your best online shop</p>
                </div>
            </div>

            {/* Categories (only display some of categories) */}
            <div className={"page-section bg-white"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Categories</h2>

                    <div className={"m-t-25"}>
                        {generateCategoryCard().length > 0 ? (
                            <div className={"d-grid -col-4 -m-col-2"}>
                                {generateCategoryCard()}
                            </div>
                        ) : (
                            <Notification classname={"information"} message={"There is no categories registered"} />
                        )}
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

                    <div className={"d-grid -col-4 -m-col-2 m-t-25"}>
                        {generateProductCard()}
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
            <div className={"page-section"}>
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