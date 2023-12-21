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
            
            <div className={"form-field"}>
                <label htmlFor={"address"}>Address</label>
                <input id={"address"} type={"text"} maxLength={255} onChange={(e) => handleChange(e, "address")} />
            </div>
            
            <div className={"form-field"}>
                <label htmlFor={"zip_code"}>Zip code</label>
                <input id={"zip_code"} type={"text"} maxLength={10} onChange={(e) => handleChange(e, "zip_code")} />
            </div>
            
            <div className={"form-field"}>
                <label htmlFor={"city"}>City</label>
                <input type={"text"} maxLength={255} onChange={(e) => handleChange(e, "city")} />
            </div>
            
            <div className={"form-field"}>
                <label htmlFor={"country"}>Country</label>
                <select id={"country"} onChange={(e) => handleChange(e, "country")}>
                    <option value={""}>Select a country</option>
                </select>
            </div>
            
            <div className={"form-field"}>
                <label htmlFor={"phone"}>Phone</label>
                <input id={"phone"} type={"tel"} maxLength={10} onChange={(e) => handleChange(e, "phone")} />
            </div>
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}