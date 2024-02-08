import React, { useEffect, useState } from "react";
import PrivateRessource from "../utils/PrivateRessource";

export default function Filter({updateFilter}) {

    const [credentials, setCredentials] = useState({
        search: "",
        category: ""
    })
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/categories`, false)

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
            <div className={"-filter-search"}>
                <input 
                    type={"text"} 
                    value={credentials.search}
                    placeholder={"Search a product ..."}
                    handleFilter={(e) => handleFilter(e, "search")} 
                />
            </div>
            <div className={"-filter-price"}>
                <div className={"-header"}>
                    <label>Price</label>
                </div>
                <div className={"-content"}>
                    <li></li>
                </div>
            </div>
            <div className={"-filter-category"}>
                <div className={"-header"}>
                    <label>Category</label>
                </div>
                <div className={"-content"}>
                    <li>
                        <input id={"category-1"} type={"checkbox"} onChange={(e) => handleFilter(e, "category")} />
                        <label htmlFor={"category-1"}>Clothes</label>
                    </li>
                    <li>
                        <input id={"category-2"} type={"checkbox"} onChange={(e) => handleFilter(e, "category")} />
                        <label htmlFor={"category-2"}>Technology</label>
                    </li>
                    <li>
                        <input id={"category-3"} type={"checkbox"} onChange={(e) => handleFilter(e, "category")} />
                        <label htmlFor={"category-3"}>Accessories</label>
                    </li>
                    <li>
                        <input id={"category-4"} type={"checkbox"} onChange={(e) => handleFilter(e, "category")} />
                        <label htmlFor={"category-4"}>Books</label>
                    </li>
                    <li>
                        <input id={"category-5"} type={"checkbox"} onChange={(e) => handleFilter(e, "category")} />
                        <label htmlFor={"category-5"}>Furnitures</label>
                    </li>
                </div>
            </div>
            <div className={"-filter-brands"}>
                <div className={"-header"}>
                    <label>Brands</label>
                </div>
                <div className={"-content"}>
                    <li>
                        <input id={"brand-1"} type={"checkbox"} onChange={(e) => handleFilter(e, "brand")} />
                        <label htmlFor={"brand-1"}>Brand A</label>
                    </li>
                    <li>
                        <input id={"brand-2"} type={"checkbox"} onChange={(e) => handleFilter(e, "brand")} />
                        <label htmlFor={"brand-2"}>Brand B</label>
                    </li>
                    <li>
                        <input id={"brand-3"} type={"checkbox"} onChange={(e) => handleFilter(e, "brand")} />
                        <label htmlFor={"brand-3"}>Brand C</label>
                    </li>
                    <li>
                        <input id={"brand-4"} type={"checkbox"} onChange={(e) => handleFilter(e, "brand")} />
                        <label htmlFor={"brand-4"}>Brand D</label>
                    </li>
                    <li>
                        <input id={"brand-5"} type={"checkbox"} onChange={(e) => handleFilter(e, "brand")} />
                        <label htmlFor={"brand-5"}>Brand E</label>
                    </li>
                </div>
            </div>
        </div>
    )
}