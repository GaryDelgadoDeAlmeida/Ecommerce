import React, { useEffect, useState } from "react";
import PrivateRessource from "../../utils/PrivateRessource";
import Notification from "../../part/Notification";

export default function CategoryField({updateCredentials, categoryCredential = ""}) {

    const [category, setCategory] = useState(categoryCredential)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/categories?option=all`)

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        updateCredentials("category", category)
    }, [category])

    const handleChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    if(loading) {
        return <Notification classname={"information"} message={"Loading ..."} />
    }

    if(Object.keys(error).length > 0) {
        return <Notification classname={"danger"} message={error.message} />
    }

    return (
        <div className={"form-field"}>
            <label>Category</label>
            
            <select onChange={(e) => handleChange(e)}>
                <option value={category}>Select a category</option>
                {Object.values(items.results ?? []).map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}