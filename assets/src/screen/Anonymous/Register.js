import React from "react";
import Header from "../../component/part/Header"
import RegisterForm from "../../component/form/RegisterForm";
import { Link } from "react-router-dom";

export default function Register() {

    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-section"}>
                    <Link className={"btn btn-blue"} to={"/"}>Return</Link>

                    <div className={"card m-t-25"}>
                        <div className={"-content"}>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}