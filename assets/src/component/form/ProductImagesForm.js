import axios from "axios";
import React, { useState } from "react";

export default function ProductImagesForm({productID, product_images = []}) {

    const [credentials, setCredentials] = useState({
        images: []
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            images: e.target.files
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/admin/product/${productID}/images`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {})
            .catch((error) => {
                setFormResponse({})
            })
    }

    return (
        <>
            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <div className={"field-images"}></div>
                    <input type={"file"} hidden />
                </div>

                <div className={"form-button"}>
                    <button type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}