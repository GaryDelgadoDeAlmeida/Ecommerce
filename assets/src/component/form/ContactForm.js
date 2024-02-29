import React, { useState } from "react";
import Notifcation from "../part/Notification";
import axios from "axios";

export default function ContactForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        fullname: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const resetCredentials = () => {
        setCredentials({
            fullname: "",
            email: "",
            subject: "",
            message: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/contact`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/ld+json"
                }
            })
            .then((response) => {
                resetCredentials()
                setFormResponse({classname: "success", message: "Thanks for your message. Our team will contact you as quickly as possible"})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry later"
                if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                } else if(error.response.data.message) {
                    errorMessage = error.response.data.message
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notifcation {...formResponse} />
            )}

            <form className={"form contact-form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"text"} 
                            placeholder={"Your fullname"}
                            value={credentials.fullname}
                            maxLength={255}
                            onChange={(e) => handleChange(e, "fullname")} 
                            required 
                        />
                    </div>
                    
                    <div className={"form-field"}>
                        <input 
                            type={"email"}
                            placeholder={"Your email"}
                            value={credentials.email}
                            maxLength={255}
                            onChange={(e) => handleChange(e, "email")}
                            required
                        />
                    </div>
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        placeholder={"Subject"}
                        value={credentials.subject}
                        maxLength={255}
                        onChange={(e) => handleChange(e, "subject")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <textarea 
                        placeholder={"Your message"}
                        value={credentials.message}
                        onChange={(e) => handleChange(e, "message")}
                        required
                    ></textarea>
                </div>
                
                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-blue"}>Submit</button>
                </div>
            </form>
        </>
    )
}