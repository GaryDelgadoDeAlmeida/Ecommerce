import React, { useEffect, useState } from "react";
import Pagination from "../../../component/part/Pagination";
import CommentCard from "../../../component/part/CommentCard";
import Notification from "../../../component/part/Notification";
import PrivateRessource from "../../../component/utils/PrivateRessource";

export default function Comment() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/user/comments?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <div className={"comments"}>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading ? (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.message} />
                    )}
                    
                    {Object.keys(items.results ?? []).length > 0 ? (
                        <>
                            {Object.values(items.results).map((item, index) => (
                                <CommentCard key={index} comment={item} />
                            ))}
        
                            <Pagination 
                                offset={offset}
                                setOffset={setOffset}
                                maxOffset={items.maxOffset}
                            />
                        </>
                    ) : (
                        <Notification classname={"information"} message={"Your commented no products"} />
                    )}
                </>
            ) : null}
        </div>
    )
}