import React, { useState } from "react";
import { findParent, findChildren } from "../utils/DomControl";

export default function ImageSlider({images = []}) {

    const [currentImage, setCurrentImage] = useState(images.length > 0 ? images[0] : "")

    const handleSlide = (e) => {
        setCurrentImage(e.currentTarget.src)
    }

    const handleExpandImage = (e) => {
        let parent = findParent(e.currentTarget, "carroussel")
        if(!parent) {
            return
        }

        let child = findChildren(parent, "-expand-image")
        if(!child) {
            return
        }

        child.classList.toggle("-show")
    }

    return (
        <div className={"carroussel"}>
            <div className={"-list"}>
                {images.map((item, index) => (
                    <img key={index} src={item} alt={""} onClick={(e) => handleSlide(e)} />
                ))}
            </div>
            <div className={"-current"}>
                {/* <div className={"-image"}>
                    <img src={currentImage} alt={""} />
                </div> */}
                <img src={currentImage} alt={""} onClick={(e) => handleExpandImage(e)} />
            </div>
            <div className={"-expand-image"} onClick={(e) => handleExpandImage(e)}>
                <img src={currentImage} alt={""} />
            </div>
        </div>
    )
}