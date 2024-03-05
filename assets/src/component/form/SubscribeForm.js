import axios from "axios";
import React, { useState } from "react";

export default function SubscribeForm() {

    const [credentials, setCredentials] = useState({
        email: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/newsletter/register`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld"
                }
            })
            .then((response) => {})
            .catch((error) => {})
        ;
    }

    return (
        <form className={"newsletter-form"} onSubmit={(e) => handleSubmit(e)}>
            <div className={"form-field"}>
                <input 
                    type={"email"} 
                    value={credentials.email} 
                    placeholder={"Your email ..."}
                    onChange={(e) => handleChange(e, "email")} 
                    required 
                />
            </div>
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue w-100"}>Register</button>
            </div>
        </form>
    )
}