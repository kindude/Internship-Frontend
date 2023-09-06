import React from "react";
import "../../styles/ListCompanies.css";
import { Notification } from "../../types/NotificationResponse";
import Button from "./Button";
import axiosInstance from "../../api/api_instance";

interface ListNotificationProps {
  list: Notification[];
}

const ListNotifications: React.FC<ListNotificationProps> = ({ list }) => {

  const update_notification = async (notifd_id:number) => {
    try{
      
      const response = await axiosInstance.put(`/user/notification/${notifd_id}/update`);
      if (response.status == 200){
        window.location.reload();
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <ul className="notification-list">
      {list.map((item) => (
        <li key={item.id} className="notification-item">
          <div>
                <div className="notification-details">
                  {item.text} {item.timestamp}
                  <Button type="button" text="Mark as read" onClick={()=> update_notification(item.id)}/>
              </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListNotifications;