import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../component/part/Header";
import Notification from "../../component/part/Notification";
import PublicRessource from "../../component/utils/PublicRessource";
import CategoryCard from "../../component/part/CategoryCard";
import Pagination from "../../component/part/Pagination";

export default function Category() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PublicRessource(`${window.location.origin}/api/categories?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Category</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/"}>Home</Link>
                        <span>/</span>
                        <span>Category</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <Notification classname={"information"} message={"There is no category registered for now."} />

                    {loading && (
                        <Notification classname={"information"} message={"Loading . . ."} />
                    )}

                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.message} />
                    )}

                    {!loading && Object.keys(items.results ?? []).length > 0 && (
                        <>
                            <div className={"d-grid -col-5"}>
                                {Object.values(items.results).map((item, index) => (
                                    <CategoryCard 
                                        key={index} 
                                        category={item} 
                                    />
                                ))}
                            </div>

                            <Pagination
                                offset={offset}
                                setOffset={setOffset}
                                maxOffset={items.maxOffset}
                            />
                        </>
                    )}

                    {/* <CategoryCard /> */}
                </div>
            </div>
        </Header>
    )
}