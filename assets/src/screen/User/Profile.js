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
            <div className={"page-section"}>
                <h2 className={"page-title"}>Profile</h2>
                
                {!loading.current && typeof user.current == "object" && (
                    <div className={"card"}>
                        <div className={"-content"}>
                            <ProfileForm user={user.current} />
                        </div>
                    </div>
                )}
            </div>
        </HeaderUser>
    )
}