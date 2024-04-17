import React from "react";

export default function StarRating({rating}) {

    const generateStarRating = () => {
        let $html = []
        let imgPath = ""

        for (let index = 0; index < 5; index++) {
            if(index < rating) {
                imgPath = "/content/svg/star-orange.svg"
            } else {
                imgPath = "/content/svg/star.svg"
            }

            $html.push(
                <img key={index} src={`${window.location.origin}${imgPath}`} alt={""} />
            )
        }

        return $html
    }

    return (
        <div className={"rating"}>
            {generateStarRating()}
        </div>
    )
}