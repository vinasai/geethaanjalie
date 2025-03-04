import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import FormHandler from "react-form-buddy";
import axiosInstance from '../../hook/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import { Multiselect } from 'multiselect-react-dropdown';

const AddGroup = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const navigate = useNavigate();
    const [selectedDays, setSelectedDays] = useState([]);

    const onSelect = (selectedList) => {
        setSelectedDays(selectedList.map(item => item.day)); 
    };

    const onRemove = (selectedList) => {
        setSelectedDays(selectedList.map(item => item.day));
    };

    const validate = (values) => {
        let errors = {};

        if (selectedDays.length === 0) { 
            errors.day = "Day is required";
        }
        if (!values.groupName) {
            errors.groupName = "Group Name is required";
        }
        if (!values.scheduleTime) {
            errors.scheduleTime = "Schedule Time is required";
        }

        return errors;
    };

    const { handleSubmit, handleChange, values, errors } = FormHandler(submitAddGroup, validate);

    async function submitAddGroup() {
        if (selectedDays.length === 0) {
            toast.error("Please select at least one day.");
            return;
        }

        const formData = {
            ...values,
            day: selectedDays, 
        };

        try {
            const res = await axiosInstance.post(`/groups/group`, formData);
            console.log("Group added successfully: ", res.data);
            toast.success("Group added successfully!");
            navigate('/group-list');
        } catch (err) {
            console.error("Error adding group: ", err);
            toast.error("Something went wrong. Please try again.");
        }
    }

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
        navigate('/group-list'); 
    };

    const dayOptions = [
        { id: 1, day: "Monday" },
        { id: 2, day: "Tuesday" },
        { id: 3, day: "Wednesday" },
        { id: 4, day: "Thursday" },
        { id: 5, day: "Friday" },
        { id: 6, day: "Saturday" },
        { id: 7, day: "Sunday" }
    ];

    return (
        <MasterLayout>
            <div className="card h-100 p-0 radius-12">
                <div className="card-body p-24">
                    <div className="row justify-content-center">
                        <div className="col-xxl-6 col-xl-8 col-lg-10">
                            <div className="card border">
                                <div className="card-body">
                                    <h6 className="text-2xl fw-bold text-center w-100 py-3 border-bottom">Add Group Details</h6>
                                    {/* Upload Image 
                                    <div className="mb-24 mt-16">
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
                                    </div>
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
                                                Schedule Time <span className="text-danger-600">*</span>
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

                                        {/* Multiselect for Days */}
                                        <div className="mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                Select Days <span className="text-danger-600">*</span>
                                            </label>
                                            <Multiselect
                                                options={dayOptions} 
                                                selectedValues={dayOptions.filter(item => selectedDays.includes(item.day))}
                                                onSelect={onSelect}
                                                onRemove={onRemove}
                                                displayValue="day"
                                            />
                                            {errors.day && <p className="text-danger">{errors.day}</p>}
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

export default AddGroup;
