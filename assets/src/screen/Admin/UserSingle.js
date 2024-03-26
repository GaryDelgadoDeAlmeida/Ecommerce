import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import ProfileForm from "../../component/form/ProfileForm";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function UserSingle() {

    const { userID } = useParams()
    if(isNaN(userID)) {
        return <Navigate to={"/admin/users"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/user/${userID}`)

    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/users"}>Return</Link>

            <div className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.message} />
                        )}

                        {Object.values(items.results ?? []).length > 0 && (
                            <div className={"card"}>
                                <div className={"-content"}>
                                    <ProfileForm user={items.results} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </HeaderAdmin>
    )
}