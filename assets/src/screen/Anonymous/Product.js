import React, { useEffect, useState } from "react";
import Header from "../../component/part/Header";
import Pagination from "../../component/part/Pagination";
import ProductCard from "../../component/part/ProductCard";
import Notification from "../../component/part/Notification";
import PrivateRessource from "../../component/utils/PrivateRessource";
import Filters from "../../component/part/Filters";
import { Link } from "react-router-dom";

export default function Product() {

    const [filters, setFilters] = useState({})
    const [offset, setOffset] = useState(1)
    const {load, items: products, loading, error} = PrivateRessource(`${window.location.origin}/api/products?offset=${offset}&` + new URLSearchParams(filters).toString(), false)
    
    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"page-title"}>Products</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/"}>Home</Link>
                        <span>/</span>
                        <span>Products</span>
                    </div>
                </div>
            </div>
            <div className={"page-wrapper"}>
                <div className={"page-product"}>
                    <div className={"product-wrapper"}>
                        <div className={"-left"}>
                            <Filters updateFilter={setFilters} />
                        </div>
                        <div className={"-right"}>
                            {loading && (
                                <Notification classname={"information"} message={"Loading ..."} />
                            )}

                            {!loading ? (
                                <>
                                    {Object.keys(error).length > 0 && (
                                        <Notification classname={"danger"} message={error.message} />
                                    )}
                                    
                                    {Object.keys(products.results ?? []).length > 0 ? (
                                        <>
                                            <div className={"product-list"}>
                                                {Object.values(products.results).map((item, index) => (
                                                    <ProductCard 
                                                        key={index} 
                                                        product={item} 
                                                    />
                                                ))}
                                            </div>
        
                                            <Pagination 
                                                offset={offset} 
                                                setOffset={setOffset} 
                                                maxOffset={products.maxOffset}
                                            />
                                        </>
                                    ) : (
                                        <Notification classname={"information"} message={"There is no products to display"} />
                                    )}
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}