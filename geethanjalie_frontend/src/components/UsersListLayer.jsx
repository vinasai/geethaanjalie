import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../hook/axiosInstance";
import PopUp from './PopUp/PopUp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUserModal from './EditUserModal';

const UsersListLayer = () => {
    const [studentList, setStudentList] = useState([]);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        axiosInstance.get(`/users/getUsers`)
            .then(res => {
                setStudentList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [update]);

    function handleDelete() {
        axiosInstance.delete(`/users/deleteUser/${deleteId}`)
            .then(() => {
                toast.success("User Deleted Successfully");
                setDeleteId(null);
                setUpdate(prev => !prev);
                setShow(false);
            })
            .catch(() => {
                toast.error("Something went wrong. Please try again.");
                setDeleteId(null);
            });
    }

    // Pagination Logic
    const totalPages = Math.ceil(studentList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedUsers = studentList.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <PopUp modalButton={"Delete"} modalContent={"ARE YOU SURE YOU WANT TO DELETE THIS DATA?"} show={show} handleAction={handleDelete} handleClose={() => setShow(false)} modalHeading={"Delete User"} />

            <EditUserModal 
                show={showEditModal}
                handleClose={() => {
                    setShowEditModal(false);
                    setEditUser(null);
                }}
                user={editUser}
                onUpdate={() => setUpdate(prev => !prev)}
            />

            <div className="card h-100 p-0 radius-12">
                <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-end gap-3 justify-content-end">
                    <Link to="/add-user" className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2">
                        <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
                        Add New User
                    </Link>
                </div>
                
                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table sm-table mb-0">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact No</th>
                                    <th>Date Of Birth</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedUsers.map((data, index) => (
                                    <tr key={data._id}>
                                        <th scope="row">{startIndex + index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.contactNo}</td>
                                        <td>{data.dateOfBirth}</td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center gap-10 justify-content-center">
                                                <button type="button" className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                    onClick={() => {
                                                        setShow(true);
                                                        setDeleteId(data._id);
                                                    }}>
                                                    <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                                                </button>

                                                <button type="button" className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                    onClick={() => {
                                                        setEditUser(data);
                                                        setShowEditModal(true);
                                                    }}>
                                                    <Icon icon="lucide:edit" className="menu-icon" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                        <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, studentList.length)} of {studentList.length} entries</span>
                        <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                    <Icon icon="ep:d-arrow-left" />
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className={`page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md ${currentPage === i + 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200'}`}
                                        onClick={() => setCurrentPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                    <Icon icon="ep:d-arrow-right" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersListLayer;
