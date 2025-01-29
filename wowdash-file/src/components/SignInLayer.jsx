import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../hook/axiosInstance';
import { toast } from 'react-toastify';
import signInImage from '../assets/img2.png';

const SignInLayer = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const signIn = () => {
        axiosInstance
            .post('/users/login', values) // Replace with your backend login API endpoint
            .then((res) => {
                console.log(res.data);
                
                
                if (res.data && res.data._id) {
                    localStorage.setItem("studentId", res.data._id);
                    // console.log("Stored Student ID:", res.data._id); // Check if ID is stored
                } else {
                    console.error("User ID is missing in response data");
                }
                
    
                toast.success('Successfully Signed In');
                navigate('/index-2'); // Replace '/dashboard' with your desired route
            })
            .catch((err) => {
                console.log(err.response?.data);
                toast.error(err.response?.data?.message || 'Sign In Failed');
            });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        signIn();
    };

    return (
        <section className="auth bg-base d-flex flex-wrap">
            <div className="auth-left d-lg-block d-none">
                <div className="d-flex align-items-center flex-column h-100 justify-content-center">
                    <img src={signInImage} alt="" />
                </div>
            </div>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div>
                        <Link to="/" className="mb-40 max-w-290-px">
                            <img src="assets/images/logo.png" alt="" />
                        </Link>
                        <h4 className="mb-12">Sign In to your Account</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                            Welcome back! please enter your detail
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="icon-field mb-16">
                            <span className="icon top-50 translate-middle-y">
                                <Icon icon="mage:email" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className="form-control h-56-px bg-neutral-50 radius-12"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between gap-2">
                                <div className="form-check style-check d-flex align-items-center">
                                    <input
                                        className="form-check-input border border-neutral-300"
                                        type="checkbox"
                                        id="remember"
                                    />
                                    <label className="form-check-label" htmlFor="remember">
                                        Remember me{" "}
                                    </label>
                                </div>
                                <Link to="#" className="text-primary-600 fw-medium">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                        >
                            Sign In
                        </button>
                        <div className="mt-32 center-border-horizontal text-center">
                            <span className="bg-base z-1 px-4">Or sign in with</span>
                        </div>
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
                                Don’t have an account?{" "}
                                <Link to="/" className="text-primary-600 fw-semibold">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignInLayer;
