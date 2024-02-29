import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../../component/part/Badge";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function Order() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/orders?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleRemove = (e) => {
        console.log("Hi handleRemove")
    }

    return (
        <HeaderAdmin>
            <table className={"table -collapse"}>
                <thead>
                    <tr>
                        <th className={"column-order-id"}>Command id</th>
                        <th className={"column-customer"}>Customer</th>
                        <th className={"column-paid-status"}>Paid Status</th>
                        <th className={"column-status"}>Status</th>
                        <th className={"column-created-at"}>Created at</th>
                        <th className={"column-action"}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className={"-order-id"}>Order-3</th>
                        <th className={"-customer"}>Garry ALMEIDA</th>
                        <th className={"-paid-status"}>
                            <Badge txtContent={"paid"} />
                        </th>
                        <th className={"-status"}>
                            <Badge txtContent={"ongoing"} />
                        </th>
                        <th className={"-created-at"}>11/12/2023 22:13:01</th>
                        <th className={"-action"}>
                            <Link className={"btn btn-blue -inline-flex"} to={`/admin/order/1`}>
                                <img src={`${window.location.origin}/content/svg/eye.svg`} alt={"see more"} />
                            </Link>
                            
                            <button 
                                type={"button"} 
                                className={"btn btn-red -inline"} 
                                onClick={(e) => handleRemove(e)}
                            >
                                <img src={`${window.location.origin}/content/svg/trash.svg`} alt={"remove"} />
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>

            <Pagination />
        </HeaderAdmin>
    )
}