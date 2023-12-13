import axios from "axios";
import React, { useRef } from "react";

export default function PrivateRessource(url, useToken = true) {

    const loading = useRef(false)
    const items = useRef({})
    const error = useRef({})
    
    let headers = {
        "Content-Type": "application/json",
        "Credentials": "same-origin",
        "Accept": "application/json",   
    }
    if(useToken) {
        headers.Authorization = "Bearer " + localStorage.getItem("token")
    }
    
    const load = () => {
        loading.current = true
        
        axios
            .get(url, {
                headers: headers
            })
            .then((response) => {
                items.current = response.data
            })
            .catch((error) => {
                error.current = {
                    status: error.status,
                    message: error.response.data
                }
            })
        ;

        loading.current = false
    }

    return {
        load,
        items,
        loading,
        error
    }
}