import React from "react"
import Header from "../../component/part/Header"
import LoginForm from "../../component/form/LoginForm"

export default function Login() {
    
    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </Header>
    )
}