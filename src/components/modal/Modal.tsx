import React, { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return(
        <div className="modal-overlay">
      <div className="modal-content">
        <div> My Modal Window</div>
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>

    );
};

export default Modal;