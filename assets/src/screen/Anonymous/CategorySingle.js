import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../component/part/Header";
import Pagination from "../../component/part/Pagination";
import ProductCard from "../../component/part/ProductCard";
import Notification from "../../component/part/Notification";
import PublicRessource from "../../component/utils/PublicRessource";

export default function CategorySingle() {

    const { categoryID } = useParams()
    if(isNaN(categoryID)) {
        return <Navigate to={"/categories"} />
    }

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PublicRessource(`${window.location.origin}/api/category/${categoryID}?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1>Category Detail</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/"}>Home</Link>
                        <span>/</span>
                        <Link to={"/categories"}>Categories</Link>
                        <span>/</span>
                        <span>Category</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading . . ."} />
                    )}

                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.message} />
                    )}

                    {!loading && Object.keys(items.results ?? []).length > 0 && (
                        <>
                            <div className={"d-grid -col-5 -m-col-2"}>
                                {Object.values(items.results).map((item, index) => (
                                    <ProductCard key={index} product={item} />
                                ))}
                            </div>

                            <Pagination 
                                offset={offset}
                                setOffset={setOffset}
                                maxOffset={items.maxOffset}
                            />
                        </>
                    )}
                </div>
            </div>
        </Header>
    )
}