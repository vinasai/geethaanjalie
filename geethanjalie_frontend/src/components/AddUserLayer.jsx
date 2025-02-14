import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import FormHandler from "react-form-buddy";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hook/axiosInstance';

const AddUserLayer = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const isRegister = () => {
        axiosInstance.post("/users/register", values)
            .then(res => {
                console.log(res.data);
                toast.success("Successfully Registered");

                 
            setValues({
               name: '',
                email: '',
                password: '',
                contactNo: '',
                dateOfBirth: '',
            });
                
            })
            .catch(err => {
                console.log(err.response.data);
                toast.error(err.response?.data?.message || "Registration failed");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.password.length < 8) {
            toast.error("Password must have at least 8 characters");
            return;
        }
        isRegister();
    };


    const handleCancel = () => {
        navigate('/users-list'); // Navigate to the "Groups" page
    };


    return (
        <>
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                {/* <h6 className="text-md text-primary-light mb-16">Profile Image</h6> */}
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
                                                className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">
                                                <Icon icon="solar:camera-outline" className="icon"></Icon>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : '',

                                                }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* Upload Image End */}
                         <form onSubmit={handleSubmit}>
                                                 <div className="icon-field mb-16">
                                                     <span className="icon top-50 translate-middle-y">
                                                         <Icon icon="f7:person" />
                                                     </span>
                                                     <input
                                                         type="text"
                                                         name="name"
                                                         value={values.name}
                                                         onChange={handleInputChange}
                                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                                         placeholder="Name"
                                                         required
                                                     />
                                                 </div>
                                                 <div className="icon-field mb-16">
                                                     <span className="icon top-50 translate-middle-y">
                                                         <Icon icon="mage:email" />
                                                     </span>
                                                     <input
                                                         type="email"
                                                         name="email"
                                                         value={values.email}
                                                         onChange={handleInputChange}
                                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                                         placeholder="Email"
                                                         required
                                                     />
                                                 </div>
                                                 <div className="mb-20">
                                                     <div className="position-relative">
                                                         <div className="icon-field">
                                                             <span className="icon top-50 translate-middle-y">
                                                                 <Icon icon="solar:lock-password-outline" />
                                                             </span>
                                                             <input
                                                                 type="password"
                                                                 name="password"
                                                                 value={values.password}
                                                                 onChange={handleInputChange}
                                                                 className="form-control h-56-px bg-neutral-50 radius-12"
                                                                 id="your-password"
                                                                 placeholder="Password"
                                                                 required
                                                             />
                                                         </div>
                                                         {/* <span className="mt-12 text-sm text-secondary-light">
                                                             Your password must have at least 8 characters
                                                         </span> */}
                                                     </div>
                                                 </div>
                                                 <div className="icon-field mb-16">
                                                     <span className="icon top-50 translate-middle-y">
                                                         <Icon icon="mage:email" />
                                                     </span>
                                                     <input
                                                         type="text"
                                                         name="contactNo"
                                                         value={values.contactNo}
                                                         onChange={handleInputChange}
                                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                                         placeholder="Contact No"
                                                         required
                                                     />
                                                 </div>
                                                 <div className="icon-field mb-16">
                                                     <span className="icon top-50 translate-middle-y">
                                                         <Icon icon="mage:email" />
                                                     </span>
                                                     <input
                                                         type="date"
                                                         name="dateOfBirth"
                                                         value={values.dateOfBirth}
                                                         onChange={handleInputChange}
                                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                                         placeholder="Date Of Birth"
                                                         required
                                                     />
                                                 </div>
                                    {/*<div className="mb-20">*/}
                                    {/*    <label*/}
                                    {/*        htmlFor="depart"*/}
                                    {/*        className="form-label fw-semibold text-primary-light text-sm mb-8"*/}
                                    {/*    >*/}
                                    {/*        Date Of Birth*/}
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
                                    {/*        <option value="Enter Designation Title One">Enter Designation Title One*/}
                                    {/*        </option>*/}
                                    {/*        <option value="Enter Designation Title Two">Enter Designation Title Two*/}
                                    {/*        </option>*/}
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
                                           onClick={handleCancel}
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
        </>

    );
};

export default AddUserLayer;