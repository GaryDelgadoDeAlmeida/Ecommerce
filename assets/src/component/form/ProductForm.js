import React, { useEffect, useState } from "react";
import Notification from "../part/Notification";
import PrivateRessource from "../utils/PrivateRessource";
import CharacteristicField from "./parts/CharacteristicField";
import axios from "axios";
import ImageField from "./parts/ImageField";
import BrandField from "./parts/BrandField";
import CategoryField from "./parts/CategoryField";

export default function ProductForm({product = null}) {

    const storageUser = localStorage.getItem("user")
    const jsonUser = storageUser.length > 0 ? JSON.parse(storageUser) : []

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/product/form-needs`)
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        brand: "",
        category: "",
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        characteristics: {}
    })

    useEffect(() => {
        load()
    }, [])

    const updateCredentials = (fieldName, fieldValue) => {
        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: fieldName == "photo" ? e.target.files[0] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/admin/product`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + jsonUser.token
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "The product has been successfully added"})
            })
            .error((error) => {
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

    if(loading) {
        return <Notification classname={"information"} message={"Loading ..."} />
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <ImageField updateCredentials={updateCredentials} fieldName={"photo"} />

                <div className={"form-field"}>
                    <label htmlFor={"product_name"}>Product name</label>
                    <input 
                        type={"text"} 
                        id={"product_name"} 
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

                <CategoryField 
                    updateCredentials={updateCredentials}
                    categoryCredential={credentials.category}
                />
                
                <BrandField 
                    updateCredentials={updateCredentials}
                    brandCredential={credentials.brand}
                />
                
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