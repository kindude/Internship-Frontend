import React, { ReactNode } from "react";

type ModalProps = {
    windowName: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({windowName, isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return(
        <div className="modal-overlay">
      <div className="modal-content">
        <div> {windowName}</div>
        {children}
      </div>
    </div>

    );
};

export default Modal;