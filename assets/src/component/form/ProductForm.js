import React, { useRef, useState } from "react";
import Notification from "../part/Notification"

export default function ProductForm({product = null}) {

    const [formResponse, setFormResponse] = useState({})
    let credentials = useRef({
        name: "",
        description: "",
        category: "",
        quantity: 0,
        price: 0
    })

    const handleChange = (e, fieldName) => {}

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className={"form"}>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}
            <div className={"form-field"}>
                <label htmlFor={"product_name"}>Product name</label>
                <input type={"text"} id={"product_name"} onChange={(e) => handleChange(e, "name")} />
            </div>
            <div className={"form-field"}>
                <label>Description</label>
            </div>
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-primary"}>Submit</button>
            </div>
        </form>
    )
}