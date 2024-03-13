import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Pagination from "../../component/part/Pagination";
import Notification from "../../component/part/Notification";
import CategoryCard from "../../component/part/CategoryCard";
import PrivateRessource from "../../component/utils/PrivateRessource";
import { Link } from "react-router-dom";

export default function Category() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/categories?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/category/create"}>Add a category</Link>

            <div className={"m-t-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.message} />
                )}

                {!loading && Object.keys(items.results ?? []).length > 0 ? (
                    <>
                        <div className={"d-grid -col-4"}>
                            {Object.values(items.results).map((item, index) => (
                                <CategoryCard 
                                    key={index} 
                                    category={item} 
                                    url={"/admin/category"}
                                />
                            ))}
                        </div>

                        <Pagination 
                            offset={offset}
                            setOffset={setOffset}
                            maxOffset={items.maxOffset}
                        />
                    </>
                ) : (
                    <Notification classname={"information"} message={"There is no category registered"} />
                )}
            </div>
        </HeaderAdmin>
    )
}