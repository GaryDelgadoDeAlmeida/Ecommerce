import React from "react"
import Header from "../../component/part/Header"
import LoginForm from "../../component/form/LoginForm"

export default function Login({adminConnect = false}) {
    
    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-section h-100 m-auto"}>
                    <div className={"card"}>
                        <div className={"-content"}>
                            <LoginForm adminConnect={adminConnect} />
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}