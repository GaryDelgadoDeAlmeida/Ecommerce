import React, { useEffect } from "react";
import PrivateRessource from "../../component/utils/PrivateRessource";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import ProfileForm from "../../component/form/ProfileForm";

export default function Profile() {

    const { load, items: user, loading, error } = PrivateRessource(`${window.location.origin}/api/admin/profile`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <div className={"page-section"}>
                {!loading.current && typeof user.current == "object" && (
                    <div className={"card"}>
                        <div className={"-content"}>
                            <ProfileForm user={user.current} />
                        </div>
                    </div>
                )}
            </div>
        </HeaderAdmin>
    )
}