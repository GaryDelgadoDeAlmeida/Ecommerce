import React, { useEffect } from "react";
import PrivateRessource from "../../component/utils/PrivateRessource";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import ProfileForm from "../../component/form/ProfileForm";
import Notification from "../../component/part/Notification";

export default function Profile() {

    const { load, items: user, loading, error } = PrivateRessource(`${window.location.origin}/api/admin/profile`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <div className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.message} />
                )}

                {!loading && Object.keys(user).length > 0 && (
                    <div className={"card"}>
                        <div className={"-content"}>
                            <ProfileForm user={user.results} />
                        </div>
                    </div>
                )}
            </div>
        </HeaderAdmin>
    )
}