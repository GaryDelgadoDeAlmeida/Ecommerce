import React, { useState } from "react";
import Notification from "../part/Notification";
import axios from "axios";

export default function PasswordForm({isAdmin = false}) {

    const storageUser = localStorage.getItem("user")
    const user = JSON.parse(storageUser.length > 0 ? storageUser : [])

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        password: "",
        new_password: "",
        new_password_confirm: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let apiURL = `${window.location.origin}/api/profile`
        if(isAdmin) {
            apiURL = `${window.location.origin}/api/admin/profile`
        }

        axios
            .put(apiURL, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "Your password has been successfully updated"})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please retry later"
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
                        type={"password"} 
                        placeholder={"Old password"} 
                        value={credentials.password}
                        onChange={(e) => handleChange(e, "password")} 
                        required 
                    />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"password"} 
                            placeholder={"New password"} 
                            value={credentials.new_password}
                            onChange={(e) => handleChange(e, "new_password")} 
                            required 
                        />
                    </div>
                    <div className={"form-field"}>
                        <input 
                            type={"password"} 
                            placeholder={"Confirm new password"} 
                            value={credentials.new_password_confirm}
                            onChange={(e) => handleChange(e, "new_password_confirm")} 
                            required 
                        />
                    </div>
                </div>

                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-blue"}>Submit</button>
                </div>
            </form>
        </>
    )
}