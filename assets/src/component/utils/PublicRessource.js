import axios from "axios";
import React, { useCallback, useRef } from "react";

export default function PublicRessource(url) {
    const loading = useRef(false)
    const items = useRef({})
    const error = useRef({})
    
    const load = useCallback(() => {
        loading.current = true
        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                items.current = response.data
            })
            .catch((error) => {
                let 
                    errorMessage = "", 
                    response = error.response
                ;
                if(typeof response.data == "string") {
                    errorMessage = response.data
                } else if(typeof response.data == "object") {
                    errorMessage = response.data.detail
                }
                
                error.current = {
                    status: error.status ?? 500,
                    message: errorMessage
                }
            })
        ;

        loading.current = false
    }, [url])

    return {
        load,
        items,
        loading,
        error
    }
}