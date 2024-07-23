import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Modal from "../../component/part/Modal";
import HeaderAdmin from "../../component/part/HeaderAdmin";
import ImageSlider from "../../component/part/ImageSlider";
import CommentCard from "../../component/part/CommentCard";
import ProductForm from "../../component/form/ProductForm";
import Notification from "../../component/part/Notification";
import { findChildren, findParent } from "../../component/utils/DomControl";
import PrivateRessource from "../../component/utils/PrivateRessource";

export default function ProductDefail() {

    const { productID } = useParams()
    if(isNaN(productID)) {
        return <Navigate to={"/admin/products"} />
    }

    const { loading, items: item, load, error } = PrivateRessource(`${window.location.origin}/api/product/${productID}`)

    useEffect(() => {
        load()
    }, [])

    const handleShowModal = (e) => {
        let parent = findParent(e.currentTarget, "page-wrapper")
        if(!parent) {
            return
        }

        let childModal = findChildren(parent, "modal")
        if(!childModal) {
            return
        }

        childModal.classList.toggle("-active")
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/products"}>Retour</Link>

            {loading && (
                <div className={"page-section"}>
                    <Notification classname={"information"} message={"Loading ..."} />
                </div>
            )}

            {!loading && Object.keys(error).length > 0 && (
                <div className={"page-section"}>
                    <Notification classname={"danger"} message={error.message} />
                </div>
            )}
            
            {!loading && Object.keys(item).length > 0 && (
                <>
                    {item.image.length > 0 && (
                        <div className={"page-product"}>
                            <div className={"product-header"}>
                                <div className={"-product-image"}>
                                    {item.image.length > 0 && (
                                        <ImageSlider images={[item.image]} />
                                    )}
                                </div>
                                <div className={"-product-infos"}>
                                    <h1>{item.name}</h1>
                                    <p>Price : {item.price} €</p>
                                    <p>{item.description}</p>
                                    {/* <button 
                                        type={"button"} 
                                        className={"btn btn-blue -inline-flex"}
                                        onClick={(e) => handleShowModal(e)}
                                    >
                                        <img src={`${window.location.origin}/content/svg/pencil-white.svg`} alt={""} />
                                    </button> */}
                                    <Link to={"/admin/product/" + item.id + "/edit"} className={"btn btn-blue -inline-flex"}>
                                        <img src={`${window.location.origin}/content/svg/pencil-white.svg`} alt={""} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={"page-product"}>
                        <table className={"table"}>
                            <thead></thead>
                            <tbody>
                                {Object.keys(item.characteristics ?? []).length > 0 && item.characteristics.map((characteristic, index) => (
                                    <tr key={index}>
                                        <td className={"-characteristic-label"}>{characteristic.label}</td>
                                        <td className={"-characteristic-description"}>{characteristic.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={"page-product"}>
                        <h2>Comments</h2>

                        <div className={"comments"}>
                            {Object.keys(item.comments ?? []).length > 0 && item.comments.map((comment, index) => (
                                <CommentCard 
                                    key={index} 
                                    comment={comment} 
                                />
                            ))}
                        </div>
                    </div>

                    <Modal>
                        <ProductForm product={item} />
                    </Modal>
                </>
            )}
        </HeaderAdmin>
    )
}