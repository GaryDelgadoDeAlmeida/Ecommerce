import React, { useState } from "react";
import Notification from "../part/Notification";
import axios from "axios";

export default function CommentForm({productID}) {

    const storageUser = localStorage.getItem("user")
    const user = JSON.parse(storageUser.length > 0 ? storageUser : null)

    const ratings = [1, 2, 3, 4, 5]
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        productID: productID,
        rating: 0,
        message: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const resetFields = () => {
        setCredentials({
            productID: productID,
            rating: 0,
            message: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/user/comment`, credentials, {
                headers: {
                    "Accept": "application/json+ld",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((response) => {
                resetFields()
                setFormResponse({classname: "success", message: "Your comment has been added to the product"})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered, please, retry later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }
                
                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form m-b-15"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <select onChange={(e) => handleChange(e, "rating")} required>
                        <option value={""}>Select a rate</option>
                        {ratings.map((item, index) => (
                            <option 
                                key={index} 
                                value={item} 
                                selected={item == credentials.rating ? true : false}
                            >{item}</option>
                        ))}
                    </select>
                </div>
                
                <div className={"form-field"}>
                    <textarea 
                        value={credentials.message} 
                        placeholder={"Your comment ..."}
                        onChange={(e) => handleChange(e, "message")} 
                        required
                    ></textarea>
                </div>
                
                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-blue"}>Submit</button>
                </div>
            </form>
        </>
    )
}