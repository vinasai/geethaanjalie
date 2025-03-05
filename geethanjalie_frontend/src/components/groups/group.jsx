import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MasterLayout from "../../masterLayout/MasterLayout";
import PopUp from '../PopUp/PopUp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../hook/axiosInstance";
import { useEditGroupStore, useGroupStore } from '../../hook/store';

const Group = () => {
    const [studentList, setStudentList] = useState([]);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);  // Items per page
    const navigate = useNavigate();
    const setGroupId = useGroupStore((state) => state.setGroupId);
    const setGroupData = useEditGroupStore((state) => state.setGroupData);

    const [openDropdown, setOpenDropdown] = useState(null); // State to manage dropdown visibility

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const filteredList = studentList.filter(item => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            item.groupName?.toLowerCase().includes(searchTerm) ||
            item.scheduleTime?.toLowerCase().includes(searchTerm) ||
            (Array.isArray(item.day)
                ? item.day.some(d => d.toLowerCase().includes(searchTerm))
                : item.day?.toString().toLowerCase().includes(searchTerm))
        );
    });

    const handleDelete = () => {
        axiosInstance
            .delete(`/groups/deleteGroup/${deleteId}`)
            .then(() => {
                toast.success("Group Deleted Successfully");
                setDeleteId(null);  // Reset deleteId
                setUpdate((prev) => !prev);  // Trigger re-fetch of groups
                setShow(false);
            })
            .catch((err) => {
                toast.error("Something went wrong. Please try again.");
                setDeleteId(null);  // Reset deleteId in case of error
            });
    };

    const handleNavigate = (groupId) => {
        setGroupId(groupId._id);
        setGroupData(groupId);
        navigate("/add-student");
    };

    const handleEditNavigate = (group) => {
        setGroupData(group);
        navigate("/edit-group");
    };

    const handleFileUpload = () => {
        navigate("/upload-files");
    };

    const toggleDropdown = (groupId) => {
        // Toggle the visibility of the dropdown for the clicked group
        setOpenDropdown(openDropdown === groupId ? null : groupId);
    };

    useEffect(() => {
        // Fetch both the groups and student count data
        const fetchData = async () => {
            try {
                const [groupsResponse, studentCountResponse] = await Promise.all([
                    axiosInstance.get(`/groups/group`),  // Fetch groups data
                    axiosInstance.get(`/groups/groupStudentCount`),  // Fetch student count data
                ]);
                
                // Combine both responses (assuming they have the same length and order)
                const combinedData = groupsResponse.data.map((group, index) => ({
                    ...group,
                    studentCount: studentCountResponse.data[index]?.studentCount || 0, // Merge studentCount
                }));
                
                setStudentList(combinedData); // Set the combined data to the state
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch groups or student count data.");
            }
        };

        fetchData();  // Call the fetch function
    }, [update]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredList.length / itemsPerPage); // Calculate total pages
    const currentItems = filteredList.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    ); // Get current page items

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <MasterLayout>
            <PopUp handleClose={handleClose} show={show} handleAction={handleDelete} modalHeading={"Delete Group"} modalContent={"ARE YOU SURE YOU WANT TO DELETE THIS DATA?"} modalButton={"Delete"} />
            <h6>Groups</h6>

            <div className="card h-100 p-0 radius-12">
                <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                    <button
                        type="button"
                        className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        onClick={handleFileUpload}
                    >
                        <Icon icon="lucide:upload" className="icon text-xl" />
                    </button>

                    <Link
                        to="/add-group"
                        className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                    >
                        <Icon
                            icon="ic:baseline-plus"
                            className="icon text-xl line-height-1"
                        />
                        Add Group
                    </Link>
                </div>
                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table sm-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Group Name</th>
                                    <th scope="col">Schedule Time</th>
                                    <th scope="col">Day</th>
                                    <th scope="col">No of Students</th> {/* Added this column */}
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((data, index) => (
                                    <React.Fragment key={data._id}>
                                        <tr>
                                            <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                            <td>{data.groupName}</td>
                                            <td>{data.scheduleTime}</td>
                                            <td>{data.day}</td>
                                            <td>{data.studentCount}</td>
                                            <td className="text-center">
                                                <div className="d-flex align-items-center gap-10 justify-content-center">
                                                    <button
                                                        type="button"
                                                        className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                        onClick={() => handleEditNavigate(data)}
                                                    >
                                                        <Icon icon="lucide:edit" className="menu-icon" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                        onClick={() => {
                                                            handleShow();
                                                            setDeleteId(data._id);
                                                        }}
                                                    >
                                                        <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                        onClick={() => handleNavigate(data)}
                                                    >
                                                        <Icon icon="majesticons:plus" className="icon text-xl" />
                                                    </button>
                                                    {/* Dropdown button */}
                                                    <button
                                                        type="button"
                                                        className="bg-primary-focus text-primary-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                        onClick={() => toggleDropdown(data._id)}
                                                    >
                                                        <Icon icon="lucide:chevron-down" className="menu-icon" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Dropdown row for students */}
                                        {openDropdown === data._id && (
                                    <tr className="bg-base"> {/* Use the same background color as the table */}
                                        <td colSpan="6" className="p-0">
                                            <table className="table w-full text-sm border-t">
                                                <thead className="bg-secondary-light"> {/* Match table header color */}
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-gray-700">Student Name</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.members.map((member) => (
                                                        <tr key={member._id} className="border-t bg-base">
                                                            <td className="px-4 py-2 text-gray-900">{member.name}</td>
                                                            <td></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                                    </React.Fragment>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                        <span>Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredList.length)} of {filteredList.length} entries</span>
                        <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                                    to="#"
                                    onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                                >
                                    <Icon icon="ep:d-arrow-left" className="" />
                                </Link>
                            </li>
                            {[...Array(totalPages)].map((_, pageIndex) => (
                                <li key={pageIndex} className="page-item">
                                    <Link
                                        className={`page-link ${currentPage === pageIndex + 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-secondary-light'} fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md`}
                                        to="#"
                                        onClick={() => handlePageChange(pageIndex + 1)}
                                    >
                                        {pageIndex + 1}
                                    </Link>
                                </li>
                            ))}
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                                    to="#"
                                    onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                >
                                    <Icon icon="ep:d-arrow-right" className="" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default Group;
