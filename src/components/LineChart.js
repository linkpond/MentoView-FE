import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartBox = styled.div`
  width: 400px;
  height: 300px;
`;

const LineChart = () => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월",],
    datasets: [
      {
        label: "월별 방문자 수",
        data: [3000, 4000, 3500, 5000, 4500],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "일별 방문자 수",
        data: [200, 220, 180, 250, 230],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "방문자 통계",
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <LineChartBox>
      <Line data={data} options={options} />
    </LineChartBox>
  );
};

export default LineChart;
