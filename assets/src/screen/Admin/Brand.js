import React, { useEffect, useState } from "react";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";

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
                                <td className={"-brand"}></td>
                                <td className={"-address"}></td>
                                <td className={"-category"}></td>
                                <td className={"-nbr-products"}></td>
                                <td className={"-actions"}></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className={"-message"} colSpan={5}></td>
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