import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import BrandForm from "../../component/form/BrandForm";

export default function BrandCreate() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/brands"}>
                <span>Retour</span>
            </Link>
            
            <div className={"m-t-25"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>Add a new brand</label>
                    </div>
                    <div className={"-content"}>
                        <BrandForm />
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}