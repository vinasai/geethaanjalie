import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import axiosInstance from '../../hook/axiosInstance';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormHandler from "react-form-buddy";
import {useGroupStore, useEditGroupStore} from '../../hook/store';

const AddStudent = () => {
    const [studentList, setStudentList] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const groupId = useGroupStore((state) => state.groupId)
    const groupData = useEditGroupStore((state)=> state.group);
    const {
        handleSubmit,
        handleChange,
        values,
        initForm,
        errors,
    } = FormHandler(submitAddStudents);

    function submitAddStudents() {
        setIsSubmit(true);
    }

    console.log(groupData)

    useEffect(() => {
        // Fetch students when the component mounts
        axiosInstance.get(`/users/getUsers`)
            .then(res => {
                console.log(res.data);
                setStudentList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function resetForm() {
        initForm({});
    }



    const handleSave = (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        if (selectedValue.length === 0) {
            alert("Please select at least one student.");
            return;
        }
        setIsSubmit(true); // Trigger the API call via useEffect
    };

    useEffect(() => {
        if (!isSubmit) return;

        if (!groupId) {
            console.error("Group ID is missing.");
            toast.error("Group ID is required to update the group.");
            setIsSubmit(false);
            return;
        }

        const payload = {
            userIds: selectedValue.map(student => student._id),
        };

        axiosInstance.put(`/groups/updateGroup/${groupId}`, payload)
            .then((res) => {
                console.log("Successfully updated:", res.data);
                toast.success("Successfully Updated");
            })
            .catch((err) => {
                console.error("Error updating group:", err);
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsSubmit(false);
                setSelectedValue([]);
            });
    }, [isSubmit]);



    useEffect(()=>{
        if(groupData?.members){
            setSelectedValue(groupData.members)
        }

    },[groupData])

    function onSelect(selectedList) {
        setSelectedValue(selectedList);
    }

    function onRemove(selectedList) {
        setSelectedValue(selectedList);
    }

    console.log(groupData,"adfg")
    console.log()
    console.log(selectedValue,":adfg")

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
                                            <label
                                                htmlFor="depart"
                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                            >
                                                Students
                                                <span className="text-danger-600">*</span>{" "}
                                            </label>
                                            <Multiselect
                                                options={studentList} // Options to display in the dropdown
                                                selectedValues={selectedValue} // Preselected value to persist in dropdown
                                                onSelect={onSelect} // Function will trigger on select event
                                                onRemove={onRemove} // Function will trigger on remove event
                                                displayValue="name" // Property name to display in the dropdown options
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <button
                                                type="button"
                                                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                                onClick={() => setSelectedValue([])}
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
