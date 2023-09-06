import React, { ReactNode } from "react";
import "../../styles/modal.css";


type ModalProps = {
    windowName: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ windowName, isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content modal-content-scrollable">
                <div className="modal-header">
                    {windowName}
                    <span className="modal-close" onClick={onClose}>
                        &times;
                    </span>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;