import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../hook/axiosInstance'
import { toast } from 'react-toastify';
import signUpImage from '../assets/img1.png';
import RoleAccessLayer from './RoleAccessLayer';
import signInImage from '../assets/img2.png';

const SignUpLayer = () => {
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
                navigate("/sign-in");
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

    return (
        <section className="auth bg-base d-flex flex-wrap">
            <div className="auth-left d-lg-block d-none">
                <div className="d-flex align-items-center flex-column h-100 justify-content-center round-2">
                    <img src={signInImage} className="w-100 rounded-start pb-2 p-2" alt="" />
                </div>
            </div>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div>
                        <Link to="/" className="mb-40 max-w-290-px">
                        <img src="assets/images/logo/logo.png" alt="" style={{ height: "10vh" }} />

                        </Link>
                        <h4 className="mb-12">Sign Up to your Account</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                            Welcome back! please enter your detail
                        </p>
                    </div>
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
                        <div className="">
                            <div className="form-check style-check d-flex align-items-start">
                                <input
                                    className="form-check-input border border-neutral-300 mt-4"
                                    type="checkbox"
                                    id="condition"
                                    required
                                />
                                <label className="form-check-label text-sm" htmlFor="condition">
                                    By creating an account means you agree to the
                                    <Link
                                        to="#"
                                        className="text-primary-600 fw-semibold"
                                    >
                                        Terms &amp; Conditions
                                    </Link>{" "}
                                    and our
                                    <Link
                                        to="#"
                                        className="text-primary-600 fw-semibold"
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                        >
                            Sign Up
                        </button>
                        {/* <div className="mt-32 center-border-horizontal text-center">
                            <span className="bg-base z-1 px-4">Or sign up with</span>
                        </div> */}
                        {/* <div className="mt-32 d-flex align-items-center gap-3">
                            <button
                                type="button"
                                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                            >
                                <Icon
                                    icon="ic:baseline-facebook"
                                    className="text-primary-600 text-xl line-height-1"
                                />
                                Facebook
                            </button>
                            <button
                                type="button"
                                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                            >
                                <Icon
                                    icon="logos:google-icon"
                                    className="text-primary-600 text-xl line-height-1"
                                />
                                Google
                            </button>
                        </div> */}
                        <div className="mt-32 text-center text-sm">
                            <p className="mb-0">
                                Already have an account?{" "}
                                <Link to="/sign-in" className="text-primary-600 fw-semibold">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUpLayer;
