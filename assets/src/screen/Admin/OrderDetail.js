import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function OrderDetail() {
    const { orderID } = useParams()
    const { load, items: order, loading, error } = PrivateRessource(`${window.location.origin}/api/admin/order/${orderID}`)

    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            {loading ? (
                <div className={"page-section"}>
                    <Link to={"/admin/order"} className={"btn btn-blue -inline-flex"}>
                        <img src={`${window.location.origin}/content/svg/arrow-left.svg`} alt={"arrow-left"} />
                        <span>Return</span>
                    </Link>

                    <div className={"m-t-25"}>
                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={"-product"}>Computer</td>
                                    <td className={"-quantity txt-center"}>1</td>
                                    <td className={"-unit-price txt-center"}>1200.00</td>
                                </tr>
                                <tr>
                                    <td className={"-product"}>Computer charger</td>
                                    <td className={"-quantity txt-center"}>1</td>
                                    <td className={"-unit-price txt-center"}>30.00</td>
                                </tr>
                                <tr>
                                    <td className={"-product"}>Raspberry</td>
                                    <td className={"-quantity txt-center"}>1</td>
                                    <td className={"-unit-price txt-center"}>110.00</td>
                                </tr>
                                
                                <tr>
                                    <td colSpan={2}></td>
                                    <td className={"txt-center"}>
                                        <div className={""}>
                                            <span>Total amount :</span>
                                            <span>1340.00</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <Notification classsname="information" message="Loading ..." />
            )}
        </HeaderAdmin>
    )
}