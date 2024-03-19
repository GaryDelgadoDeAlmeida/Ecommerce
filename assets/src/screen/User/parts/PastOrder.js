import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "../../../component/part/Badge";
import PrivateRessource from "../../../component/utils/PrivateRessource";

export default function PastOrder() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/user/orders/history`)

    useEffect(() => {
        load()
    }, [])

    return (
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
                    {loading && (
                        <tr>
                            <td className={"-message"} colSpan={7}>Loading ...</td>
                        </tr>
                    )}

                    {Object.keys(error).length > 0 && (
                        <tr>
                            <td className={"-message"} colSpan={7}>{error.message}</td>
                        </tr>
                    )}

                    {!loading ? (
                        Object.keys(items.results ?? []).length > 0 ? (
                            Object.values(items.results).map((item, index) => (
                                <tr key={index}>
                                    <td className={"-ordered-at"}>21/01/2024</td>
                                    <td className={"-invoice-number"}>INV-0002</td>
                                    <td className={"-paid-status"}>
                                        <Badge txtContent={item.paidStatus} />
                                    </td>
                                    <td className={"-status"}>
                                        <Badge txtContent={item.status} />
                                    </td>
                                    <td className={"-total-amount"}>{item.totalPrice} €</td>
                                    <td className={"-quantity"}>{item.orderDetails.length}</td>
                                    <td className={"-actions"}>
                                        <Link className={"btn btn-blue -inline-flex"} to={`/user/order/${item.id}`}>
                                            <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className={"-message"} colSpan={7}>There is no order registered</td>
                            </tr>
                        )
                    ) : null}
                </tbody>
            </table>

            <div className={"m-t-25 txt-right"}>
                <Link to={"/user/orders"} className={"btn btn-blue"}>See all</Link>
            </div>
        </>
    )
}