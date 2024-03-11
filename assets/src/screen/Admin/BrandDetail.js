import React, { useEffect } from "react";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../component/utils/PrivateRessource";
import Notification from "../../component/part/Notification";

export default function BrandDetail() {

    const { brandID } = useParams()
    if(isNaN(brandID)) {
        return <Navigate to={"/admin/brands"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/brand/${brandID}`)

    useEffect(() => {
        load()
    }, [])

    if(loading) {
        return (
            <HeaderAdmin>
                <Notification classname={"information"} message={"Loading ..."} />
            </HeaderAdmin>
        )
    }

    if(Object.keys(error).length > 0) {
        return (
            <HeaderAdmin>
                <Notification classname={"danger"} message={error.message} />
            </HeaderAdmin>
        )
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/brands"}>
                <span>Retour</span>
            </Link>

            <div className={"m-t-25"}></div>
        </HeaderAdmin>
    )
}