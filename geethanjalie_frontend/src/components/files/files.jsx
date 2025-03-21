import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MasterLayout from "../../masterLayout/MasterLayout";
import axiosInstance from '../../hook/axiosInstance';
import Modal from 'react-bootstrap/Modal';

const Files = () => {
    const [groupList, setGroupList] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const studentId = localStorage.getItem("studentId");

    console.log("Student ID:", studentId);

    useEffect(() => {
        axiosInstance.get(`/groups/group`)
            .then(res => {
                console.log("All Groups Data:", res.data);

                if (!Array.isArray(res.data)) {
                    console.error("Expected an array, but got:", res.data);
                    return;
                }

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

    const handleClose = () => {
        setShow(false);
        setSelectedFile(null);
    }

    return (
        <MasterLayout>
            <div className="mb-40">
                        <h6 className="mb-24">Files</h6>
                        <div className="row gy-4">
                            {groupList.map((data) => (
                                <div key={data._id} className="col-xxl-3 col-sm-6 w-50">
                                    <div className="card h-100 radius-12 shadow-lg">
                                        <div className="card-body p-24 w-full">
                                            <div className="w-64-px h-64-px d-inline-flex align-items-center justify-content-center bg-gradient-primary text-primary-600 mb-16 radius-12">
                                                <Icon icon="iconamoon:file-duotone" className="h5 mb-0" />
                                            </div>
                                            <h6 className="mb-8 font-weight-semibold">Group - {data.groupName}</h6>

                                            {/* Map through resources inside each group */}
                                            <div className="resources-list w-full">
                                                {data.resources && data.resources.length > 0 ? (
                                                    <table className="table table-bordered w-full">
                                                        <thead>
                                                            <tr>
                                                                <th>File Name</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.resources.map((file) => (
                                                                <tr
                                                                    key={file._id}
                                                                    onClick={() => {
                                                                        setSelectedFile(file);
                                                                        setShow(true);
                                                                    }}
                                                                    className="cursor-pointer hover:bg-light"
                                                                >
                                                                    <td>{file.fileName}</td>
                                                                    <td>
                                                                        <Icon icon="iconamoon:arrow-right-2" className="text-xl" />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p>No files available for this group.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

            {/* Modal for displaying selected file */}
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>File Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        {/* Handle video files */}
                        {selectedFile?.fileUrl?.includes("file.mp4") && (
                            <video
                                width="600"
                                className="rounded-lg shadow-lg"
                                controls
                                controlsList="nodownload"
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                <source src={selectedFile?.fileUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}

                        {/* Handle PDF files */}
                        {selectedFile?.fileUrl?.includes(".pdf") && (
                            <div>
                                <iframe
                                    id="pdfIframe"
                                    src={`https://docs.google.com/viewer?url=${selectedFile?.fileUrl}&embedded=true`}
                                    style={{ height: "530px", width: "600px", border: "none" }}
                                    width="600"
                                    height="530"
                                    allow="fullscreen"
                                    title={`file-${selectedFile?._id}`}
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </div>
                        )}

                        {/* Handle other file types like images */}
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
    );
}

export default Files;
