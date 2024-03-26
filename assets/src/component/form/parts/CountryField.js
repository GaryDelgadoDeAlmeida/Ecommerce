import React, { useEffect, useState } from "react";
import PublicRessource from "../../utils/PublicRessource";
import Notification from "../../part/Notification";

export default function CountryField({updateCredentials = null, countryCredential = "", printLabel = true}) {

    const [country, setCountry] = useState(countryCredential)
    const { loading, items: countries, load, error } = PublicRessource("https://restcountries.com/v3.1/all?fields=name")

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if(updateCredentials != null) {
            updateCredentials("country", country)
        }
    }, [country])

    const handleChange = (e) => {
        setCountry(e.currentTarget.value)
    }

    if(loading) {
        return <Notification classname={"information"} message={"Loading ..."} />
    }

    if(Object.keys(error).length > 0) {
        return <Notification classname={"danger"} message={error.message} />
    }

    return (
        <div className={"form-field"}>
            {printLabel && (
                <label htmlFor={"country"}>Country</label>
            )}
            <select id={"country"} value={country} onChange={(e) => handleChange(e)}>
                <option value={""}>Select a country</option>
                {countries.length > 0 && (
                    countries.map((item, index) => (
                        <option 
                            key={index} 
                            value={item.name.common} 
                        >{item.name.common}</option>
                    ))
                )}
            </select>
        </div>
    )
}