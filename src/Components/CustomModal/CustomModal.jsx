import { Modal } from "react-bootstrap";
import React from "react";
import CloseIcon from "../../assets/Icons/CloseIcon";
import "./CustomModal.css";

const CustomModal = ({ title, showModal, onHide, children, newClass }) => {
    return (
        <Modal
            show={showModal}
            onHide={onHide}
            centered
            dialogClassName="modal-scroll"
            className={newClass}
        >
            {title &&
                <Modal.Header>
                    <Modal.Title className="b-5">{title}</Modal.Title>
                    <button
                        type="button"
                        className="modal-close-btn"
                        aria-label="Close"
                        onClick={onHide}
                    >
                        <CloseIcon />
                    </button>
                </Modal.Header>
            }
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default CustomModal;
