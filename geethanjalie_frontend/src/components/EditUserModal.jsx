import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axiosInstance from '../hook/axiosInstance';
import { Icon } from '@iconify/react/dist/iconify.js';

const EditUserModal = ({ show, handleClose, user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        dateOfBirth: '',
        password:''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                contactNo: user.contactNo || '',
                dateOfBirth: user.dateOfBirth || '',
                password: user.password || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/users/updateUser/${user._id}`, formData);
            toast.success('User updated successfully');
            onUpdate();
            handleClose();
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="fade" centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-2xl fw-bold text-center w-100 py-3 border-bottom">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">

                <div className="icon-field mb-16">
                                                                         <span className="icon top-50 translate-middle-y">
                                                                             <Icon icon="f7:person" />
                                                                         </span>
                                                                         <input
                                                                             type="text"
                                                                             name="name"
                                                                             value={formData.name}
                                                                             onChange={handleChange}
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
                                                                             value={formData.email}
                                                                             onChange={handleChange}
                                                                             className="form-control h-56-px bg-neutral-50 radius-12"
                                                                             placeholder="Email"
                                                                             required
                                                                         />
                                                                     </div>
                                                             
                                                                     <div className="icon-field mb-16">
                                                                         <span className="icon top-50 translate-middle-y">
                                                                             <Icon icon="mage:email" />
                                                                         </span>
                                                                         <input
                                                                             type="text"
                                                                             name="contactNo"
                                                                             value={formData.contactNo}
                                                                             onChange={handleChange}
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
                                                                             value={formData.dateOfBirth}
                                                                             onChange={handleChange}
                                                                             className="form-control h-56-px bg-neutral-50 radius-12"
                                                                             placeholder="Date Of Birth"
                                                                             required
                                                                         />
                                                                     </div>
                    <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                        >
                            Update
                        </button>
                       
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditUserModal;