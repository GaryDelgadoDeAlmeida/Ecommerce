import React, { useEffect } from "react";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import { Link } from "react-router-dom";

export default function Home() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin`)

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
            {/* Resume */}
            <div className={"d-grid -col-4"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Users</label>
                    </div>
                    <div className={"-content"}>
                        <span>1</span>
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Orders</label>
                    </div>
                    <div className={"-content"}>
                        <span>3</span>
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Products</label>
                    </div>
                    <div className={"-content"}>
                        <span>1</span>
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Brands</label>
                    </div>
                    <div className={"-content"}>
                        <span>1</span>
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
                                <tr>
                                    <td className={"-created-at"}>01/10/2023</td>
                                    <td className={"-firstname"}>Garry</td>
                                    <td className={"-lastname"}>ALMEIDA</td>
                                    <td className={"-amount"}>190 €</td>
                                </tr>
                                <tr>
                                    <td className={"-created-at"}>01/10/2023</td>
                                    <td className={"-firstname"}>Garry</td>
                                    <td className={"-lastname"}>ALMEIDA</td>
                                    <td className={"-amount"}>190 €</td>
                                </tr>
                                <tr>
                                    <td className={"-created-at"}>01/10/2023</td>
                                    <td className={"-firstname"}>Garry</td>
                                    <td className={"-lastname"}>ALMEIDA</td>
                                    <td className={"-amount"}>190 €</td>
                                </tr>
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