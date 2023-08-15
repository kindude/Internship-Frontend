import { ActionResponse } from "../../types/ActionResponse";
import React, { ReactNode } from "react";





interface ListActionsProps {
    list: ActionResponse[];
    acceptAction?: (request_id: number, company_id: number, user_id: number) => Promise<void>;
    rejectAction?: (request_id: number, company_id: number, user_id: number) => Promise<void>;
    cancelAction?: (request_id: number, company_id: number, user_id: number) => Promise<void>;
    children: (actionId: number, companyId: number, userId: number) => React.ReactNode;
  }
  
  const ListActions: React.FC<ListActionsProps> = ({ list, acceptAction, rejectAction, cancelAction, children }) => {
    return (
      <ul>
        {list.map(action => (
          <li key={action.id}>
            <h1>Company_id</h1><p>{action.company_id}</p>
            <h1>Status</h1><p>{action.status}</p>
            {children(action.id, action.company_id, action.user_id)}
          </li>
        ))}
      </ul>
    );
  };
  
  export default ListActions;