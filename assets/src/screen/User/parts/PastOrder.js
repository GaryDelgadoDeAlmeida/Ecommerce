import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../component/part/Badge";

export default function PastOrder() {

    return (
        <>
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
                    <tr>
                        <td>INV-0002</td>
                        <td>
                            <Badge txtContent={"delivered"} />
                        </td>
                        <td>39.99 €</td>
                        <td>3</td>
                        <td className={"-actions"}>
                            <Link className={"btn btn-blue -inline-flex"} to={`/user/order/1`}>
                                <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>INV-0003</td>
                        <td>
                            <Badge txtContent={"delivered"} />
                        </td>
                        <td>39.99 €</td>
                        <td>3</td>
                        <td className={"-actions"}>
                            <Link className={"btn btn-blue -inline-flex"} to={`/user/order/1`}>
                                <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>INV-0004</td>
                        <td>
                            <Badge txtContent={"delivered"} />
                        </td>
                        <td>39.99 €</td>
                        <td>3</td>
                        <td className={"-actions"}>
                            <Link className={"btn btn-blue -inline-flex"} to={`/user/order/1`}>
                                <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className={"m-t-25 txt-right"}>
                <Link to={"/user/orders"} className={"btn btn-blue"}>See all</Link>
            </div>
        </>
    )
}