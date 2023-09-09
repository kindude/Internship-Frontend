import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/api_instance';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { ListUsersAverages, UserAverage } from '../types/UserResponse';
import 'chartjs-plugin-annotation';

import "chart.js/auto";




const MembersAnalytics: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axiosInstance.get(`/company/${companyId}/users/analytics`);
        if (response.status === 200) {
          const formattedData = response.data.averages.map((entry: UserAverage) => ({
            x: new Date(entry.time).toISOString().slice(0, 10),
            y: entry.average,
          }));

          const chartData = {
            labels: formattedData.map((entry: { x: string; y: number }) => entry.x),
            datasets: [
              {
                label: 'Средний балл',
                data: formattedData.map((entry: { x: string; y: number }) => entry.y),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          };

          setChartData(chartData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();
  }, [companyId]);

  return (
    <div>
      <h1>График Средних баллов всех пользователей с динамикой во времени</h1>
   
      {chartData && (
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as 'top',
              },
              title: {
                display: true,
                text: 'Средние баллы пользователей с динамикой во времени',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Время',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Средний балл',
                },
              },
            },
          }}
          data={chartData}
        />
      )}
    </div>
  );
};

export default MembersAnalytics;
