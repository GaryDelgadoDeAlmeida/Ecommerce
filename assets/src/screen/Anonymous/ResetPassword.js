import React from "react";
import { Link } from "react-router-dom";
import Header from "../../component/part/Header";
import ResetPasswordForm from "../../component/form/ResetPasswordForm";

export default function ResetPassword() {

    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-login"}>
                    <div className={"card"}>
                        <div className={"-header txt-center"}>
                            <label>Forgot your password ?</label>
                        </div>
                        <div className={"-content txt-center"}>
                            <p>Enter your account email and we’ll send you a link to reset the password of your account</p>
                            <ResetPasswordForm />
                        </div>
                        <div className={"-footer d-justify"}>
                            <Link to={"/login"}>Back to log in</Link>
                            <Link to={"/register"}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}