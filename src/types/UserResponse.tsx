
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    city: string;
    country: string;
    phone: string;
    status: boolean;
    roles: string[];
  };

export interface UserAverage{
  user_id: string;
  average: number;
  time: string;
};

export interface ListUsersAverages{
  averages: UserAverage[];
}