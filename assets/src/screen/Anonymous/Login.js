import React from "react"
import Header from "../../component/part/Header"
import LoginForm from "../../component/form/LoginForm"
import { Link } from "react-router-dom"

export default function Login({adminConnect = false}) {
    
    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-section"}>
                    <Link className={"btn btn-blue"} to={"/"}>Return</Link>
                    
                    <div className={"card m-t-25"}>
                        <div className={"-content"}>
                            <LoginForm adminConnect={adminConnect} />
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}