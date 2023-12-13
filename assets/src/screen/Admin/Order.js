import React from "react";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import { Link } from "react-router-dom";

export default function Order() {

    const handleRemove = (e) => {
        console.log("Hi handleRemove")
    }

    return (
        <HeaderAdmin>
            <div className={"page-section"}>
                <h1>Orders</h1>

                <div className={""}>
                    <table className={"table"}>
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
                                    <span className={"badge badg-success"}>paid</span>
                                </th>
                                <th className={"-status"}>
                                    <span className={"badge badge-warnin"}>ongoing</span>
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
                </div>
            </div>
        </HeaderAdmin>
    )
}