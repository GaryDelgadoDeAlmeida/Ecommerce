import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import CategoryForm from "../../component/form/CategoryForm";

export default function CategoryCreate() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/categories"}>Retour</Link>

            <div className={"m-t-25"}>
                <div className={"card"}>
                    <div className={"-header"}></div>
                    <div className={"-content"}>
                        <CategoryForm />
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}