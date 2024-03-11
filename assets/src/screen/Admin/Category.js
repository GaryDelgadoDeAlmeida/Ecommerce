import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import Pagination from "../../component/part/Pagination";
import Notification from "../../component/part/Notification";
import CategoryCard from "../../component/part/CategoryCard";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function Category() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/categories?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && Object.keys(error).length > 0 && (
                <Notification classname={"danger"} message={error.message} />
            )}

            {!loading && Object.keys(items.results ?? []).length > 0 && (
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
            )}
        </HeaderAdmin>
    )
}