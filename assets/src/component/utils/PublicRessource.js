import axios from "axios";
import React, { useCallback, useRef, useState } from "react";

export default function PublicRessource(url) {
    const [loading, setLoading] = useState(false)
    let 
        items = useRef({}),
        error = useRef({})
    ;
    
    const load = useCallback(async () => {
        setLoading(true)
        
        await axios
            .get(url, {
                headers: {
                    // "Accept": "application/json+ld",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                items.current = response.data
            })
            .catch((responseError) => {
                let 
                    errorMessage = "", 
                    response = responseError.response
                ;
                
                if(response.data.message) {
                    errorMessage = response.data.message
                } else if(response.data.detail) {
                    errorMessage = response.data.detail
                }
                
                error.current = {
                    status: responseError.status ?? 500,
                    message: errorMessage
                }
            })
        ;

        setLoading(false)
    }, [url])

    return {
        load,
        loading,
        items: items.current,
        error: error.current
    }
}