import React from "react";
import Header from "../../component/part/Header";
import { Link } from "react-router-dom";

export default function About() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>About</h1>
                    <p>A complete description about the company</p>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    {/* Content */}
                    <div className={"d-flex -g-25 bg-white"}>
                        <div className={"-item"}>
                            <img src={`${window.location.origin}/content/img/logo.png`} alt={""} />
                        </div>
                        <div className={"-item"}>
                            <span>Ecommerce store</span>
                            <h2>The first store created by our own hands</h2>
                            <p></p>
                        </div>
                    </div>

                    <div className={"d-flex -g-25"}>
                        <div className={"-item"}>
                            <span>Our team and our social impact</span>
                            <h2>Creating a community impact</h2>
                            <p></p>
                        </div>
                        <div className={"-item"}>
                            <img src={`${window.location.origin}/content/img/logo.png`} alt={""} />
                        </div>
                    </div>
                    
                    <div className={"d-flex -g-25 bg-white"}>
                        <div className={"-item"}>
                            <span>Our commitment to substainability</span>
                            <h2>We're building a 100 year company</h2>
                            <p></p>
                        </div>
                        <div className={"-item"}>
                            <img src={`${window.location.origin}/content/img/logo.png`} alt={""} />
                        </div>
                    </div>

                    {/* Client service offered */}
                    <div className={"d-grid -col-3 m-t-25"}>
                        {/* Service 1 */}
                        <div className={"offered-service-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/svg/world.svg`} />
                                <label>Award-winning support</label>
                            </div>
                            <div className={"-content txt-left"}>
                                <p>Get the help you want with 24/7 support—before, during, and after your trial.</p>
                                <Link to={"#"}>Contact support</Link>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className={"offered-service-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/svg/world.svg`} />
                                <label>Career opportunities</label>
                            </div>
                            <div className={"-content txt-left"}>
                                <p>Learn how you can have an impact by exploring opportunities at Shopify.</p>
                                <Link to={"#"}>Explore careers</Link>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className={"offered-service-card"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/svg/world.svg`} />
                                <label>Press and media</label>
                            </div>
                            <div className={"-content txt-left"}>
                                <p>Find press releases, executive team bios, and more.</p>
                                <Link to={"#"}>View press</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}