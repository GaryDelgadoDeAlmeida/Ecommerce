import React, { useEffect, useState } from "react";
import Notification from "../part/Notification";
import PublicRessource from "../utils/PublicRessource";

export default function BrandForm() {

    const { loading, items: countries, load, error } = PublicRessource("https://restcountries.com/v3.1/all?fields=name")
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        name: "",
        address: "",
        zipCode: "",
        city: "",
        country: ""
    })

    useEffect(() => {
        load()
    }, [])

    const handleChange = (e, fieldName) => {}

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <input 
                        type={"text"} 
                        placeholder={"Brand name"}
                        maxLength={255}
                        onChange={(e) => handleChange(e, "name")} 
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <input 
                        type={"text"} 
                        maxLength={255}
                        placeholder={"Address"}
                        onChange={(e) => handleChange(e, "address")} 
                        required
                    />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"text"} 
                            maxLength={20}
                            placeholder={"Zip code"}
                            onChange={(e) => handleChange(e, "zipCode")} 
                            required
                        />
                    </div>
                    
                    <div className={"form-field"}>
                        <input 
                            type={"text"} 
                            maxLength={255}
                            placeholder={"City"}
                            onChange={(e) => handleChange(e, "city")} 
                            required
                        />
                    </div>
                
                    <div className={"form-field"}>
                        <select onChange={(e) => handleChange(e, "country")}>
                            <option value={""}>Select a country</option>
                            {!loading && countries.length > 0 && (
                                countries.map((item, index) => (
                                    <option 
                                        key={index} 
                                        value={item.name.common} 
                                    >{item.name.common}</option>
                                ))
                            )}
                        </select>
                    </div>
                </div>
                
                <div className={"form-button"}>
                    <button className={"btn btn-blue"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}