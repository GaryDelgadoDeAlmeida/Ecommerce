import React, { useEffect, useState } from "react";
import Notification from "../part/Notification";
import PublicRessource from "../utils/PublicRessource";
import CountryField from "./parts/CountryField";
import axios from "axios";

export default function BrandForm() {

    const storageUser = localStorage.getItem("user") ?? ""
    const user = JSON.parse(storageUser.length > 0 ? storageUser : "")
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        name: "",
        address: "",
        zipCode: "",
        city: "",
        country: ""
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
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`${window.location.origin}/api/admin/brand`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + (Object.keys(user).length > 0 ? user.token : "")
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "The brand has been successfully created"})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry more later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
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
                        placeholder={"Brand name"}
                        maxLength={255}
                        onChange={(e) => handleChange(e, "name")} 
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <input 
                        type={"text"} 
                        maxLength={255}
                        placeholder={"Address"}
                        onChange={(e) => handleChange(e, "address")} 
                        required
                    />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"text"} 
                            maxLength={20}
                            placeholder={"Zip code"}
                            onChange={(e) => handleChange(e, "zipCode")} 
                            required
                        />
                    </div>
                    
                    <div className={"form-field"}>
                        <input 
                            type={"text"} 
                            maxLength={255}
                            placeholder={"City"}
                            onChange={(e) => handleChange(e, "city")} 
                            required
                        />
                    </div>
                
                    <CountryField 
                        printLabel={false}
                        updateCredentials={updateCredentials}
                        countryCredential={credentials.country}
                    />
                </div>
                
                <div className={"form-button"}>
                    <button className={"btn btn-blue"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}