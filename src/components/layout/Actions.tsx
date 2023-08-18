import { ActionResponse } from "../../types/ActionResponse";
import Modal from "../modal/Modal";
import ListActions from "./ListActions";
import Button from "./Button";
import { ReactNode } from "react";


interface ActionProps {
    list: ActionResponse[];
    children: (actionId: number, companyId: number, userId: number) => ReactNode; 
    text: string;
    isModalOpen: boolean;
    closeModal: () => void;
    cancel?: (request_id: number, company_id: number, user_id: number) => Promise<void>; 
    accept?: (request_id: number, company_id: number, user_id: number) => Promise<void>;
    reject?: (request_id: number, company_id: number, user_id: number) => Promise<void>;  
  }
  
  const Actions: React.FC<ActionProps> = ({ list, children, isModalOpen, closeModal, text, cancel }) => {
    return (
      <>
        {list.length > 0 && (
          <Modal windowName={text} isOpen={isModalOpen} onClose={closeModal}>
            <h2>{text}</h2>
            <ListActions list={list} cancelAction={cancel}>
              {(actionId, companyId, userId) => (
                <div>
                  {children(actionId, companyId, userId)} 
                </div>
              )}
            </ListActions>
            <Button text="Close" type='button' onClick={closeModal} />
          </Modal>
        )}
      </>
    );
  };
  
  export default Actions;