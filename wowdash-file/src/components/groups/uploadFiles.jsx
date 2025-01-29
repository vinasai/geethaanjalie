import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import axiosInstance from '../../hook/axiosInstance';
import { supabase } from "../../hook/supabaseClient";
import Multiselect from 'multiselect-react-dropdown';
import FormHandler from "react-form-buddy";
import { toast } from 'react-toastify';

const UploadFiles = () => {
    const [selectedValue, setSelectedValue] = useState([])
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [files, setFiles] = useState([]);
    const [fileURLs, setFileURLs] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    
    const {
        handleSubmit,
        handleChange,
        values,
        initForm,
        errors,
    } = FormHandler(submitUploadFiles);

    function submitUploadFiles() {
        setIsSubmit(true);
    }


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


    console.log(selectedValue,"selectedValue");
    const handleUpload = async (e) => {
        e.preventDefault();
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
                console.log(error);
                if(error.error === "Duplicate" && error.statusCode === "409"){
                    let datSet ={fileName:file.name,fileUrl:`https://bhibujpyprblrczhoofa.supabase.co/storage/v1/object/public/GeethanjalieFileStorage/public/${file.name}`};
                    uploadedFiles.push(datSet);   
                }
            } else {
                //https://bhibujpyprblrczhoofa.supabase.co/storage/v1/object/public
                console.log(data);
                let datSet ={}
                datSet.fileName = file.name;
                datSet.fileUrl = `https://bhibujpyprblrczhoofa.supabase.co/storage/v1/object/public/GeethanjalieFileStorage/${data.path}`;
                uploadedFiles.push(datSet); 
                console.log(`${data.path} uploaded successfully:`, data);
            }
        }

        // Update state after all uploads are done
        console.log(uploadedFiles,"uploadedFiles");
        setFileURLs((prev) => [...prev, ...uploadedFiles]);
        setFileNames([]);
        setFiles([]);

        onEditGroupFile([...fileURLs, ...uploadedFiles])
    };


    function onEditGroupFile(resources) {
        let groupIds = [...selectedValue];
        console.log(groupIds,"groupIds");
        let payload = {
            groupId: groupIds.map((group) => group._id),
            resources: resources
        }
        axiosInstance.post(`/groups/saveFileGroup`, payload)
        .then((res) => {
            console.log("Successfully updated:", res.data);
            toast.success("Successfully Updated");
        })
        .catch((err) => {
            console.error("Error updating group:", err);
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsSubmit(false);
            setSelectedValue([]);
    });
    }




    console.log(fileURLs);

    function onSelect(selectedList) {
        setSelectedValue(selectedList);
    }

    useEffect(() => {
        // Fetch students when the component mounts
        axiosInstance.get(`/groups/group`)
            .then(res => {
                console.log(res.data);
                setGroupList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function resetForm() {
        initForm({});
    }



    console.log(files);
    console.log(fileURLs);

    return (
        <MasterLayout>
            <div className="card h-100 p-0 radius-12">
                <div className="card-body p-24">
                    <div className="row justify-content-center">
                        <div className="col-xxl-6 col-xl-8 col-lg-10">
                            <div className="card border">
                                <div className="card-body">
                                    <h6 className="text-md text-primary-light mb-16">Upload Files</h6>
                                    <form action="#">

                                        <div className="card-body p-24">
                                            <div className="mb-24 mt-16">
                                                <div className="mb-20">
                                                    <label
                                                        htmlFor="depart"
                                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                    >
                                                        Groups
                                                        <span className="text-danger-600">*</span>{" "}
                                                    </label>
                                                    <Multiselect
                                                        options={groupList} // Options to display in the dropdown
                                                        selectedValues={selectedValue} // Preselected value to persist in dropdown
                                                        onSelect={onSelect} // Function will trigger on select event
                                                        // onRemove={onRemove} // Function will trigger on remove event
                                                        displayValue="groupName" // Property name to display in the dropdown options
                                                    />
                                                </div>
                                            </div>
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