import React, { useEffect, useState } from "react";

export default function ImageField({updateCredentials, fieldName}) {

    const [image, setPhoto] = useState(null)

    useEffect(() => {
        updateCredentials(fieldName, image)
    }, [image])

    const handleChange = (e) => {
        setPhoto(e.target.files[0] ?? null)
    }

    return (
        <div className={"form-field"}>
            <label htmlFor={fieldName}>Photo</label>
            <input 
                id={fieldName}
                type={"file"} 
                onChange={(e) => handleChange(e)} 
                max={1} 
                required 
            />
        </div>
    )
}