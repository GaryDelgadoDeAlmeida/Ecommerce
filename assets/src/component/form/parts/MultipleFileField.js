import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function MultipleFileField({fieldName, updateCredentials, uploadedFilesCredentials = {}}) {

    const [uploadedFiles, setUploadedFiles] = useState({...uploadedFilesCredentials});
    const { getRootProps, getInputProps } = useDropzone({
        // accept: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
        maxFiles: 5,
        // onDrop: (acceptedFiles) => {
        //     uploadFiles(acceptedFiles);
        //     // Call your backend API endpoint to upload files
        //     console.log(acceptedFiles)
        // },
        onDropAccepted: (acceptedFiles) => {
            uploadFiles(acceptedFiles);
            // Call your backend API endpoint to upload files
        },
        onDropRejected: (rejectedFiles) => {
            console.log(rejectedFiles)
            console.log("Files rejected")
        },
    });

    const uploadFiles = (files) => {
        let copyUploadedFiles = Object.values(uploadedFiles)
        files.map((item) => {
            copyUploadedFiles.push(item)
        })
        console.log(
            uploadedFiles, 
            files,
            typeof copyUploadedFiles,
            copyUploadedFiles,
        )
        setUploadedFiles({
            ...uploadedFiles,
            files
        })
    }
    
    useEffect(() => {
        updateCredentials(fieldName, uploadedFiles)
    }, [uploadedFiles])
    
    const handleRemove = (e, file, index) => {
        e.preventDefault()

        // if(file.id) {
        //     axios
        //         .delete(`${window.location.origin}/api/product-preview/${file.id}/remove`)
        //         .then((response) => {})
        //         .catch((error) => {})
        //     ;
        // }

        let files = {...uploadedFiles}
        delete files[index]
        setUploadedFiles({
            ...files
        })
    }

    return (
        <div className={"form-field form-multiple-upload"}>
            <label htmlFor="">Product previews</label>

            <div className={"multiple-upload-zone"} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop files here or click to browse.</p>
            </div>
            
            <div className={"multiple-upload-files"}>
                {Object.keys(uploadedFiles ?? []).length > 0 && (
                    <ul className={"-files-uploaded"}>
                        {Object.values(uploadedFiles).map((file, index) => (
                            <li className={"-file-card"} key={index}>
                                <div className={"-header"}>
                                    <button 
                                        type={"button"}
                                        className={"btn btn-red"} 
                                        onClick={(e) => handleRemove(e, file, index)}
                                    >X</button>
                                </div>
                                <div className={"-content"}>
                                    <img src={`${window.location.origin}${file.path}`} alt={""} />
                                    <span>{file.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}