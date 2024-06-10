import React, { useState } from "react";
import Notification from "../part/Notification";
import CharacteristicField from "./parts/CharacteristicField";
import axios from "axios";
import ImageField from "./parts/ImageField";
import BrandField from "./parts/BrandField";
import CategoryField from "./parts/CategoryField";

export default function ProductForm({product = null}) {

    const storageUser = localStorage.getItem("user")
    const jsonUser = storageUser.length > 0 ? JSON.parse(storageUser) : []

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        image: "",
        brand: product && product.brand ? product.brand.name : "",
        category: product && product.category ? product.category.name : "",
        name: product ? product.name : "",
        description: product ? product.description : "",
        quantity: 0,
        price: product ? product.price : 0,
        characteristics: product ? product.characteristics : {}
    })

    const updateCredentials = (fieldName, fieldValue) => {
        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let url = `${window.location.origin}/api/admin/product`
        if(product) {
            url = `${window.location.origin}/api/admin/product/${product.id}/update`
        }

        axios
            .post(url, credentials, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + jsonUser.token
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "The product has been successfully added"})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <ImageField updateCredentials={updateCredentials} fieldName={"image"} />

                <div className={"form-field"}>
                    <label htmlFor={"product_name"}>Product name</label>
                    <input 
                        type={"text"} 
                        id={"product_name"} 
                        value={credentials.name}
                        placeholder={"Product name ..."}
                        onChange={(e) => handleChange(e, "name")} 
                    />
                </div>

                <div className={"form-field"}>
                    <label>Description</label>
                    <textarea 
                        value={credentials.description}
                        placeholder={"Description of the product ..."}
                        onChange={(e) => handleChange(e, "description")} 
                    ></textarea>
                </div>

                <div className={"form-field-inline"}>
                    <CategoryField 
                        updateCredentials={updateCredentials}
                        categoryCredential={credentials.category}
                    />
                    
                    <BrandField 
                        updateCredentials={updateCredentials}
                        brandCredential={credentials.brand}
                    />
                </div>
                
                <div className={"form-field"}>
                    <label>Price</label>
                    <input 
                        type={"number"} 
                        min={0}
                        value={credentials.price}
                        onChange={(e) => handleChange(e, "price")}
                        required
                    />
                </div>
                
                <CharacteristicField 
                    updateCredentials={updateCredentials}
                    characteristicsCredential={credentials.characteristics}
                />
                
                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-blue"}>Submit</button>
                </div>
            </form>
        </>
    )
}