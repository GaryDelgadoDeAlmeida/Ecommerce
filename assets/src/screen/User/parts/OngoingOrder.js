import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../component/part/Badge";

export default function OngoingOrder() {

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
                <tr>
                    <td>INV-0001</td>
                    <td>
                        <Badge txtContent={"ongoing"} />
                    </td>
                    <td>39.99 €</td>
                    <td>3</td>
                    <td>
                        <Link className={"btn -inline-flex"} to={`/user/order/1`}>
                            <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>INV-0001</td>
                    <td>
                        <Badge txtContent={"ongoing"} />
                    </td>
                    <td>39.99 €</td>
                    <td>3</td>
                    <td>
                        <Link className={"btn -inline-flex"} to={`/user/order/1`}>
                            <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>INV-0001</td>
                    <td>
                        <Badge txtContent={"ongoing"} />
                    </td>
                    <td>39.99 €</td>
                    <td>3</td>
                    <td>
                        <Link className={"btn -inline-flex"} to={`/user/order/1`}>
                            <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                        </Link>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}