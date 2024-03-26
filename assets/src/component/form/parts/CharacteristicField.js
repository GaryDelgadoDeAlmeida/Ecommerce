import React, { useEffect, useRef, useState } from "react";
import { findParent } from "../../utils/DomControl";

export default function CharacteristicField({updateCredentials, characteristicsCredential = {}}) {

    const rowCounter = useRef(0)
    const [characteristics, setCharacteristics] = useState({...characteristicsCredential})
    const characteristicsKeys = Object.keys(characteristics)

    useEffect(() => {
        if(updateCredentials != null) {
            updateCredentials("characteristics", characteristics)
        }
    }, [characteristics])

    const handleNewRow = () => {
        setCharacteristics({
            ...characteristics,
            [rowCounter.current]: {
                label: "",
                description: ""
            }
        })
        
        rowCounter.current += 1

    }

    const handleChange = (e, fieldName) => {
        const parent = findParent(e.currentTarget, "card")
        if(!parent) {
            return
        }

        setCharacteristics({
            ...characteristics,
            [parent.id]: {
                ...characteristics[parent.id],
                [fieldName]: e.currentTarget.value
            }
        })
    }

    const handleRemove = (e) => {
        const parent = findParent(e.currentTarget, "card")
        const id = parent.id

        const arrayCharacteristics = {...characteristics}
        delete arrayCharacteristics[parent.id]
        setCharacteristics({
            ...arrayCharacteristics
        })
    }

    return (
        <div className={"form-field"}>
            <label>Characteristics</label>
            
            <div className={"p-b-15 d-col"}>
                {Object.values(characteristics).map((item, index) => (
                    <div id={characteristicsKeys[index]} key={index} className={"card"}>
                        <div className={"-content"}>
                            <div className={"form-field"}>
                                <input 
                                    type={"text"} 
                                    value={item.label} 
                                    placeholder={"Label"}
                                    onChange={(e) => handleChange(e, "label")}
                                    required
                                />
                            </div>
                            
                            <div className={"form-field"}>
                                <textarea 
                                    value={item.description} 
                                    placeholder={"Description"}
                                    onChange={(e) => handleChange(e, "description")}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className={"-footer txt-right"}>
                            <button 
                                type={"button"} 
                                className={"btn btn-red"}
                                onClick={(e) => handleRemove(e)}
                            >&minus;</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <button type={"button"} className={"btn btn-blue"} onClick={() => handleNewRow()}>+</button>
        </div>
    )
}