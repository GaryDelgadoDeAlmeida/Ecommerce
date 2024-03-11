import React, { useEffect, useState } from "react";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import { Link } from "react-router-dom";

export default function User() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/users?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

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

    {console.log(items)}
    
    return (
        <HeaderAdmin>
            <table className={"table -collapse"}>
                <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Nbr orders</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(items.results ?? []).length > 0 ? (
                        Object.values(items.results).map((item, index) => (
                            <tr key={index}>
                                <td className={"-fullname"}>{item.firstname} {item.lastname.toUpperCase()}</td>
                                <td className={"-address"}>{item.address}, {item.city} {item.zipCode}, {item.country}</td>
                                <td className={"-phone"}>{item.phone}</td>
                                <td className={"-email"}>{item.email}</td>
                                <td className={"-nbr-orders"}>{item.orders.length}</td>
                                <td className={"-actions"}>
                                    <Link className={"btn btn-blue -inline-flex"} to={`/admin/user/${item.id}`}>
                                        <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className={"-message"} colSpan={6}>There is no user registered in the database</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination 
                offset={offset}
                setOffset={setOffset}
                maxOffset={items.results}
            />
        </HeaderAdmin>
    )
}