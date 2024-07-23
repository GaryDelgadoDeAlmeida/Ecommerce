import React, { useEffect, useState } from "react";
import Pagination from "../../component/part/Pagination";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import { Link } from "react-router-dom";
import SearchProductForm from "../../component/form/SearchProductForm";

export default function Product() {

    const [offset, setOffset] = useState(1)
    const {loading, items, load, error} = PrivateRessource(`${window.location.origin}/api/products?offset=${offset}`, false)
    
    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/product/create"}>Add a new product</Link>

            <div className={"m-t-25"}>

                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
                
                {!loading && Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.message} />
                )}

                {!loading && Object.keys(error).length == 0 && Object.keys(items.results ?? []).length > 0 && (
                    <>
                        <SearchProductForm />
                        
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
                                    {Object.values(items.results ?? []).map((item, index) => (
                                        <tr key={index}>
                                            <td className={"-product"}>{item.name}</td>
                                            <td className={"-brand"}>{item.brand ? item.brand.name : ""}</td>
                                            <td className={"-category"}>{item.category ? item.category.name : ""}</td>
                                            <td className={"-description"}>{item.description}</td>
                                            <td className={"-unit-price"}>{item.price}</td>
                                            <td className={"-actions"}>
                                                <Link className={"btn btn-blue -inline-flex"} to={`/admin/product/${item.id}`}>
                                                    <img src={`${window.location.origin}/content/svg/eye-white.svg`} alt={""} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Pagination 
                                offset={offset} 
                                setOffset={setOffset} 
                                maxOffset={items.maxOffset} 
                            />
                        </div>
                    </>
                )}
            </div>
        </HeaderAdmin>
    )
}