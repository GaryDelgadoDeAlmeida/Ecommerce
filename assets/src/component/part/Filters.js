import React, { useEffect, useState } from "react";
import PrivateRessource from "../utils/PrivateRessource";

export default function Filter({updateFilter}) {

    const filters = {
        price: [
            {
                value: "asc",
                text: "Croissant"
            },
            {
                value: "desc",
                text: "Décroissant"
            }
        ]
    }
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/products-filters`, false)
    const [credentials, setCredentials] = useState({
        search: "",
        price: "",
        category: "",
        brand: ""
    })

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        updateFilter(credentials)
    }, [credentials])

    const handleFilter = (e, filterName) => {
        setCredentials({
            ...credentials,
            [filterName]: e.target.value
        })
    }

    return (
        <div className={"filter"}>
            <div className={"-filter-widget"}>
                
                {/* Search Section */}
                <div className={"-filter-card"}>
                    <div className={"-form"}>
                        <input 
                            type={"text"} 
                            value={credentials.search}
                            placeholder={"Search a product ..."}
                            handleFilter={(e) => handleFilter(e, "search")} 
                        />
                    </div>
                </div>
                
                {/* Price Section */}
                <div className={"-filter-card"}>
                    <div className={"-header"}>
                        <label>Price</label>
                    </div>
                    <div className={"-content"}>
                        {filters.price.map((item, index) => (
                            <li key={index}>
                                <input 
                                    id={`price-choice-${index + 1}`} 
                                    type={"radio"} 
                                    value={item.value} 
                                    name={"price"}
                                    onChange={(e) => handleFilter(e, "price")} 
                                    checked={credentials.price == item.value ? true : false}
                                />
                                <label htmlFor={`price-choice-${index + 1}`}>{item.text}</label>
                            </li>
                        ))}
                    </div>
                </div>

                {/* Category Section */}
                <div className={"-filter-card"}>
                    <div className={"-header"}>
                        <label>Category</label>
                    </div>
                    <div className={"-content"}>
                        {!loading && Object.values(items.categories ?? []).map((item, index) => (
                            <li key={index}>
                                <input id={`category-${index + 1}`} type={"checkbox"} onChange={(e) => handleFilter(e, "category")} />
                                <label htmlFor={`category-${index + 1}`}>{item.name}</label>
                            </li>
                        ))}
                    </div>
                </div>

                {/* Brands Section */}
                {!loading && Object.keys(items.brands ?? []).length > 0 && (
                    <div className={"-filter-card"}>
                        <div className={"-header"}>
                            <label>Brands</label>
                        </div>
                        <div className={"-content"}>
                            {Object.values(items.brands ?? []).map((item, index) => (
                                <li key={index}>
                                    <input id={`brand-${index + 1}`} type={"checkbox"} onChange={(e) => handleFilter(e, "brand")} />
                                    <label htmlFor={`brand-${index + 1}`}>{item.name}</label>
                                </li>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}