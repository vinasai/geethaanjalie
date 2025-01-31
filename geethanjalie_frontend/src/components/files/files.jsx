import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MasterLayout from "../../masterLayout/MasterLayout";
import axiosInstance from '../../hook/axiosInstance';
import Modal from 'react-bootstrap/Modal';


const Files = () => {

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
        <MasterLayout>
            <div className="mb-40">
                <h6 className="mb-24">Files </h6>
                <div className="row gy-4">
                    {groupList.map((data) => <div key={data._id} className="col-xxl-3 col-sm-6">
                        <div className="card h-100 radius-12">
                            <div className="card-body p-24">
                            <div className="w-64-px h-64-px d-inline-flex align-items-center justify-content-center bg-gradient-primary text-primary-600 mb-16 radius-12">
                                    <Icon icon="iconamoon:file-duotone" className="h5 mb-0" />
                                </div>
                                <h6 className="mb-8">{data.groupName}</h6>
                                
                                {data.resources.map((file) => <div key={file._id}
                                    onClick={() => {

                                        setSelectedFile(file);
                                        setShow(true)
                                    }}
                                    to={file.fileUrl}
                                    className="btn text-primary-600 hover-text-primary px-0 py-10 d-inline-flex align-items-center gap-2"
                                >
                                    {file.fileName}{" "}


                                    <Icon
                                        icon="iconamoon:arrow-right-2"
                                        className="text-xl"
                                    />

                                    <div>

                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>)}
                    {/* <div className="col-xxl-3 col-sm-6">
                        <div className="card h-100 radius-12 text-center">
                            <div className="card-body p-24">
                                <div className="w-64-px h-64-px d-inline-flex align-items-center justify-content-center bg-gradient-primary text-primary-600 mb-16 radius-12">
                                    <Icon icon="iconamoon:file-duotone" className="h5 mb-0" />
                                </div>
                                <h6 className="mb-8">UI/UX Designer</h6>
                                <p className="card-text mb-8 text-secondary-light">
                                    Random Text gateway to the Origin al the Works Platform, &amp;
                                    your unique block chain gateway identity.
                                </p>
                                <Link
                                    to="#"
                                    className="btn text-primary-600 hover-text-primary px-0 py-10 d-inline-flex align-items-center gap-2"
                                >
                                    Read More{" "}
                                    <Icon
                                        icon="iconamoon:arrow-right-2"
                                        className="text-xl"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>
                        {selectedFile?.fileUrl?.includes(".mp4") &&
                            <video
                                width="600"
                                className="rounded-lg shadow-lg"
                                controls
                                controlsList="nodownload"
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                <source
                                    src={selectedFile?.fileUrl}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>}

                        {selectedFile?.fileUrl?.includes(".pdf") &&
                            <iframe
                            src={`https://docs.google.com/viewer?url=${selectedFile?.fileUrl}&embedded=true`}
                            style={{ height: "530px", width: "600px", border: "none" }}
                            width="600"
                            height="530"
                            allow="fullscreen"
                            title={`file-${selectedFile?._id}`}
                       />
                        }


                        {!selectedFile?.fileUrl?.match(/\.(mp4|pdf)$/i) && (
                            <img
                                src={selectedFile?.fileUrl}
                                alt="file"
                                className="rounded-lg shadow-lg"
                                width="600"
                            />
                        )}


                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </MasterLayout>
    )
}

export default Files;