import React, { useEffect, useState } from "react";
import Header from "../../component/part/Header";
import Pagination from "../../component/part/Pagination";
import ProductCard from "../../component/part/ProductCard";
import Notification from "../../component/part/Notification";
import PublicRessource from "../../component/utils/PublicRessource";

export default function BestSeller() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PublicRessource(`${window.location.origin}/api/products/best-sellers?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Best Seller Page</h1>
                    <p>Page that will print all most selled produts (products that attract most peoples)</p>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading ..."} />
                    )}

                    {Object.keys(error).length > 0 && (
                        <Notification classname={"information"} message={error.message} />
                    )}

                    {!loading && Object.keys(items.results ?? []).length > 0 ? (
                        <>
                            {/* Best seller */}
                            <div className={"d-grid -col-4 -m-col-2"}>
                                {Object.values(items.results).map((item, index) => (
                                    <ProductCard key={index} product={item} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <Pagination 
                                offset={offset}
                                setOffset={setOffset}
                                maxOffset={1}
                            />
                        </>
                    ) : (
                        <Notification classname={"information"} message={"There is no products registered"} />
                    )}
                </div>
            </div>
        </Header>
    )
}