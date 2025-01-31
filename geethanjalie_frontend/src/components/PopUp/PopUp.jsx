import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const PopUp = ({handleClose,show,handleAction,modalHeading,modalContent,modalButton}) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
    return (
      <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAction}>
            {modalButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default PopUp;
