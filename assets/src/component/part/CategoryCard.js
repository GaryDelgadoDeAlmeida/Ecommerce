import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { findParent } from "../utils/DomControl";

export default function CategoryCard({category, url = "/category", isAdmin = false}) {

    const storageUser = localStorage.getItem("user")
    const jsonUser = JSON.parse(storageUser.length > 0 ? storageUser : [])

    const handleRemove = (e, categoryID) => {
        e.preventDefault()
        if(!confirm("Are you sure you want to remove this category ?")) {
            return
        }

        const parent = findParent(e.currentTarget, "category-card")
        if(parent.length == 0) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/admin/category/${categoryID}/remove`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + jsonUser.token
                }
            })
            .then((response) => {
                parent.remove()
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                alert(errorMessage)
            })
        ;
    }

    return (
        <Link to={`${url}/${category.id}`} className={"category-card"}>
            {isAdmin && (
                <div className={"-button"}>
                    <button className={"btn -inline-flex"} onClick={(e) => handleRemove(e, category.id)}>
                        <img src={`${window.location.origin}/content/svg/trash.svg`} alt={""} />
                    </button>
                </div>
            )}
            <div className={"-header"}>
                <label>{category.name}</label>
            </div>
            <div className={"-content"}>
                <label>{category.description}</label>
                <label>{category.products.length} products</label>
            </div>
        </Link>
    )
}