import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../types/types";
import "../../styles/ListUsers.css";
import Button from "./Button";
import axiosInstance from "../../api/api_instance";
import { useState } from "react";
import { Company } from "../../types/CompanyResponse";
import Modal from "../modal/Modal";
import ListCompanies from "./ListCompanies";
import { User } from "../../types/UserResponse";
import { ReactNode } from "react";
import { remove_member, makeAdmin, removeAdmin } from "../../pages/CompanyMembers";
import { useNavigate } from "react-router-dom";
import { CompanyUserLastCompletion } from "../../types/CompanyUserLastCompletion";

interface ListUserItem {
  id: number;
  username: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  status: boolean;
  roles: string[];
}

interface ListUsersProps {
  list: ListUserItem[];
  show: boolean;
  companyId: number;
  onRemove?: (userId: number) => void;
  admin: boolean;
}

const ListUsers: React.FC<ListUsersProps> = ({ list, show, companyId, onRemove, admin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [lastCompletionTime, setLastCompletionTime] = useState<string | null>(null);
  const [lastCompletionTimes, setLastCompletionTimes] = useState<{ [userId: number]: string | null }>({});

  const fetchLastCompletionTime = async (company_id: number, userId: number) => {
    try {
      const response = await axiosInstance.get(`/company/${company_id}/get-last-time`);
      if (response.status === 200) {
        const lastTime = response.data.last_completions.find((item: CompanyUserLastCompletion) => item.user_id === userId)?.last_completion_time;
        setLastCompletionTimes((prevTimes) => ({
          ...prevTimes,
          [userId]: lastTime || "N/A",
        }));
      }
    } catch (error) {
      console.error("Error fetching last completion time:", error);
    }
  };
  
  // Вызывайте функцию fetchLastCompletionTime в useEffect с передачей companyId и userId
  useEffect(() => {
    list.forEach((userItem) => {
      fetchLastCompletionTime(companyId, userItem.id);
    });
  }, [list, companyId]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();


  const closeModal = () => {
    setIsModalOpen(false);
  };



  const currentUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const onInviteClick = async (item: ListUserItem) => {
    try {
      const token = localStorage.getItem("accessToken");
      const companiesResponse = await axiosInstance.get("/companies/my/companies");
      console.log(companiesResponse.data.companies);
      if (companiesResponse.status === 200) {
        setCompanies(companiesResponse.data.companies);
        setSelectedCompany(null);
        setSelectedUser(item as User);
        openModal();
      }
    } catch (error) {

    }
  };

  const createInvite = async () => {
    if (selectedCompany && selectedUser) {
      try {
        const token = localStorage.getItem("accessToken");
        const requestPayload = {
          company_id: selectedCompany.id,
          user_id: selectedUser.id,
          status: "PENDING",
          type_of_action: "INVITE"
        };

        const response = await axiosInstance.post("/companies/invite/create", requestPayload);
        closeModal();
        if (response.status === 201) {
          closeModal();
        }
      } catch (error) {

      }
    }
  };

  const get_member_analytics = (companyId:number, user_id:number) => {
    console.log
    navigate(`/company/${companyId}/member/${user_id}/analytics`);
  }



  return (
    <div>
      <ul className="user-list">
        {list.map((item) => (
          <li key={item.id} className="user-item">
            <div className="user-info">
              <Link to={`/userPage/${item.id}`} className="user-id">
                {item.id}
              </Link>
              {show ? (
                <Button
                  text="Invite"
                  type="button"
                  className="edit"
                  onClick={() => {
                    setSelectedCompany(null);
                    onInviteClick(item);
                  }}
                />
              ) : (
                <Button
                  text="Remove"
                  type="button"
                  className="edit"
                  onClick={() => remove_member(companyId, item.id)}
                />
              )}

              <div className="user-details">
                <div className="detail">Username: {item.username}</div>
                <div className="detail">Email: {item.email}</div>
                <div className="detail">City: {item.city}</div>
                <div className="detail">Country: {item.country}</div>
                <div className="detail">Phone: {item.phone}</div>
                <div className={`status ${item.status ? "active" : "inactive"}`}>
                  {item.status ? "Active" : "Inactive"}
                </div>
                <div className="detail">Roles: {item.roles.join(", ")}</div>
                {admin ? (
                  <div>
                    <div className="detail">Last Completion: {lastCompletionTimes[item.id] || "N/A"}</div>
                    <Button
                      text={item.roles.includes("ADMIN") ? "Remove Admin" : "Make Admin"}
                      type="button"
                      onClick={() =>
                        item.roles.includes("ADMIN")
                          ? removeAdmin(companyId, item.id)
                          : makeAdmin(companyId, item.id)
                      }
                    />
                    <Button
                      text="Get User Analytics"
                      type="button"
                      onClick={() => get_member_analytics(companyId, item.id)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal windowName="Companies" isOpen={isModalOpen} onClose={closeModal}>
        {selectedUser && (
          <div>
            <div>Выберите компанию:</div>
            <select
              value={selectedCompany ? selectedCompany.id : ""}
              onChange={(e) => {
                const companyId = parseInt(e.target.value);
                const company = companies.find((c) => c.id === companyId);
                setSelectedCompany(company || null);
              }}
            >
              <option value="">Выберите компанию</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button text="Отправить запрос" type="button" onClick={createInvite} />
          </div>
        )}
      </Modal>
    </div>

  );
};

export default ListUsers;