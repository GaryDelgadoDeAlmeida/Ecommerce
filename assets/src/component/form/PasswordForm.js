import React, { useState } from "react";

export default function PasswordForm() {

    const [credentials, setCredentials] = useState({
        password: "",
        new_password: "",
        new_password_confirm: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            <div className={"form-field"}>
                <input 
                    type={"password"} 
                    placeholder={"Old password"} 
                    value={credentials.password}
                    onChange={(e) => handleChange(e, "password")} 
                    required 
                />
            </div>
            
            <div className={"form-field-inline"}>
                <div className={"form-field"}>
                    <input 
                        type={"password"} 
                        placeholder={"New password"} 
                        value={credentials.new_password}
                        onChange={(e) => handleChange(e, "new_password")} 
                        required 
                    />
                </div>
                <div className={"form-field"}>
                    <input 
                        type={"password"} 
                        placeholder={"Confirm new password"} 
                        value={credentials.new_password_confirm}
                        onChange={(e) => handleChange(e, "new_password_confirm")} 
                        required 
                    />
                </div>
            </div>

            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}