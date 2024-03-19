import React, { useState } from "react";
import Notification from "../part/Notification";
import axios from "axios";

export default function CategoryForm({category = null}) {

    const userStorage = localStorage.getItem("user")
    const userJson = JSON.parse(userStorage.length > 0 ? userStorage : null)

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState(category ?? {
        name: "",
        description: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(credentials.name.length == 0 || credentials.description.length == 0) {
            setFormResponse({classname: "danger", message: "All fields must have a value. Please check that every fields have an information"})
            return
        }

        axios
            .post(`${window.location.origin}/api/admin/category`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + userJson.token
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: `The category ${credentials.name} has been successfully added`})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please retry more later"
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
                <div className={"form-field"}>
                    <input 
                        type={"text"} 
                        maxLength={255} 
                        placeholder={"Category name ..."}
                        value={credentials.name} 
                        onChange={(e) => handleChange(e, "name")} 
                        required 
                    />
                </div>
                
                <div className={"form-field"}>
                    <textarea 
                        placeholder={"Description of the category ..."}
                        onChange={(e) => handleChange(e, "description")} 
                        value={credentials.description}
                    ></textarea>
                </div>
                
                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-blue"}>Submit</button>
                </div>
            </form>
        </>
    )
}