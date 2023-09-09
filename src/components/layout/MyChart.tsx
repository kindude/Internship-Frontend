import { Line } from 'react-chartjs-2';

interface ChartProps{
    chartData:any
}

const MyChart: React.FC<ChartProps> = (props: ChartProps) => {

    return (
        <div>
            <Line
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as 'top',
                    },
                    title: {
                        display: true,
                        text: 'Средние баллы по всем квизам с динамикой во времени',
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
            data={props.chartData}
        />
        </div>)
}
export default MyChart;