import React, { useRef, useState } from "react";
import Notification from "../part/Notification";

export default function ProfileForm({user = null}) {

    const [formResponse, setFormResponse] = useState({})
    let credentials = useRef({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        zip_code: "",
        country: "",
        phone: "",
        email: "",
        password: ""
    })

    const handleChange = (e, fieldName) => {
        let fieldValue = e.target.value

        credentials.current = {
            ...credentials.current,
            [fieldName]: fieldValue
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <div className={"form-field-inline"}>
                <div className={"form-field"}>
                    <label htmlFor={"firstname"}>Firstname</label>
                    <input id={"firstname"} type={"text"} value={credentials.current.firstname} maxLength={100} onChange={(e) => handleChange(e, "firstname")} />
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"lastname"}>Lastname</label>
                    <input id={"lastname"} type={"text"} value={credentials.current.lastname} maxLength={255} onChange={(e) => handleChange(e, "lastname")} />
                </div>
            </div>
            
            <div className={"form-field"}></div>
            
            <div className={"form-field"}></div>
            
            <div className={"form-field"}></div>
            
            <div className={"form-field"}></div>
            
            <div className={"form-field"}></div>
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}