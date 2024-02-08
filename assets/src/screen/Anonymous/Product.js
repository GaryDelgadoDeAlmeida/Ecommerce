import React, { useEffect, useState } from "react";
import Header from "../../component/part/Header";
import Pagination from "../../component/part/Pagination";
import ProductCard from "../../component/part/ProductCard";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import Filter from "../../component/part/Filter";

export default function Product() {

    const [filters, setFilters] = useState({})
    const [offset, setOffset] = useState(1)
    const {load, items: products, loading, error} = PrivateRessource(`${window.location.origin}/api/product?offset=${offset}`, false)
    
    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <div className={"page-hero"}>
                <h1 className={"page-title"}>Products</h1>
            </div>
            <div className={"page-wrapper"}>
                <div className={"page-section"}>
                    <div className={"d-grid -col-2"}>
                        <div className={"-left"}>
                            <Filter updateFilter={setFilters} />
                        </div>
                        <div className={"-right"}>
                            {!loading ? (
                                Object.keys(products).length > 0 ? (
                                    <div className={"d-col -col-4"}>
                                        {Object.values(products).map((item, index) => (
                                            <ProductCard key={index} product={item} />
                                        ))}
                                    </div>
                                ) : (
                                    <Notification classname={"information"} message={"Il n'y aucun produit enregistrer"} />
                                )
                            ) : (
                                <Notification classname={"information"} message={"Loading ..."} />
                            )}
                        </div>
                    </div>

                    <Pagination offset={offset} setOffset={setOffset} />
                </div>
            </div>
        </Header>
    )
}