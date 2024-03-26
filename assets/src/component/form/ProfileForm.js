import React, { useState } from "react";
import Notification from "../part/Notification";
import CountryField from "./parts/CountryField";
import axios from "axios";

export default function ProfileForm({user = null, isAdmin = false}) {

    const storageUser = localStorage.getItem("user")
    const jsonUser = storageUser.length > 0 ? JSON.parse(storageUser) : []

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState(user ?? {
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        phone: "",
        email: "",
        password: ""
    })

    const updateCredentials = (fieldName, fieldValue) => {
        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleChange = (e, fieldName) => {
        let fieldValue = e.target.value

        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let apiURL = `${window.location.origin}/api/user/profile`
        if(isAdmin) {
            apiURL = `${window.location.origin}/api/admin/profile`
        }

        axios
            .put(`${window.location.origin}/api/user/profile`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + jsonUser.token
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "Your account has been successfully updated"})
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
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <label htmlFor={"firstname"}>Firstname</label>
                        <input id={"firstname"} type={"text"} value={credentials.firstname} maxLength={100} onChange={(e) => handleChange(e, "firstname")} />
                    </div>
                    
                    <div className={"form-field"}>
                        <label htmlFor={"lastname"}>Lastname</label>
                        <input id={"lastname"} type={"text"} value={credentials.lastname} maxLength={255} onChange={(e) => handleChange(e, "lastname")} />
                    </div>
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"address"}>Address</label>
                    <input id={"address"} type={"text"} value={credentials.address} maxLength={255} onChange={(e) => handleChange(e, "address")} />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <label htmlFor={"zip_code"}>Zip code</label>
                        <input id={"zip_code"} type={"text"} value={credentials.zipCode} maxLength={10} onChange={(e) => handleChange(e, "zipCode")} />
                    </div>
                    
                    <div className={"form-field"}>
                        <label htmlFor={"city"}>City</label>
                        <input type={"text"} value={credentials.city} maxLength={255} onChange={(e) => handleChange(e, "city")} />
                    </div>

                    <CountryField 
                        printLabel={true}
                        updateCredentials={updateCredentials}
                        countryCredential={credentials.country}
                    />
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"phone"}>Phone</label>
                    <input id={"phone"} type={"tel"} value={credentials.phone} maxLength={10} onChange={(e) => handleChange(e, "phone")} />
                </div>
                
                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-blue"}>Submit</button>
                </div>
            </form>
        </>
    )
}