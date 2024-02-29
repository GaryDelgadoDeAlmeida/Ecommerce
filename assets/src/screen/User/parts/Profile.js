import React, { useEffect } from "react";
import ProfileForm from "../../../component/form/ProfileForm";
import PrivateRessource from "../../../component/utils/PrivateRessource";
import Notification from "../../../component/part/Notification";

export default function Profile() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/user/profile`)

    useEffect(() => {
        load()
    }, [])

    if(loading) {
        return <Notification classname={"information"} message={"Loading . . ."} />
    }

    if(Object.keys(error).length > 0) {
        return <Notification classname={"danger"} message={error.message} />
    }

    return (
        <div className={"profile"}>
            {Object.keys(items.results ?? []).length > 0 && (
                <ProfileForm user={items.results} />
            )}
        </div>
    )
}