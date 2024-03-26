import React, { useEffect, useState } from "react";
import Notification from "../../part/Notification";
import PrivateRessource from "../../utils/PrivateRessource";

export default function BrandField({updateCredentials, brandCredential = ""}) {

    const [brand, setBrand] = useState(brandCredential)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/admin/brands?option=all`)

    useEffect(() => {
        load()
    }, [])
    
    useEffect(() => {
        updateCredentials("brand", brand)
    }, [brand])

    const handleChange = (e) => {
        setBrand(e.currentTarget.value)
    }

    if(loading) {
        return <Notification classname={"information"} message={"Loading ..."} />
    }

    if(Object.keys(error).length > 0) {
        return <Notification classname={"danger"} message={error.message} />
    }

    return (
        <div className={"form-field"}>
            <label>Brand</label>
            
            <select onChange={(e) => handleChange(e)}>
                <option value={""}>Select a brand</option>
                {Object.values(items.results ?? []).map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}