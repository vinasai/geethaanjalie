import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../hook/axiosInstance";
import PopUp from './PopUp/PopUp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersListLayer = () => {
    const [studentList, setStudentList] = useState([]);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [deleteId, setDeleteId] = useState(null);


    function handleDelete() {
        setShow(false)
    }


    useEffect(() => {
        axiosInstance.get(`/users/getUsers`)
            .then(res => {
                console.log(res.data);
                setStudentList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [update])

    function handleDelete(_id) {
        // setDeleteId(_id);
        axiosInstance
            .delete(`/users/deleteUser/${deleteId}`)
            .then(() => {
                console.log(`User with ID ${deleteId} deleted successfully`);
                toast.success("User Deleted Successfull")
                setDeleteId(null); // Reset deleteId
                setUpdate((prev) => !prev); // Trigger re-fetch of groups
                setShow(false)

            })
            .catch((err) => {
                console.error(`Error deleting user with ID ${deleteId}:`, err);
                toast.error("Something went wrong. Please try again.");
                setDeleteId(null); // Reset deleteId in case of error
            });
    }

    return (
        <>
            <PopUp modalButton={"Delete"} modalContent={"ARE YOU SURE YOU WANT TO DELETE THIS DATA?"} show={show} handleAction={handleDelete} handleClose={handleClose} modalHeading={"Delete User"} />
            <div className="card h-100 p-0 radius-12">
                <div
                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-end gap-3 justify-content-end">
                    {/* <div className="d-flex align-items-center flex-wrap gap-3">
                        <span className="text-md fw-medium text-secondary-light mb-0">Show</span>
                        <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
                            defaultValue="Select Number">
                            <option value="Select Number" disabled>
                                Select Number
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <form className="navbar-search">
                            <input
                                type="text"
                                className="bg-base h-40-px w-auto"
                                name="search"
                                placeholder="Search"
                            />
                            <Icon icon="ion:search-outline" className="icon" />
                        </form>
                        <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
                            defaultValue="Select Status">
                            <option value="Select Status" disabled>
                                Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div> */}
                    <Link
                        to="/add-user"
                        className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                    >
                        <Icon
                            icon="ic:baseline-plus"
                            className="icon text-xl line-height-1"
                        />
                        Add New User
                    </Link>
                </div>
                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table sm-table mb-0">
                            <thead>

                                <tr>
                                    {/*<th scope="col">*/}
                                    {/*    <div className="d-flex align-items-center gap-10">*/}
                                    {/*        <div className="form-check style-check d-flex align-items-center">*/}
                                    {/*            <input*/}
                                    {/*                className="form-check-input radius-4 border input-form-dark"*/}
                                    {/*                type="checkbox"*/}
                                    {/*                name="checkbox"*/}
                                    {/*                id="selectAll"*/}
                                    {/*            />*/}
                                    {/*        </div>*/}
                                    {/*        S.L*/}
                                    {/*    </div>*/}
                                    {/*</th>*/}
                                    <th scope="col">No</th>
                                    {/*<th scope="col">Join Date</th>*/}
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact No</th>
                                    <th scope="col">Date Of Birth</th>
                                    <th scope="col" className="text-center">
                                        Status
                                    </th>
                                    <th scope="col" className="text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                                    <tr key={index + "asd"}>
                                        {/*<th scope="row">{index + 1}</th>*/}
                                        {/*<td>*/}
                                        {/*    <div className="d-flex align-items-center gap-10">*/}
                                        {/*        <div className="form-check style-check d-flex align-items-center">*/}
                                        {/*            <input*/}
                                        {/*                className="form-check-input radius-4 border border-neutral-400"*/}
                                        {/*                type="checkbox"*/}
                                        {/*                name="checkbox"*/}
                                        {/*            />*/}
                                        {/*        </div>*/}
                                        {/*        01*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
                                        <th scope="row">{index + 1}</th>
                                        {/*<td>25 Jan 2024</td>*/}
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {/*<img*/}
                                                {/*    src="assets/images/user-list/user-list1.png"*/}
                                                {/*    alt="Wowdash"*/}
                                                {/*    className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"*/}
                                                {/*/>*/}
                                                <div className="flex-grow-1">
                                                    <span className="text-md mb-0 fw-normal text-secondary-light">
                                                        {data.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {data.email}
                                            </span>
                                        </td>
                                        <td>{data.contactNo}</td>
                                        <td>{data.dateOfBirth}</td>
                                        {data.isEmailVerified === true ? <td className="text-center">
                                            <span
                                                className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white">
                                                Verified
                                            </span>
                                        </td> :
                                            <td className="text-center">
                                                <span
                                                    className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white">
                                                    Not Verified
                                                </span>
                                            </td>}
                                        <td className="text-center">
                                            <div className="d-flex align-items-center gap-10 justify-content-center">
                                                {/* <button
                                                    type="button"
                                                    className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon
                                                        icon="majesticons:eye-line"
                                                        className="icon text-xl"
                                                    />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon icon="lucide:edit" className="menu-icon" />
                                                </button> */}
                                                <button
                                                    type="button"
                                                    className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                    onClick={()=>{
                                                        handleShow()
                                                        setDeleteId(data._id);
                                                    }}
                                                >
                                                    <Icon
                                                        icon="fluent:delete-24-regular"
                                                        className="menu-icon"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                        <span>Showing 1 to 10 of 12 entries</span>
                        <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                                    to="#"
                                >
                                    <Icon icon="ep:d-arrow-left" className="" />
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600 text-white"
                                    to="#"
                                >
                                    1
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                                    to="#"
                                >
                                    2
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    3
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    4
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    5
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                                    to="#"
                                >
                                    {" "}
                                    <Icon icon="ep:d-arrow-right" className="" />{" "}
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </>

    );
};

export default UsersListLayer;