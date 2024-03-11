import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../../component/part/Badge";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import { formatDate } from "../../component/utils/DomControl";
import PrivateRessource from "../../component/utils/PrivateRessource";
import axios from "axios";

export default function Order() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/orders?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleCancel = (e, orderID) => {
        console.log("Hi handleCancel")

        axios
            .delete(`${window.location.origin}/api/admin/order/${orderID}/cancel`)
            .then((response) => {})
            .catch((error) => {})
        ;
    }

    const handleRemove = (e, orderID) => {
        console.log("Hi handleRemove")
        
        if(!confirm("Are you sure to delete this order ? This action will be irreversible !")) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/admin/order/${orderID}/remove`)
            .then((response) => {})
            .catch((error) => {})
        ;
    }

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
                        <th className={"-actions"}>
                            <Link className={"btn btn-blue -inline-flex"} to={`/admin/order/1`}>
                                <img src={`${window.location.origin}/content/svg/eye.svg`} alt={"see more"} />
                            </Link>
                            
                            <button 
                                type={"button"} 
                                className={"btn btn-red -inline"} 
                                onClick={(e) => handleCancel(e, 1)}
                            >
                                <img src={`${window.location.origin}/content/svg/ban.svg`} alt={"remove"} />
                            </button>
                            
                            <button 
                                type={"button"} 
                                className={"btn btn-red -inline"} 
                                onClick={(e) => handleRemove(e)}
                            >
                                <img src={`${window.location.origin}/content/svg/trash.svg`} alt={"remove"} />
                            </button>
                        </th>
                    </tr>

                    {Object.keys(items.results ?? []).length > 0 ? (
                        Object.values(items.results).map((item, index) => (
                            <tr key={index}>
                                <td className={"-order-id"}></td>
                                <td className={"-customer"}></td>
                                <td className={"-paid-status"}>
                                    <Badge txtContent={"paid"} />
                                </td>
                                <td className={"-status"}>
                                    <Badge txtContent={"paid"} />
                                </td>
                                <td className={"-created-at"}>{formatDate()}</td>
                                <td className={"-actions"}>
                                    <Link className={"btn btn-blue -inline-flex"} to={`/admin/order/${item.id}`}>
                                        <img src={`${window.location.origin}/content/svg/eye.svg`} alt={"see more"} />
                                    </Link>
                                    
                                    <button 
                                        type={"button"} 
                                        className={"btn btn-red -inline"} 
                                        onClick={(e) => handleCancel(e, item.id)}
                                    >
                                        <img src={`${window.location.origin}/content/svg/ban.svg`} alt={"remove"} />
                                    </button>
                                    
                                    <button 
                                        type={"button"} 
                                        className={"btn btn-red -inline"} 
                                        onClick={(e) => handleRemove(e, item.id)}
                                    >
                                        <img src={`${window.location.origin}/content/svg/trash.svg`} alt={"remove"} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className={"-message"} colSpan={6}>There is no order for now</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination 
                offset={offset}
                setOffset={setOffset}
                maxOffset={items.maxOffset}
            />
        </HeaderAdmin>
    )
}