import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MasterLayout from "../../masterLayout/MasterLayout";
import axiosInstance from '../../hook/axiosInstance';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGroupStore, useEditGroupStore } from '../../hook/store';

const AddStudent = () => {
    const [studentList, setStudentList] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    
    const groupId = useGroupStore((state) => state.groupId);
    const navigate = useNavigate();
    const groupData = useEditGroupStore((state) => state.group);

    useEffect(() => {
        axiosInstance.get(`/users/getUsers`)
            .then(res => setStudentList(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (groupData?.members) {
            const formattedMembers = studentList.filter(student =>
                groupData.members.some(member => member._id === student._id)
            );
            setSelectedValue(formattedMembers);
        }
    }, [groupData, studentList]);

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedValue.length === 0) {
            toast.error("Please select at least one student.");
            return;
        }
        setIsSubmit(true);
    };

    useEffect(() => {
        if (!isSubmit) return;

        if (!groupId) {
            toast.error("Group ID is required to update the group.");
            setIsSubmit(false);
            return;
        }

        const payload = {
            userIds: selectedValue.map(student => student._id),
        };

        axiosInstance.put(`/groups/updateGroup/${groupId}`, payload)
            .then(res => {
                toast.success("Successfully Updated");
            })
            .catch(err => {
                console.error("Error updating group:", err);
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsSubmit(false);
                setSelectedValue([]);
                navigate('/group-list'); 
            });
    }, [isSubmit]);

    const handleCancel = () => {
        navigate('/group-list'); 
    };

    return (
        <MasterLayout>
            <div className="card h-100 p-0 radius-12">
                <div className="card-body p-24">
                    <div className="row justify-content-center">
                        <div className="col-xxl-6 col-xl-8 col-lg-10">
                            <div className="card border">
                                <div className="card-body">
                                    <h6 className="text-md text-primary-light mb-16">Assign Student to Group</h6>
                                    <form onSubmit={handleSave}>
                                        <div className="mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                Students<span className="text-danger-600">*</span>
                                            </label>
                                            
                                            <Multiselect
                                                options={studentList} 
                                                selectedValues={selectedValue} 
                                                onSelect={setSelectedValue} 
                                                onRemove={setSelectedValue} 
                                                displayValue="name"
                                            />
                                        </div>
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
        </MasterLayout>
    );
};

export default AddStudent;
