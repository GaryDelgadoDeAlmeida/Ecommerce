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

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/product/create"}>Add a new product</Link>

            {!loading && (
                <div className={"m-t-25"}>
                    <table className={"table -collapse"}>
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
                            {Object.keys(items.results ?? []).length > 0 ? (
                                Object.values(items.results).map((item, index) => (
                                    <tr key={index}>
                                        <td className={"-product"}>{item}</td>
                                        <td className={"-brand"}></td>
                                        <td className={"-category"}></td>
                                        <td className={"-description"}></td>
                                        <td className={"-unit-price"}></td>
                                        <td className={"-actions"}>
                                            <Link to={`/admin/product/${item.id}`}>
                                                <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className={"txt-center"}>
                                    <td className={"-message"} colSpan={6}>Il n'y a aucun produit enregistrer</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Pagination 
                        offset={offset} 
                        setOffset={setOffset} 
                        maxOffset={items.maxOffset} 
                    />
                </div>
            )}
        </HeaderAdmin>
    )
}