import React, { useEffect } from "react";
import HeaderUser from "../../component/part/HeaderUser";
import PrivateRessource from "../../component/utils/PrivateRessource";
import ProfileForm from "../../component/form/ProfileForm";

export default function Profile() {

    const {load, items: user, loading, error} = PrivateRessource(`${window.location.origin}/api/user/profile`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderUser>
            <h1>Profile</h1>
            
            <div className={"card"}>
                <div className={"-content"}>
                    <ProfileForm user={user} />
                </div>
            </div>
        </HeaderUser>
    )
}