import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { cartAddProduct } from "../../redux/actions/cart-actions-types";
import Header from "../../component/part/Header";
import CommentCard from "../../component/part/CommentCard";
import CommentForm from "../../component/form/CommentForm";
import ImageSlider from "../../component/part/ImageSlider";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function ProductSingle() {

    const { productID } = useParams()
    if(isNaN(productID)) {
        return <Navigate to={"/products"} />
    }

    const dispatch = useDispatch()
    const order = useSelector(state => state.carts[productID])
    const { loading, items: item, load, error } = PrivateRessource(`${window.location.origin}/api/product/${productID}`, false)
    const [credentials, setCredentials] = useState({
        quantity: Object.keys(order ?? []).length > 0 ? order.quantity : 1
    })

    useEffect(() => {
        load()
    }, [])

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
            quantity: e.currentTarget.value.length > 0 ? e.currentTarget.value : 1
        })
    }

    const handleAddProductToCart = (e) => {
        e.preventDefault()
        dispatch(cartAddProduct({
            product: item,
            quantity: credentials.quantity
        }))
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

                {Object.keys(item ?? []).length > 0 && (
                    <>
                        <div className={"page-product"}>
                            <div className={"product-header"}>
                                <div className={"-product-image"}>
                                    <ImageSlider images={[item.image]} />
                                </div>
                                <div className={"-product-infos"}>
                                    <h1>{item.name}</h1>
                                    
                                    <p>Price : {item.price} €</p>
                                    
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
                                    
                                    <p>{item.description}</p>
                                    
                                    <button 
                                        type={"button"} 
                                        className={"btn btn-blue"}
                                        onClick={(e) => handleAddProductToCart(e)}
                                    >Add to order</button>
                                </div>
                            </div>
                        </div>

                        {item.characteristics.length > 0 && (
                            <div className={"page-section"}>
                                <h2>Description</h2>

                                <table className={"table"}>
                                    <tbody>
                                        {item.characteristics.map((characteristic, index) => (
                                            <tr key={index}>
                                                <td className={"-characteristic-label"}>{characteristic.label}</td>
                                                <td className={"-characteristic-description"}>{characteristic.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

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