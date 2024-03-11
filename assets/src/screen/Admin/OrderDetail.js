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

    if(loading) {
        return (
            <HeaderAdmin>
                <Notification classname={"information"} message={"Loading ..."} />
            </HeaderAdmin>
        )
    }

    // if(Object.keys(error).length > 0) {
    //     return (
    //         <HeaderAdmin>
    //             <Notification classname={"danger"} message={error.message} />
    //         </HeaderAdmin>
    //     )
    // }

    return (
        <HeaderAdmin>
            <Link to={"/admin/orders"} className={"btn btn-blue -inline-flex"}>
                <img src={`${window.location.origin}/content/svg/arrow-left.svg`} alt={"arrow-left"} />
                <span>Retour</span>
            </Link>

            <div className={"m-t-25"}>
                <div className={"d-grid -col-4"}>
                    <div className={"card"}>
                        <div className={"-content"}>
                            <span>WAITING</span>
                            <span>23/02/2022</span>
                        </div>
                    </div>
                    <div className={"card"}>
                        <div className={"-content"}>
                            <span>ONGOING</span>
                            <span>23/02/2022</span>
                        </div>
                    </div>
                    <div className={"card"}>
                        <div className={"-content"}>
                            <span>ONGOING DELIVERY</span>
                            <span>23/02/2022</span>
                        </div>
                    </div>
                    <div className={"card"}>
                        <div className={"-content"}>
                            <span>DELIVERED</span>
                            <span>23/02/2022</span>
                        </div>
                    </div>
                </div>
            </div>

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
                            <td className={"-quantity"}>1</td>
                            <td className={"-unit-price"}>1200.00</td>
                        </tr>
                        <tr>
                            <td className={"-product"}>Computer charger</td>
                            <td className={"-quantity"}>1</td>
                            <td className={"-unit-price"}>30.00</td>
                        </tr>
                        <tr>
                            <td className={"-product"}>Raspberry</td>
                            <td className={"-quantity"}>1</td>
                            <td className={"-unit-price"}>110.00</td>
                        </tr>
                        
                        <tr>
                            <td className={"t-d-hidden"} colSpan={2}></td>
                            <td className={"-total-amount"}>
                                <div className={"d-justify"}>
                                    <span className={"t-d-hidden"}>Total amount :</span>
                                    <span>1340.00</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </HeaderAdmin>
    )
}