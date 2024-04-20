import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Legend,
  Tooltip
);

const BarGraph = () => {
  // Sample JSON data
  // const jsonData = [
  //   { amount: 10, overspend: false, datetime: "2024-04-15 08:00" },
  //   { amount: 20, overspend: false, datetime: "2024-04-16 08:00" },
  //   { amount: 30, overspend: true, datetime: "2024-04-17 08:00" },
  //   { amount: 16, overspend: false, datetime: "2024-04-18 08:00" },
  //   { amount: 13, overspend: false, datetime: "2024-04-19 08:00" },
  //   { amount: 42, overspend: true, datetime: "2024-04-20 08:00" },
  // ];
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/expense/expenses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        setJsonData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(jsonData);
  // Extracting data from JSON
  const labels = jsonData.map(
    (data) => `${data.date.split("T")[0]} ${data.time} ${data.category}`
  );
  const category=jsonData.map((data)=>data.category)
  const amounts = jsonData.map((data) => data.amount);
  const overspends = jsonData.map((data) => data.overspend);
  const backgroundColors = overspends.map((overspend) =>
    overspend ? "red" : "aqua"
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expense",
        data:amounts,
        backgroundColor: backgroundColors,
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date and Time",
        },
        ticks: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
        min: 0,
        max: 500, // Adjust max value as needed
      },
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Graphical representation of expenditure </h2>
      <div
        style={{
          width: "60%",
          height: "100%",
          padding: "50px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarGraph;
