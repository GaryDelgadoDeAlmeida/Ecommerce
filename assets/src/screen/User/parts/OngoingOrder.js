import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "../../../component/part/Badge";
import PrivateRessource from "../../../component/utils/PrivateRessource";

export default function OngoingOrder() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/user/orders/ongoing`)
    useEffect(() => {
        load()
    }, [])

    return (
        <table className={"table -collapse"}>
            <thead>
                <tr>
                    <th>Invoice</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Nbr items</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {loading && (
                    <tr>
                        <td className={"-message"} colSpan={5}>Loading ...</td>
                    </tr>
                )}

                {Object.keys(error).length > 0 && (
                    <tr>
                        <td className={"-message"} colSpan={5}>{error.message}</td>
                    </tr>
                )}

                {!loading ? (
                    Object.keys(items.results ?? []).length > 0 ? (
                        Object.values(items.results).map((item, index) => (
                            <tr key={index}>
                                <td className={"-invoice-number"}>INV-0001</td>
                                <td className={"-status"}>
                                    <Badge txtContent={item.status} />
                                </td>
                                <td className={"-total-amount"}>{item.totalPrice} €</td>
                                <td className={"-quantity"}>{item.orderDetails.length}</td>
                                <td className={"-actions"}>
                                    <Link className={"btn btn-blue -inline-flex"} to={`/user/order/${item.id}`}>
                                        <img src={`${window.location.origin}/content/svg/eye.svg`} alt={"See more"} />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className={"-message"} colSpan={5}>There is no ongoing orders</td>
                        </tr>
                    )
                ) : null}
            </tbody>
        </table>
    )
}