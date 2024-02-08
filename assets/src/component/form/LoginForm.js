import axios from "axios";
import React, { useRef, useState } from "react";
import Notification from "../part/Notification"
import { Link, Navigate } from "react-router-dom";

export default function Login({adminConnect}) {

    const [isLogged, setIsLogged] = useState(false)
    const [formResponse, setFormResponse] = useState({})
    let credentials = useRef({
        email: "",
        password: ""
    })

    const handleChange = (e, fieldName) => {
        let fieldValue = e.target.value
        setFormResponse({})

        switch(fieldName) {
            case "email":
            case "password":
                credentials.current = {
                    ...credentials.current,
                    [fieldName]: fieldValue
                }
            break

            default:
                setFormResponse({
                    classname: "danger",
                    message: `The field name ${fieldName} isn't allowed.`
                })
                break
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`${window.location.origin}/api/login_check`, credentials.current, {
                headers: {
                    "Accept": "application/json+ld",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                localStorage.setItem("user", JSON.stringify({
                    role: adminConnect ? "ROLE_ADMIN" : "ROLE_USER",
                    token: response.data.token
                }))

                setIsLogged(true)
            })
            .catch(({response}) => {
                let errorMessage = "An error has been encountered. Please retry more later"
                
                if(response.data.message) {
                    errorMessage = response.data.message
                } else if(response.data.detail) {
                    errorMessage = response.data.detail
                }

                setFormResponse({
                    classname: "danger",
                    message: errorMessage
                })
            })
        ;
    }

    return (
        <>
            {isLogged && (
                <Navigate to={adminConnect ? "/admin" : "/user"} />
            )}
            
            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                {Object.keys(formResponse).length > 0 && (
                    <Notification {...formResponse} />
                )}

                <div className={"form-field"}>
                    <label htmlFor={"email"}>Email</label>
                    <input id={"email"} type={"email"} value={credentials.current.login} onChange={(e) => handleChange(e, "email")} />
                </div>
                
                <div className={"form-field"}>
                    <label htmlFor={"password"}>Password</label>
                    <input id={"password"} type={"password"} value={credentials.current.password} onChange={(e) => handleChange(e, "password")} />
                </div>
                
                <div className={"form-information"}>
                    <span>Vous n'avez pas encore un compte ? <Link to={"/register"}>Créez-en un compte ici</Link></span>
                </div>

                <div className={"form-button"}>
                    <button className={"btn btn-blue"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}