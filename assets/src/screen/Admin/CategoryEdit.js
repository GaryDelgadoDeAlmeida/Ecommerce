import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import CategoryForm from "../../component/form/CategoryForm";
import PrivateRessource from "../../component/utils/PrivateRessource";
import Notification from "../../component/part/Notification";

export default function CategoryEdit() {

    const { categoryID } = useParams()
    if(isNaN(categoryID)) {
        return <Navigate to={"/admin/categories"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/category/${categoryID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/categories"}>Retour</Link>

            <div className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.message} />
                )}

                {!loading && (
                    <div className={"card"}>
                        <div className={"-header"}></div>
                        <div className={"-content"}>
                            <CategoryForm category={items.results} />
                        </div>
                    </div>
                )}
            </div>
        </HeaderAdmin>
    )
}