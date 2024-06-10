import React from "react";
import { findParent } from "../utils/DomControl";

export default function Modal(props) {

    const handleClose = (e) => {
        let parent = findParent(e.currentTarget, "modal")
        if(!parent) {
            return
        }

        parent.classList.toggle("-active")
    }

    return (
        <div className={"modal"}>
            <div className={"modal-wrapper"}>
                <div className={"-header txt-right"}>
                    <img 
                        src={`${window.location.origin}/content/svg/closemark-red.svg`} 
                        alt={"close"} 
                        onClick={(e) => handleClose(e)}
                    />
                </div>
                <div className={"-content"}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}