import axios from "axios";
import React, { useState } from "react";

export default function ResetPasswordForm() {

    const [formResponse, setFormResponse] = useState({})
    const [email, setEmail] = useState("")

    const handleChange = (e) => {
        setEmail(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/reset-password`, {email: email}, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld"
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "If your account exist, we'll send you an email to reset your password."})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered, please retry later"
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
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className={"form-field"}>
                <input 
                    type={"email"}
                    value={email}
                    placeholder={"Your account email ..."}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </div>
            <div className={"form-button txt-center"}>
                <button type={"submit"} className={"btn btn-blue"}>Reset password</button>
            </div>
        </form>
    )
}