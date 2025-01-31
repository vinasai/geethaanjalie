import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MasterLayout from "../../masterLayout/MasterLayout";
import axiosInstance from '../../hook/axiosInstance';
import HomePageFive from '../../pages/HomePageFive';


const Home = () => {

    const [groupList, setGroupList] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const studentId = localStorage.getItem("studentId");

    console.log("Student ID:", studentId);

    function onDocumentLoadSuccess(numPages) {
        setNumPages(numPages);
    }

    const handleClose = () => {
        setShow(false);
        setSelectedFile(null);
    }

    useEffect(() => {
        axiosInstance.get(`/groups/group`)
            .then(res => {
                console.log("All Groups Data:", res.data);
    
                // Check the structure of the response
                if (!Array.isArray(res.data)) {
                    console.error("Expected an array, but got:", res.data);
                    return;
                }
    
                // Ensure each group has a 'members' array
                res.data.forEach(group => {
                    console.log(`Group: ${group.groupName}`, "Members:", group.members);
                });
    
                // Filter groups where the logged-in student is assigned
                const filteredGroups = res.data.filter(group => 
                    Array.isArray(group.members) && group.members.some(member => member._id === studentId)
                );
                
                
    
                console.log("Filtered Groups:", filteredGroups);
                setGroupList(filteredGroups);
            })
            .catch(err => {
                console.log("API Error:", err);
            });
    }, [studentId]);
     

    return (
        
            <HomePageFive/>
            
       
    )
}

export default Home;