import React, { useEffect, useState } from "react";

export default function CharacteristicField({updateCredentials}) {

    const [characteristic, setCharacteristic] = useState({
        label: "",
        description: ""
    })

    useEffect(() => {
        updateCredentials(characteristic)
    }, [characteristic])

    const handleChange = (e, fieldName) => {
        setCharacteristic({
            ...characteristic,
            [fieldName]: e.currentTarget.value
        })
    }

    return (
        <div className={"form-field-inline"}>
            <div className={"form-field"}>
                <input type={"text"} value={characteristic.label} onChange={(e) => handleChange(e, "label")} />
            </div>
            <div className={"form-field"}>
                <textarea value={characteristic.description} onChange={(e) => handleChange(e, "description")}></textarea>
            </div>
        </div>
    )
}