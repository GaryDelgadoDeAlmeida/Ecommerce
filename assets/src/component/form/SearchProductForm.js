import axios from "axios";
import React, { useState } from "react";

export default function SearchProductForm({updateProducts}) {

    const [search, setSearch] = useState("")

    const handleChange = (e) => {
        setSearch(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .get(`${window.location.origin}/api/products?search=${search}`)
            .then((response) => {})
            .catch((error) => {})
        ;
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            <div className={"form-field"}>
                <input 
                    type={"text"}
                    value={search}
                    placeholder={"Search a product ..."}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </form>
    )
}