import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hook/axiosInstance';

const AddUserLayer = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        contactNo: '',
        dateOfBirth: '',
    });
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Prevent selecting future dates for dateOfBirth
        if (name === "dateOfBirth") {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Remove time for accurate comparison

            if (selectedDate > today) {
                toast.error("Date of Birth cannot be a future date");
                return;
            }
        }

        setValues({ ...values, [name]: value });
    };

    const isRegister = () => {
        axiosInstance.post("/users/register", values)
            .then(res => {
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
        navigate('/users-list');
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
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
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="icon-field mb-16">
                                        <span className="icon top-50 translate-middle-y">
                                            <Icon icon="solar:phone-outline" />
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
                                    <div className="icon-field mb-16 position-relative">
    <span className="icon top-50 translate-middle-y">
        <Icon icon="solar:calendar-outline" />
    </span>
    <input
        type="date"
        name="dateOfBirth"
        value={values.dateOfBirth}
        onChange={handleInputChange}
        className="form-control h-56-px bg-neutral-50 radius-12"
        required
    />
    <small className="text-muted position-absolute" style={{ top: "100%", left: "10px" }}>
        Select Date of Birth
    </small>
</div>

                                    
                                    <div className="d-flex align-items-center justify-content-center gap-3 py-10" > 
                                        <button
                                            type="button"
                                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8 "
                                           
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
    );
};

export default AddUserLayer;
