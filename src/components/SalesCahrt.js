import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 800px;
  margin: 20px auto;
`;

const ChartBox = styled.div`
  width: 350px;
  height: 350px;
`;

const SalesChart = () => {
  // 총매출 (도넛 차트)
  const totalSalesData = {
    labels: ["온라인 매출", "오프라인 매출"],
    datasets: [
      {
        data: [7000, 5000], // 더미 데이터
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // 월별 매출 (막대 차트)
  const monthlySalesData = {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [
      {
        label: "월별 매출",
        data: [1500, 2000, 1800, 2200, 2100], // 더미 데이터
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <ChartContainer>
      <ChartBox>
        <Doughnut data={totalSalesData} options={{ ...options, plugins: { title: { text: "총매출 비율" } } }} />
      </ChartBox>
      <ChartBox>
        <Bar data={monthlySalesData} options={{ ...options, plugins: { title: { text: "월별 매출" } } }} />
      </ChartBox>
    </ChartContainer>
  );
};

export default SalesChart;
