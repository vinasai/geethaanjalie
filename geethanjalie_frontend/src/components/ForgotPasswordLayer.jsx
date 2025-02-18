import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hook/axiosInstance';
import { toast } from 'react-toastify';
import MasterLayout from "../masterLayout/MasterLayout";

// 2/18 -  change Password Component

const ChangePasswordLayer = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Check if user is logged in
    useEffect(() => {
        const studentId = localStorage.getItem('studentId');
        if (!studentId) {
            toast.error('You must be logged in to change your password');
            navigate('/sign-in');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get userId from localStorage
        const userId = localStorage.getItem('studentId');
        
        if (!userId) {
            toast.error('You must be logged in to change your password');
            navigate('/sign-in');
            return;
        }
        
        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }
        
        // Validate password length
        if (formData.newPassword.length < 6) {
            toast.error('New password must be at least 6 characters');
            return;
        }
        
        setLoading(true);
        try {
            // Send request to change password
            const response = await axiosInstance.put('/users/changePassword', {
                userId,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            
            if (response.status === 200) {
                toast.success('Password changed successfully!');
                // Clear form
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Failed to change password';
            toast.error(errorMessage);
            
            // If user not found or unauthorized, redirect to login
            if (error.response?.status === 401 || error.response?.status === 404) {
                localStorage.removeItem('studentId');
                localStorage.removeItem('role');
                navigate('/sign-in');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
      <MasterLayout>
        <section className="bg-base d-flex flex-wrap justify-content-center py-5">
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div>
                        <h4 className="mb-12">Change Your Password</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                            Enter your current password and a new password below
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    placeholder="Current Password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    placeholder="New Password"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    placeholder="Confirm New Password"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                            disabled={loading}
                        >
                            {loading ? 'Changing Password...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
        </MasterLayout>
    );
};

export default ChangePasswordLayer;