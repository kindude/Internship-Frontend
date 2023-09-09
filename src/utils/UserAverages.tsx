import axiosInstance from "../api/api_instance";

export const fetchAnalytics = async (url:string) => {
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        const quizAverages = response.data.averages[0].Avges;

        const uniqueTimestamps: Set<string> = new Set();

        Object.keys(quizAverages).forEach((quizId: string) => {
          const quizData = quizAverages[quizId];
          const timestamps = quizData.timestamp.split(', ');
          timestamps.forEach((timestamp: string) => {
            uniqueTimestamps.add(timestamp);
          });
        });


        const sortedTimestamps = Array.from(uniqueTimestamps).sort();

        const datasets: any[] = Object.keys(quizAverages).map((quizId: string, index: number) => {
          const quizData = quizAverages[quizId];
          const quizTimestamps = quizData.timestamp.split(', ');

          const dataPoints: number[] = [];

          sortedTimestamps.forEach((timestamp: string) => {
            const indexOfTimestamp = quizTimestamps.indexOf(timestamp);
            if (indexOfTimestamp !== -1) {

              const averages = quizData.average.split(', ').map((averageStr: string) => parseFloat(averageStr));
              dataPoints.push(averages[indexOfTimestamp]);
            } else {
              dataPoints.push(0);
            }
          });

          return {
            label: `Квиз ${index + 1}`,
            data: dataPoints,
            borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          };
        });

        const chartData = {
          labels: sortedTimestamps,
          datasets,
        };

        return chartData
      }
    } catch (error) {
      console.error(error);
}
};