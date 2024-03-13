import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../component/part/Header";
import CommentCard from "../../component/part/CommentCard";
import CommentForm from "../../component/form/CommentForm";
import PrivateRessource from "../../component/utils/PrivateRessource";
import Notification from "../../component/part/Notification";

export default function ProductSingle() {

    const { productID } = useParams()
    if(isNaN(productID)) {
        return <Navigate to={"/products"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/product/${productID}`, false)
    const currentIMG = useState("")
    const [credentials, setCredentials] = useState({
        quantity: 1
    })

    useEffect(() => {
        load()
    }, [])

    const handleClickCarroussel = (e) => {
        e.preventDefault()
        console.log("HI handleClickCarroussel")
    }

    const handleClickQuantity = (e) => {
        let operator = e.target.innerText
        let newQuantity = credentials.quantity

        if(operator == "-" && newQuantity - 1 > 0) {
            newQuantity--
        } else if(operator == "+") {
            newQuantity++
        }

        setCredentials({
            ...credentials,
            quantity: newQuantity
        })
    }

    const handleQuantity = (e) => {
        setCredentials({
            ...credentials,
            quantity: 0
        })
    }
    
    return (
        <Header>
            <div className={"page-wrapper"}>
                <Link className={"btn btn-blue"} to={"/products"}>Return</Link>

                {loading && (
                    <div className={"m-t-25"}>
                        <Notification classname={"information"} message={"Loading ..."} />
                    </div>
                )}

                {Object.keys(error).length > 0 && (
                    <div className={"m-t-25"}>
                        <Notification classname={"danger"} message={error.message} />
                    </div>
                )}

                {Object.keys(items ?? []).length > 0 && (
                    <>
                        <div className={"page-product"}>
                            <div className={"product-header"}>
                                <div className={"-product-image"}>
                                    <div className={"carroussel"}>
                                        <div className={"-list"}>
                                            <img src={`${window.location.origin}/content/img/products/mineral.jpg`} alt={""} onClick={(e) => handleClickCarroussel(e)} />
                                            <img src={`${window.location.origin}/content/img/products/mineral.jpg`} alt={""} onClick={(e) => handleClickCarroussel(e)} />
                                            <img src={`${window.location.origin}/content/img/products/mineral.jpg`} alt={""} onClick={(e) => handleClickCarroussel(e)} />
                                            <img src={`${window.location.origin}/content/img/products/mineral.jpg`} alt={""} onClick={(e) => handleClickCarroussel(e)} />
                                        </div>
                                        <div className={"-current"}>
                                            <img src={`${window.location.origin}/content/img/products/mineral.jpg`} alt={""} />
                                        </div>
                                    </div>
                                </div>
                                <div className={"-product-infos"}>
                                    <h1>Diamond</h1>
                                    <p>Price : 4000 €</p>
                                    <div className={"-quantity"}>
                                        <span>Quantity : </span>
                                        <div className={"quantity-field"}>
                                            <button onClick={(e) => handleClickQuantity(e)}>-</button>
                                            <input 
                                                type={"number"} 
                                                min={1}
                                                value={credentials.quantity} 
                                                onChange={(e) => handleQuantity(e)}
                                            />
                                            <button onClick={(e) => handleClickQuantity(e)}>+</button>
                                        </div>
                                    </div>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <button type={"button"} className={"btn btn-blue"}>Add to order</button>
                                </div>
                            </div>
                        </div>

                        <div className={"page-section"}>
                            <h2>Description</h2>

                            <table className={"table"}>
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

                        <div className={"page-section"}>
                            <h2>Comments</h2>

                            <CommentForm productID={productID} />

                            <div className={"comments"}>
                                <CommentCard />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Header>
    )
}