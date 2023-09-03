import React from "react";
import "../../styles/ListCompanies.css";
import { Notification } from "../../types/NotificationResponse";

interface ListNotificationProps {
  list: Notification[];
}

const ListNotifications: React.FC<ListNotificationProps> = ({ list }) => {

  return (
    <ul className="notification-list">
      {list.map((item) => (
        <li key={item.id} className="notification-item">
          <div>
                <div className="notification-details">
                  {item.text} {item.timestamp}
              </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListNotifications;