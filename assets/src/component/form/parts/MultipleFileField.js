import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function MultipleFileField({fieldName, updateCredentials, uploadedFilesCredentials = {}}) {

    const [uploadedFiles, setUploadedFiles] = useState(uploadedFilesCredentials.length > 0 ? [{...uploadedFilesCredentials}] : []);
    const { getRootProps, getInputProps } = useDropzone({
        accept: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
        maxFiles: 5,
        onDrop: (acceptedFiles) => {
            console.log(uploadedFiles)
            uploadFiles(acceptedFiles);
            // Call your backend API endpoint to upload files
        },
        onDropRejected: (rejectedFiles) => {
            console.log(rejectedFiles)
            console.log("Files rejected")
        }
    });

    const uploadFiles = (files) => {
        setUploadedFiles(files)
    }
    
    useEffect(() => {
        updateCredentials(fieldName, uploadedFiles)
    }, [uploadedFiles])

    console.log(uploadedFiles, uploadedFiles.length)

    return (
        <div className={"form-multiple-upload"} {...getRootProps()}>
            <div className={"multiple-upload-wrapper"}>
                <input {...getInputProps()} />
                <p>Drag and drop files here or click to browse.</p>
                {uploadedFiles.length > 0 && (
                    <ul>
                        {uploadedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}