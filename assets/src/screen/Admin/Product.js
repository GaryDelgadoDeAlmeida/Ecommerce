import React from "react";
import HeaderAdmin from "../../component/part/HeaderAdmin";

export default function Product() {

    return (
        <HeaderAdmin>
            <div className={"page-section"}>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Branch</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={"-product"}></td>
                            <td className={"-branch"}></td>
                            <td className={"-category"}></td>
                            <td className={"-description"}></td>
                            <td className={"-unit-price"}></td>
                            <td className={"-action"}></td>
                        </tr>
                    </tbody>
                </table>

                <div className={"pagination"}>
                    <div className={"item"}>
                        <a>0</a>
                    </div>
                    
                    <div className={"item current-page"}>
                        <button type={"button"}>1</button>
                    </div>
                    
                    <div className={"item"}>
                        <a>2</a>
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}