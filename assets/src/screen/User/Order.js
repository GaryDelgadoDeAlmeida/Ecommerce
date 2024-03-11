import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../component/part/Header";
import Badge from "../../component/part/Badge";
import Pagination from "../../component/part/Pagination";
import Notification from "../../component/part/Notification";
import { formatDate } from "../../component/utils/DomControl";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function Order() {
    
    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/user/orders/history?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Orders</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/user"}>User</Link>
                        <span>/</span>
                        <span>Orders</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading ..."} />
                    )}

                    {!loading && Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.message} />
                    )}

                    {!loading && (
                        <>
                            <table className={"table -collapse"}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Invoice</th>
                                        <th>Paid Status</th>
                                        <th>Status</th>
                                        <th>Price</th>
                                        <th>Nbr items</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(items.results ?? []).length > 0 ? (
                                        Object.values(items.results).map((item, index) => (
                                            <tr key={index}>
                                                <td className={"-date"}>{formatDate(item.createdAt)}</td>
                                                <td className={"-invoice-number"}>{item.invoice ? item.invoice.invoiceNumber : ""}</td>
                                                <td className={"-paid-status"}>
                                                    <Badge txtContent={item.paidStatus} />
                                                </td>
                                                <td className={"-status"}>
                                                    <Badge txtContent={item.status} />
                                                </td>
                                                <td className={"-total-price"}>{item.totalPrice}</td>
                                                <td className={"-nbr-items"}>{item.orderDetails.length} items</td>
                                                <td className={"-actions"}>
                                                    <Link className={"btn btn-blue -inline-flex"} to={`/user/order/${item.id}`}>
                                                        <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className={"txt-center"}>
                                            <td className={"-message"} colSpan={7}>You still hasn't do any order</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    
                            <Pagination 
                                offset={offset}
                                setOffset={setOffset}
                                maxOffset={items.maxOffset}
                            />
                        </>
                    )}
                </div>
            </div>
        </Header>
    )
}