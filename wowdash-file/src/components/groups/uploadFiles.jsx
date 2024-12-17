import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import {supabase} from "../../hook/supabaseClient";

const UploadFiles = () => {

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const [files, setFiles] = useState([]);
    const [fileURLs, setFileURLs] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        console.log(files);
        setFiles((prev) => [...prev, event.target.files[0]]);
        const newFileNames = files.map((file) => file.name);
        setFileNames((prev) => [...prev, ...newFileNames]);
    };

    const removeFileName = (name) => {
        setFileNames((prev) => prev.filter((fileName) => fileName !== name));
        setFiles((prev) => prev.filter((file) => file.name !== name));
    };

    const handleUpload = async () => {
        if (files.length === 0) return alert('Please select files.');

        const uploadedFiles = []; // To store successfully uploaded file URLs

        for (const file of files) {
            const { data, error } = await supabase.storage
                .from('GeethanjalieFileStorage') // Replace with your bucket name
                .upload(`public/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                console.error(`Error uploading ${file.name}:`, error.message);
            } else {
                //https://bhibujpyprblrczhoofa.supabase.co/storage/v1/object/public
                uploadedFiles.push(`https://bhibujpyprblrczhoofa.supabase.co/storage/v1/object/public/GeethanjalieFileStorage/${data.path}`); // Save the uploaded file path
                console.log(`${data.path} uploaded successfully:`, data);
            }
        }

        // Update state after all uploads are done
        console.log(uploadedFiles);
        setFileURLs((prev) => [...prev, ...uploadedFiles]);
        setFileNames([]);
        setFiles([]);

        alert('All files have been uploaded successfully!');
    };



    console.log(files);
    console.log(fileURLs);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <MasterLayout>
            <div className="card h-100 p-0 radius-12">
                <div className="card-body p-24">
                    <div className="row justify-content-center">
                        <div className="col-xxl-6 col-xl-8 col-lg-10">
                            <div className="card border">
                                <div className="card-body">
                                    <h6 className="text-md text-primary-light mb-16">Upload Files</h6>
                                    {/* Upload Image Start */}
                                    <div className="mb-24 mt-16">
                                        <div className="avatar-upload">
                                            {/*<div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">*/}
                                            {/*    <input*/}
                                            {/*        type="file"*/}
                                            {/*        id="imageUpload"*/}
                                            {/*        accept=".png, .jpg, .jpeg"*/}
                                            {/*        hidden*/}
                                            {/*        onChange={handleImageChange}*/}
                                            {/*    />*/}
                                            {/*    <label*/}
                                            {/*        htmlFor="imageUpload"*/}
                                            {/*        className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">*/}
                                            {/*        <Icon icon="solar:camera-outline" className="icon"></Icon>*/}
                                            {/*    </label>*/}
                                            {/*</div>*/}
                                            {/*<div className="avatar-preview">*/}
                                            {/*    <div*/}
                                            {/*        id="imagePreview"*/}
                                            {/*        style={{*/}
                                            {/*            backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : '',*/}

                                            {/*        }}*/}
                                            {/*    >*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    {/* Upload Image End */}
                                    <form action="#">
                                        <div className="card-body p-24">
                                            <label
                                                htmlFor="file-upload-name"
                                                className="mb-16 border border-neutral-600 fw-medium text-secondary-light px-16 py-12 radius-12 d-inline-flex align-items-center gap-2 bg-hover-neutral-200"
                                            >
                                                <Icon icon="solar:upload-linear" className="text-xl"></Icon>
                                                Click to upload
                                                <input
                                                    type="file"
                                                    className="form-control w-auto mt-24 form-control-lg"
                                                    id="file-upload-name"
                                                    multiple
                                                    hidden
                                                    onChange={handleFileChange}
                                                />
                                            </label>

                                            {fileNames.length > 0 && (
                                                <ul id="uploaded-img-names" className="show-uploaded-img-name">
                                                    {fileNames.map((fileName, index) => (
                                                        <li
                                                            key={index}
                                                            className="uploaded-image-name-list text-primary-600 fw-semibold d-flex align-items-center gap-2"
                                                        >
                                                            <Icon
                                                                icon="ph:link-break-light"
                                                                className="text-xl text-secondary-light"
                                                            ></Icon>
                                                            {fileName}
                                                            <Icon
                                                                icon="radix-icons:cross-2"
                                                                className="remove-image text-xl text-secondary-light text-hover-danger-600"
                                                                onClick={() => removeFileName(fileName)}
                                                            ></Icon>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                        </div>
                                        {/*<div className="mb-20">*/}
                                        {/*    <label*/}
                                        {/*        htmlFor="name"*/}
                                        {/*        className="form-label fw-semibold text-primary-light text-sm mb-8"*/}
                                        {/*    >*/}
                                        {/*        Group Name <span className="text-danger-600">*</span>*/}
                                        {/*    </label>*/}
                                        {/*    <input*/}
                                        {/*        type="text"*/}
                                        {/*        className="form-control radius-8"*/}
                                        {/*        id="name"*/}
                                        {/*        placeholder="Enter Full Name"*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        {/*<div className="mb-20">*/}
                                        {/*    <label*/}
                                        {/*        htmlFor="email"*/}
                                        {/*        className="form-label fw-semibold text-primary-light text-sm mb-8"*/}
                                        {/*    >*/}
                                        {/*        Email <span className="text-danger-600">*</span>*/}
                                        {/*    </label>*/}
                                        {/*    <input*/}
                                        {/*        type="email"*/}
                                        {/*        className="form-control radius-8"*/}
                                        {/*        id="email"*/}
                                        {/*        placeholder="Enter email address"*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        {/*<div className="mb-20">*/}
                                        {/*    <label*/}
                                        {/*        htmlFor="number"*/}
                                        {/*        className="form-label fw-semibold text-primary-light text-sm mb-8"*/}
                                        {/*    >*/}
                                        {/*        Schedule time*/}
                                        {/*    </label>*/}
                                        {/*    <input*/}
                                        {/*        type="time"*/}
                                        {/*        className="form-control radius-8"*/}
                                        {/*        id="number"*/}
                                        {/*        placeholder="Enter phone number"*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        {/*<div className="mb-20">*/}
                                        {/*    <label*/}
                                        {/*        htmlFor="depart"*/}
                                        {/*        className="form-label fw-semibold text-primary-light text-sm mb-8"*/}
                                        {/*    >*/}
                                        {/*        Department*/}
                                        {/*        <span className="text-danger-600">*</span>{" "}*/}
                                        {/*    </label>*/}
                                        {/*    <select*/}
                                        {/*        className="form-control radius-8 form-select"*/}
                                        {/*        id="depart"*/}
                                        {/*        defaultValue="Enter Event Title"*/}
                                        {/*    >*/}
                                        {/*        <option value="Enter Event Title" disabled>*/}
                                        {/*            Enter Event Title*/}
                                        {/*        </option>*/}
                                        {/*        <option value="Enter Event Title One">Enter Event Title One</option>*/}
                                        {/*        <option value="Enter Event Title Two">Enter Event Title Two</option>*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                        {/*<div className="mb-20">*/}
                                        {/*    <label*/}
                                        {/*        htmlFor="desig"*/}
                                        {/*        className="form-label fw-semibold text-primary-light text-sm mb-8"*/}
                                        {/*    >*/}
                                        {/*        Designation*/}
                                        {/*        <span className="text-danger-600">*</span>{" "}*/}
                                        {/*    </label>*/}
                                        {/*    <select*/}
                                        {/*        className="form-control radius-8 form-select"*/}
                                        {/*        id="desig"*/}
                                        {/*        defaultValue="Enter Designation Title"*/}
                                        {/*    >*/}
                                        {/*        <option value="Enter Designation Title" disabled>*/}
                                        {/*            Enter Designation Title*/}
                                        {/*        </option>*/}
                                        {/*        <option value="Enter Designation Title One">Enter Designation Title One</option>*/}
                                        {/*        <option value="Enter Designation Title Two">Enter Designation Title Two</option>*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                        {/*<div className="mb-20">*/}
                                        {/*    <label*/}
                                        {/*        htmlFor="desc"*/}
                                        {/*        className="form-label fw-semibold text-primary-light text-sm mb-8"*/}
                                        {/*    >*/}
                                        {/*        Description*/}
                                        {/*    </label>*/}
                                        {/*    <textarea*/}
                                        {/*        name="#0"*/}
                                        {/*        className="form-control radius-8"*/}
                                        {/*        id="desc"*/}
                                        {/*        placeholder="Write description..."*/}
                                        {/*        defaultValue={""}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <button
                                                type="button"
                                                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                                onClick={handleUpload}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>

    );
};

export default UploadFiles;