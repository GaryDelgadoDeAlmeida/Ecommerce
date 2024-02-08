import React, { useEffect, useState } from "react";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import { Link } from "react-router-dom";

export default function Product() {

    const [offset, setOffset] = useState(1)
    const {loading, items, load, error} = PrivateRessource(`${window.location.origin}/api/products?offset=${offset}`)
    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            {!loading && items.length > 0 ? (
                <div className={"page-section"}>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Branch</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Unit Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.results.length > 0 ? (
                                items.results.map((item, index) => (
                                    <tr key={index}>
                                        <td className={"-product"}>{item}</td>
                                        <td className={"-branch"}></td>
                                        <td className={"-category"}></td>
                                        <td className={"-description"}></td>
                                        <td className={"-unit-price"}></td>
                                        <td className={"-action"}>
                                            <Link to={`/admin/product/${item.id}`}>
                                                <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className={"-message"} colSpan={6}>Il n'y a aucun produit enregistrer</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Pagination offset={offset} maxOffset={items.maxOffset} setOffset={setOffset} />
                </div>
            ) : (
                <Notification classname={"information"} message={"Loading ..."} />
            )}
        </HeaderAdmin>
    )
}