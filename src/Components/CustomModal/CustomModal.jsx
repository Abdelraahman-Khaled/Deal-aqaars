import { Modal } from "react-bootstrap";
import React from "react";
import CloseIcon from "../../assets/Icons/CloseIcon";
import "./CustomModal.css";
import SendIcon from "../../assets/Icons/SendIcon";

const CustomModal = ({ title, showModal, onHide, children, newClass, subtitle = null }) => {
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
                    <div className="d-flex justify-content-between align-items-center space-3">

                        {subtitle &&
                            <div className="send-icon">
                                <SendIcon />
                            </div>
                        }
                        <div className="px-2">
                            <Modal.Title className="b-10 py-1">{title}</Modal.Title>
                            {
                                subtitle &&
                                <p className="b-16" style={{ color: "var(--netural-800)" }}>{subtitle}</p>
                            }
                        </div>
                    </div>
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
