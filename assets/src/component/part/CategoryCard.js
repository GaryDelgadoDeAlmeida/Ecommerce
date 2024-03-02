import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({category}) {

    return (
        <Link to={`/category/${category.id}`} className={"category-card"}>
            {/* Will contain the title of category */}
            <div className={"-header"}>
                <label>{category.name}</label>
            </div>

            {/* Will contains the number of products linked to the categort with a description of the category (maybe) */}
            <div className={"-content"}>
                <label>{category.description}</label>
                <label>{category.products.length} products</label>
            </div>
        </Link>
    )
}