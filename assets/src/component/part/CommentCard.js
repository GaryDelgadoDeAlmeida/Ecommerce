import React from "react";
import StarRating from "./StarRating";

export default function CommentCard({comment}) {

    return (
        <div className={"comment-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}/content/svg/avatar.svg`} alt={""} />
            </div>
            <div className={"-content"}>
                <label className={"username"}>Garry ALMEIDA</label>
                <p className={"message"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <span className={"date"}>13/01/2024</span>
                <StarRating rating={4} />
            </div>
        </div>
    )
}