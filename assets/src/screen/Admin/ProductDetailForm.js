import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import ProductForm from "../../component/form/ProductForm";
import PrivateRessource from "../../component/utils/PrivateRessource";
import Notification from "../../component/part/Notification";

export default function ProductDetailForm() {

    const { productID } = useParams()
    if(isNaN(productID)) {
        return <Navigate to={"/admin/products"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/product/${productID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/product/" + productID}>Return</Link>

            <div className={"m-t-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                )}

                {!loading && Object.keys(items ?? []).length > 0 && (
                    <ProductForm product={items} />
                )}
            </div>
        </HeaderAdmin>
    )
}