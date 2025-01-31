import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import FormHandler from "react-form-buddy";
import axiosInstance from '../../hook/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {useEditGroupStore, useGroupStore} from '../../hook/store';
import UploadWithImagePreviewList from '../child/UploadWithImagePreviewList';
import { supabase } from '../../hook/supabaseClient';

const EditGroup = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate
    const [isSubmit, setIsSubmit] = useState(false);
    const [files, setFiles] = useState([]);
    const groupId = useGroupStore((state) => state.groupId)
    const groupData = useEditGroupStore((state)=> state.group);
    const [fileURLs, setFileURLs] = useState([]);

    console.log("groupData",groupData);
    console.log(groupData)
    

    

    const validate = (values) => {
        let errors = {};
        if (!values.groupName) {
            errors.groupName = "Group Name is required";
        }
        if (!values.scheduleTime) {
            errors.scheduleTime = "Schedule Time is required";
        }
        return errors;
    };

    const {
        handleSubmit,
        handleChange,
        initForm,
        values,
        errors,
    } = FormHandler(submitEditGroup, validate);

    async function submitEditGroup() {
        if (files.length === 0){
            setFormSubmitted(true);
        }
        else{
            await handleUpload()
        }
        
        // setFormSubmitted(true);
    }

    console.log();
    

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

    const handleCancel = () => {
        navigate('/group-list'); // Navigate to the "Groups" page
    };


    useEffect(()=>{
        if(!groupData){
            return
        }
        initForm(groupData)

    },[groupData])


    console.log(fileURLs,fileURLs)
    useEffect(() => {
        if (!formSubmitted) return;

        // if (!groupId) {
        //     console.error("Group ID is missing.");
        //     toast.error("Group ID is required to update the group.");
        //     setIsSubmit(false);
        //     return;
        // }
        axiosInstance.put(`/groups/updateGroup/${groupData._id}`, values)
            .then((res) => {
                console.log("Successfully updated:", res.data);
                toast.success("Successfully Updated");
            })
            .catch((err) => {
                console.error("Error updating group:", err);
                toast.error("Something went wrong");
            })
            .finally(() => {
                setFormSubmitted(false);
               
            });
    }, [formSubmitted]);

    const handleUpload = async () => {
            // if (files.length === 0) return alert('Please select files.');
    
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
            setFormSubmitted(true);

        }
    

    return (
        <MasterLayout>
            <ToastContainer />
            <div className="card h-100 p-0 radius-12">
                <div className="card-body p-24">
                    <div className="row justify-content-center">
                        <div className="col-xxl-6 col-xl-8 col-lg-10">
                            <div className="card border">
                                <div className="card-body">
                                    <h6 className="text-md text-primary-light mb-16">Edit Group Details</h6>
                                    {/* Upload Image Start */}
                                    {/* <div className="mb-24 mt-16">
                                        <div className="avatar-upload">
                                            <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                                <input
                                                    type="file"
                                                    id="imageUpload"
                                                    accept=".png, .jpg, .jpeg"
                                                    hidden
                                                    onChange={handleImageChange}
                                                />
                                                <label
                                                    htmlFor="imageUpload"
                                                    className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                                                >
                                                    <Icon icon="solar:camera-outline" className="icon"></Icon>
                                                </label>
                                            </div>
                                            <div className="avatar-preview">
                                                <div
                                                    id="imagePreview"
                                                    style={{
                                                        backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : '',
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* Upload Image End */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-20">
                                            <label
                                                htmlFor="name"
                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                            >
                                                Group Name <span className="text-danger-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control radius-8"
                                                id="name"
                                                onChange={handleChange}
                                                name="groupName"
                                                placeholder="Enter Group Name"
                                                value={values.groupName || ""}
                                            />
                                            {errors.groupName && <p className="text-danger">{errors.groupName}</p>}
                                        </div>
                                        <div className="mb-20">
                                            <label
                                                htmlFor="time"
                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                            >
                                                Schedule Time
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control radius-8"
                                                id="time"
                                                name="scheduleTime"
                                                onChange={handleChange}
                                                placeholder="Enter Schedule Time"
                                                value={values.scheduleTime || ""}
                                            />
                                            {errors.scheduleTime && <p className="text-danger">{errors.scheduleTime}</p>}
                                        </div>
                                        <div className='my-5 row'>
                                            <div className='col-md-12'>

                                        <UploadWithImagePreviewList files={files} setFiles={setFiles}/>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                            >
                                                Save
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

export default EditGroup;
