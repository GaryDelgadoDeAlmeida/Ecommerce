import React, { useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../part/Notification";
import CountryField from "./parts/CountryField";
import axios from "axios";

export default function RegisterForm() {
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
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

        switch(fieldName) {
            case "firstname":
            case "lastname":
            case "address":
            case "city":
            case "zip_code":
            case "country":
            case "phone":
            case "email":
            case "password":
                break

            default:
                setFormResponse({
                    classname: "danger",
                    message: `The field name '${fieldName}' is forbidden`
                })
        }

        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormResponse({})

        axios
            .post(`${window.location.origin}/api/register`, credentials, {
                headers: {
                    "Accept": "application/json",
                    "Credentials": "same-origin",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                console.log(response)
                setFormResponse({classname: "success", message: "Your account has been created. Please, try to log to your account"})
            })
            .catch(error => {
                let errorMessage = "An error has been encountered. Please later or contact us in our contact form"
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
                        <input type={"text"} maxLength={100} onChange={(e) => handleChange(e, "firstname")} />
                    </div>
                    
                    <div className={"form-field"}>
                        <label htmlFor={"lastname"}>Lastname</label>
                        <input type={"text"} maxLength={150} onChange={(e) => handleChange(e, "lastname")} />
                    </div>
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"address"}>Address</label>
                    <input type={"text"} maxLength={255} onChange={(e) => handleChange(e, "address")} />
                </div>

                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <label htmlFor={"zip_code"}>Zip code</label>
                        <input type={"text"} maxLength={10} onChange={(e) => handleChange(e, "zip_code")} />
                    </div>
                    
                    <div className={"form-field"}>
                        <label htmlFor={"city"}>City</label>
                        <input type={"text"} maxLength={255} onChange={(e) => handleChange(e, "city")} />
                    </div>

                    <CountryField 
                        printLabel={true}
                        updateCredentials={updateCredentials}
                        countryCredential={credentials.country}
                    />
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"phone"}>Phone number</label>
                    <input type={"tel"} maxLength={20} onChange={(e) => handleChange(e, "phone")} />
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} maxLength={255} onChange={(e) => handleChange(e, "email")} />
                    <small>Votre adresse email sera également utilisé comme identifiant de connexion</small>
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} minLength={8} maxLength={255} onChange={(e) => handleChange(e, "password")} />
                    <small>Votre mot de passe doit avoir au minimum 8 caractères.</small>
                </div>

                <div className={"form-information"}>
                    <span>Vous avez déjà un compte ? <Link to={"/login"}>Veuillez vous connecter ici</Link></span>
                </div>

                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-blue"}>Submit</button>
                </div>
            </form>
        </>
    )
}