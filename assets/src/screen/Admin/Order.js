import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../../component/part/Badge";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import { formatDate, findChildren, findParent } from "../../component/utils/DomControl";
import axios from "axios";

export default function Order() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/orders?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleCancel = (e, orderID) => {
        console.log("Hi handleCancel")
        console.log(e.currentTarget)
        return

        axios
            .delete(`${window.location.origin}/api/admin/order/${orderID}/cancel`)
            .then((response) => {
                console.log(
                    response,
                    response.status,
                    e.currentTarget
                )
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered with the sended body"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }
                
                alert(errorMessage)
            })
        ;
    }

    const handleRemove = (e, orderID) => {
        console.log("Hi handleRemove")
        console.log(e.currentTarget)
        
        if(!confirm("Are you sure to delete this order ? This action will be irreversible !")) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/admin/order/${orderID}/remove`)
            .then((response) => {
                console.log(
                    response,
                    response.status,
                    e.currentTarget
                )
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered with the sended body"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }
                
                alert(errorMessage)
            })
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
                        <th>Command id</th>
                        <th>Customer</th>
                        <th>Paid Status</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={"-order-id"}>Order-3</td>
                        <td className={"-customer"}>Garry ALMEIDA</td>
                        <td className={"-paid-status"}>
                            <Badge txtContent={"paid"} />
                        </td>
                        <td className={"-status"}>
                            <Badge txtContent={"ongoing"} />
                        </td>
                        <td className={"-created-at"}>11/12/2023 22:13:01</td>
                        <td className={"-actions"}>
                            <Link className={"btn btn-blue -inline-flex"} to={`/admin/order/1`}>
                                <img src={`${window.location.origin}/content/svg/eye-white.svg`} alt={"see more"} />
                            </Link>
                            
                            <button 
                                type={"button"} 
                                className={"btn btn-red -inline"} 
                                onClick={(e) => handleCancel(e, 1)}
                            >
                                <img src={`${window.location.origin}/content/svg/ban-white.svg`} alt={"cancel"} />
                            </button>
                            
                            <button 
                                type={"button"} 
                                className={"btn btn-red -inline"} 
                                onClick={(e) => handleRemove(e)}
                            >
                                <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={"remove"} />
                            </button>
                        </td>
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
                                        <img src={`${window.location.origin}/content/svg/eye-white.svg`} alt={"see more"} />
                                    </Link>
                                    
                                    <button 
                                        type={"button"} 
                                        className={"btn btn-red -inline"} 
                                        onClick={(e) => handleCancel(e, item.id)}
                                    >
                                        <img src={`${window.location.origin}/content/svg/ban-white.svg`} alt={"remove"} />
                                    </button>
                                    
                                    <button 
                                        type={"button"} 
                                        className={"btn btn-red -inline"} 
                                        onClick={(e) => handleRemove(e, item.id)}
                                    >
                                        <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={"remove"} />
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