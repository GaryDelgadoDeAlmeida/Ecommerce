import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../part/Notification";
import PublicRessource from "../utils/PublicRessource";
import axios from "axios";

export default function RegisterForm() {
    const [formResponse, setFormResponse] = useState({})
    const {load, items: countries, loading, error} = PublicRessource("https://restcountries.com/v3.1/all?fields=name")

    const credentials = useRef({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        load()
    }, [])

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

        credentials.current = {
            ...credentials.current,
            [fieldName]: fieldValue
        }
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
            })
            .catch(error => {
                console.log(error)
            })
        ;
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <div className={"form-field-inline"}>
                <div className={"form-field"}>
                    <label htmlFor={"firstname"}>Firstname</label>
                    <input type={"text"} maxLength={255} onChange={(e) => handleChange(e, "firstname")} />
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"lastname"}>Lastname</label>
                    <input type={"text"} maxLength={255} onChange={(e) => handleChange(e, "lastname")} />
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
                
                <div className={"form-field"}>
                    <label htmlFor={"country"}>Country</label>
                    {!loading.current ? (
                        <select onChange={(e) => handleChange(e, "country")}>
                            <option value={""}>Select a country</option>
                            {Object.keys(countries.current).length > 0 ? (
                                Object.value(countries.current).map((item, index) => (
                                    <option key={index} value={item.name.common}>{item.name.common}</option>
                                ))
                            ) : null}
                        </select>
                    ) : (
                        <span>Loading ...</span>
                    )}
                </div>
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
    )
}