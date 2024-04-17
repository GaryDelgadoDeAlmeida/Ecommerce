import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../component/utils/DomControl";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function Home() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/statistics`)

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

    if(Object.keys(error).length > 0) {
        return (
            <HeaderAdmin>
                <Notification classname={"danger"} message={error.message} />
            </HeaderAdmin>
        )
    }

    console.log(items)

    return (
        <HeaderAdmin>
            {/* Resume */}
            <div className={"d-grid -col-4"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Customers</label>
                    </div>
                    <div className={"-content"}>
                        <span>{items.nbrCustomers}</span>
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Orders</label>
                    </div>
                    <div className={"-content"}>
                        <span>{items.nbrOrders}</span>
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Products</label>
                    </div>
                    <div className={"-content"}>
                        <span>{items.nbrProducts}</span>
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Brands</label>
                    </div>
                    <div className={"-content"}>
                        <span>{items.nbrBrands}</span>
                    </div>
                </div>
            </div>

            {/* Stats on selling */}
            <div className={"m-t-25"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Sales Report</label>
                    </div>
                    <div className={"-content"}>
                        <div className={"stats"}></div>
                    </div>
                </div>
            </div>

            <div className={"m-t-25"}>
                <div className={"d-grid -col-3"}>
                    <div className={"card"}>
                        <div className={"-header"}>
                            <span>Active Users</span>
                        </div>
                        <div className={"-content"}></div>
                    </div>
                    <div className={"card"}>
                        <div className={"-header"}>
                            <label>Top Selling Products</label>
                        </div>
                        <div className={"-content"}></div>
                    </div>
                    <div className={"card"}>
                        <div className={"-header"}>
                            <label>Category</label>
                        </div>
                        <div className={"-content"}></div>
                    </div>
                </div>
            </div>

            <div className={"m-t-25"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>New customers</label>
                    </div>
                    <div className={"-content"}>
                        <table className={"table -collapse"}>
                            <tbody>
                                {Object.values(items.activeUsers ?? []).map((item, index) => (
                                    <tr key={index}>
                                        <td className={"-created-at"}>{formatDate(item.created_at, "fr")}</td>
                                        <td className={"-firstname"}>{item.firstname}</td>
                                        <td className={"-lastname"}>{item.lastname.toUpperCase()}</td>
                                        <td className={"-amount"}>190 €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={"-footer"}>
                        <div className={"txt-right p-tb-5"}>
                            <Link className={"btn btn-blue"} to={"/admin/users"}>See all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}