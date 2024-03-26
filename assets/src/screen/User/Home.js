import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../component/part/Header";
import Profile from "./parts/Profile";
import BankCoordinate from "./parts/BankCoordinate";
import OngoingOrder from "./parts/OngoingOrder";
import PastOrder from "./parts/PastOrder";
import Setting from "./parts/Setting";
import Comment from "./parts/Comment";

export default function Home() {

    const onglets = [
        {
            value: "profile",
            text: "Profile"
        },
        {
            value: "bank-coordinate",
            text: "Bank coordinate"
        },
        {
            value: "ongoing-orders",
            text: "Ongoing Orders"
        },
        {
            value: "past-orders",
            text: "Past Orders"
        },
        {
            value: "comments",
            text: "Comments"
        },
        {
            value: "settings",
            text: "Settings"
        }
    ]
    const [currentOnglet, setCurrentOnglet] = useState("profile")

    const handleCurrentOnglet = (onglet) => {
        setCurrentOnglet(onglet)
    }

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"-hero"}>
                    <h1 className={"-title"}>Profile</h1>
                    <div className={"site-breadcrumb"}>
                        <Link to={"/user"}>User</Link>
                        <span>/</span>
                        <span>Profile</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"page-profile"}>
                        <div className={"-left"}>
                            <nav>
                                {onglets.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={item.value == currentOnglet ? "-active" : ""} 
                                        onClick={() => handleCurrentOnglet(item.value)}
                                    >{item.text}</li>
                                ))}
                            </nav>
                        </div>
                        <div className={"-right"}>
                            <div className={"card p-15"}>
                                <div className={"-content"}>
                                    {currentOnglet == "profile" && (
                                        <Profile />
                                    )}

                                    {currentOnglet == "bank-coordinate" && (
                                        <BankCoordinate />
                                    )}

                                    {currentOnglet == "ongoing-orders" && (
                                        <OngoingOrder />
                                    )}
                                    
                                    {currentOnglet == "past-orders" && (
                                        <PastOrder />
                                    )}
                                    
                                    {currentOnglet == "comments" && (
                                        <Comment />
                                    )}
                                    
                                    {currentOnglet == "settings" && (
                                        <Setting />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}