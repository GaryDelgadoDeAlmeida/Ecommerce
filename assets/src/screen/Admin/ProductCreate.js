import React from "react";
import { Link } from "react-router-dom";
import ProductForm from "../../component/form/ProductForm";
import HeaderAdmin from "../../component/part/HeaderAdmin";

export default function ProductCreate() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/products"}>
                <span>Retour</span>
            </Link>
            
            <div className={"m-t-25"}>
                <div className={"card"}>
                    <div className={"-header"}></div>
                    <div className={"-content"}>
                        <ProductForm />
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}