import axios from "axios";
import React, { useRef, useState } from "react";
import Notification from "../part/Notification"
import { Link } from "react-router-dom";

export default function Login() {

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
            .post(`${window.location.origin}/api/login_check`, credentials.current)
            .then((response) => {
                /**
                 * Normally, he should return that object
                 * {
                 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDMxNTYxNDcsImV4cCI6MTcwMzE1OTc0Nywicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6ImdhcnkuYWxtZWlkYS53b3JrQGdtYWlsLmNvbSJ9.ZPLOmVV1ow87OB12kJDtn9vJESBS1O7jU8mYgoQh2r81X0nBVGpRWgJrZH0IziIGtsf-CHAlyaNsrfZ_GCJDICFRrklHB5waCtTHP3me6tOWpb4h4kPbZGoh1OEyuD0m9Wlp_ZoJPoK2WuM7mB2DYGPzypUr7GzkOMez0s4nOXr4vbHPJ5ZjSk_sPke0R4vJw3KFZOssxn6B_wFPh4KgVAVAMKWDFsvMEkiIh1SzaOeXSTKiT1dxa2NCnk_0eneMGfQqdAx4H78z2jkvpoyUvyGD4vGxCKFTGbYkt4YCGLBvc82B_kQ4AfuHsDMyFhf_1IwBsGtJGkj6DXOdRNMiEQ"
                 * }
                 */
                localStorage.setItem("token", response.data.token)
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
    )
}