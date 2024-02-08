import React from "react";
import Header from "../../component/part/Header";
import { Link } from "react-router-dom";

export default function ProductSingle() {
    
    return (
        <Header>
            <div className={"page-wrapper"}>
                <Link className={"btn btn-blue"} to={"/product"}>Return</Link>

                <div className={"page-section"}>
                    <div className={"d-grid -col-2"}>
                        <div className={"-product-image"}>
                            <div className={"carroussel"}>
                                <div className={"-list"}>
                                    <img src={`${window.location.origin}/content/img/products/product1.png`} alt={""} />
                                    <img src={`${window.location.origin}/content/img/products/product1.png`} alt={""} />
                                    <img src={`${window.location.origin}/content/img/products/product1.png`} alt={""} />
                                    <img src={`${window.location.origin}/content/img/products/product1.png`} alt={""} />
                                </div>
                                <div className={"-current"}>
                                    <img src={`${window.location.origin}/content/img/products/product1.png`} alt={""} />
                                </div>
                            </div>
                        </div>
                        <div className={"-product-infos"}>
                            <h1>Diamond</h1>
                            <p>Price : 4000 €</p>
                            <p>
                                <span>Quantity : </span>
                                <div className={"quantity-field"}>
                                    <span>-</span>
                                    <span>1</span>
                                    <span>+</span>
                                </div>
                            </p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <button type={"button"} className={"btn btn-blue"}>Add to order</button>
                        </div>
                    </div>
                </div>

                <div className={"page-section"}>
                    <h2>Description</h2>

                    <table>
                        <tbody>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                            <tr>
                                <td>description_name</td>
                                <td>description_value</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Header>
    )
}