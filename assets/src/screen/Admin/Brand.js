import React, { useEffect, useState } from "react";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import { Link } from "react-router-dom";

export default function Brand() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/brands?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <table className={"table -collapse"}>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Address</th>
                        <th>Category</th>
                        <th>Nbr products</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(items.results ?? []).length > 0 ? (
                        Object.values(items.results).map((item, index) => (
                            <tr key={index}>
                                <td className={"-brand"}>{item.name}</td>
                                <td className={"-address"}></td>
                                <td className={"-category"}></td>
                                <td className={"-nbr-products"}>{item.products.length}</td>
                                <td className={"-actions"}>
                                    <Link className={"btn btn-blue -inline-flex"} to={`/admin/brand/${item.id}`}>
                                        <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className={"-message"} colSpan={5}>There no brand registered in our database</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination
                offset={offset}
                setOffset={setOffset}
                maxOffset={items.maxOffset}
            />
        </HeaderAdmin>
    )
}