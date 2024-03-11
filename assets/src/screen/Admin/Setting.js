import React from "react";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import PasswordForm from "../../component/form/PasswordForm";

export default function Setting() {

    return (
        <HeaderAdmin>
            <div className={"card"}>
                <div className={"-header"}>
                    <label>Update your password</label>
                </div>
                <div className={"-content"}>
                    <PasswordForm />
                </div>
            </div>
        </HeaderAdmin>
    )
}