import axios from "axios";
import React, { useRef, useState } from "react";
import Notification from "../part/Notification"
import { Link } from "react-router-dom";

export default function Login() {

    const [formResponse, setFormResponse] = useState({})
    let credentials = useRef({
        login: "",
        password: ""
    })

    const handleChange = (e, fieldName) => {
        let fieldValue = e.target.value
        setFormResponse({})

        switch(fieldName) {
            case "login":
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
            .post(`${window.location.origin}/api/login`, credentials.current)
            .then((response) => {
                console.log(
                    response,
                    response.data
                )
            })
            .catch(({response}) => {
                let errorMessage = "An error has been encountered. Please retry more later"
                if(response.data != "" && typeof response.data == "object") {
                    errorMessage = response.data.detail
                } else if(response.data != "" && typeof response.data != "object") {
                    errorMessage = response.data
                }
                
                formResponse.current = {
                    classname: "danger",
                    messsage: errorMessage
                }
            })
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <div className={"form-field"}>
                <label htmlFor={"email"}>Email</label>
                <input id={"email"} type={"email"} value={credentials.current.login} onChange={(e) => handleChange(e, "login")} />
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
    )
}