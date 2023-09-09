import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/api_instance';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { fetchAnalytics } from '../utils/UserAverages';
import MyChart from '../components/layout/MyChart';

const MemberAnalytics: React.FC = () => {
  const { companyId, userId } = useParams<{ companyId: string; userId: string }>();
  const [chartData, setChartData] = useState<any | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalytics(`/company/${companyId}/user/${userId}/quizzes-averages`);
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [companyId, userId]);


  return (
    <div>
      <h1>График Средних баллов по всем квизам пользователя с динамикой во времени</h1>

      {chartData && (
        <MyChart chartData={chartData}/>
      )}
    </div>
  );
};

export default MemberAnalytics;
