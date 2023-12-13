import React from "react";
import Header from "../../component/part/Header"
import RegisterForm from "../../component/form/RegisterForm";

export default function Register() {

    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-login"}>
                    <div className={"card"}>
                        <div className={"-content"}>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}