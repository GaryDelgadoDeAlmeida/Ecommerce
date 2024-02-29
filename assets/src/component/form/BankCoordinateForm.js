import React, { useState } from "react";
import Notification from "../part/Notification";
import axios from "axios";

export default function BankCoordinateForm() {

    const storageUser = localStorage.getItem("user")
    const user = storageUser.length > 0 ? JSON.parse(storageUser) : []

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        card_type: "",
        card_owner_name: "",
        card_number: "",
        card_expiration_date: "",
        card_cvv: "",
        sepa_bic: "",
        sepa_iban: "",
        sepa_owner_name: ""
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
            .post(`${window.location.origin}/api/user/bank-coordinate`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/ld+json",
                    "Authorization": "Bearer " + user ? user.token : ""
                }
            })
            .then((response) => {})
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry later or contact the admin"
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
                    <select onChange={(e) => handleChange(e, "card_type")}>
                        <option value={""}>Select your card type</option>
                        <option value={"visa_master_card"}>Visa / Master Card</option>
                        <option value={"sepa"}>SEPA</option>
                    </select>
                </div>

                {credentials.card_type == "visa_master_card" && (
                    <>
                        <div className={"form-field"}>
                            <input 
                                type={"text"} 
                                value={credentials.card_owner_name} 
                                placeholder={"Name on the card"}
                                onChange={(e) => handleChange(e, "card_owner_name")} 
                            />
                        </div>

                        <div className={"form-field-inline"}>
                            <div className={"form-field"}>
                                <input 
                                    type={"text"} 
                                    value={credentials.card_number}
                                    placeholder={"Card number"}
                                    onChange={(e) => handleChange(e, "card_number")}
                                />
                            </div>
                        
                            <div className={"form-field"}>
                                <input 
                                    type={"number"} 
                                    value={credentials.card_cvv}
                                    placeholder={"Code CVV"}
                                    onChange={(e) => handleChange(e, "card_cvv")} 
                                />
                            </div>
                        </div>

                        <div className={"form-field"}>
                            <input 
                                type={"date"} 
                                value={credentials.card_expiration_date}
                                placeholder={"Expiration date"}
                                onChange={(e) => handleChange(e, "card_expiration_date")} 
                            />
                        </div>
                    </>
                )}

                {credentials.card_type == "sepa" && (
                    <>
                        <div className={"form-field"}>
                            <input 
                                type={"text"} 
                                value={credentials.sepa_bic} 
                                placeholder={"BIC (Swift-Code)"}
                                onChange={(e) => handleChange(e, "sepa_bic")} 
                            />
                        </div>
                        <div className={"form-field"}>
                            <input 
                                type={"text"} 
                                value={credentials.sepa_iban}
                                placeholder={"IBAN"}
                                onChange={(e) => handleChange(e, "sepa_iban")}
                            />
                        </div>
                        <div className={"form-field"}>
                            <input 
                                type={"text"}
                                value={credentials.sepa_owner_name}
                                placeholder={"Name of the owner of the account"}
                                onChange={(e) => handleChange(e, "sepa_owner_name")}
                            />
                        </div>
                    </>
                )}

                <div className={"form-button"}>
                    <button className={"btn btn-blue"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}