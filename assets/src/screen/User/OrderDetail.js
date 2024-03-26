import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/part/Header";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function OrderDetail() {

    const { orderID } = useParams()

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/user/order/${orderID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Orders</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/user"}>User</Link>
                        <span>/</span>
                        <Link to={"/user/orders"}>Orders</Link>
                        <span>/</span>
                        <span>Order detail</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading ..."} />
                    )}


                    {Object.values(error).length > 0 && (
                        <Notification classname={"danger"} message={error.message} />
                    )}

                    {!loading && Object.keys(items.results ?? []).length > 0 && (
                        Object.values(items.results).map((item, index) => (
                            <p></p>
                        ))
                    )}
                </div>
            </div>
        </Header>
    )
}