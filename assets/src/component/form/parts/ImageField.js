import React, { useEffect, useState } from "react";

export default function ImageField({updateCredentials, fieldName}) {

    const [image, setPhoto] = useState(null)

    useEffect(() => {
        updateCredentials(fieldName, image)
    }, [image])

    const handleChange = (e) => {
        console.log(image, e.target.files)
        setPhoto(e.target.files[0] ?? null)
    }

    return (
        <div className={"form-field"}>
            <label>Photo</label>
            <input 
                type={"file"} 
                onChange={(e) => handleChange(e)} 
                max={1} 
                required 
            />
        </div>
    )
}