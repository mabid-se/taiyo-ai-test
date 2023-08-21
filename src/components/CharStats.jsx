import React from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import moment from "moment";
import { Chart as ChartJS } from "chart.js/auto";
import OverallData from "./OverallData";

const CharStats = () => {
  const { data, error, isLoading } = useQuery("covidData", async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );

    if (!response.ok) throw new Error("Network response failed!");
    return response.json();
  });

  if (isLoading) return <>Loading...</>;
  console.log("data: ", data);

  if (error) return <>Error: {error.message}</>;

  const chartData = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Deaths",
        data: Object.values(data.deaths),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Recovered",
        data: Object.values(data.recovered),
        borderColor: "rgba(0, 128, 0, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { labels: { font: { size: 14, weight: "bold" } } },
      title: {
        display: true,
        text: "Cases Fluctuations",
        font: { size: 32, weight: "bold" },
      },
    },
    responsive: true,
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
          font: { size: 17, weight: "bold" },
        },
        ticks: { font: { size: 10 } },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Count",
          font: { size: 17, weight: "bold" },
        },
        ticks: { font: { size: 10 } },
      },
    },
  };

  return (
    <div>
      <>
        <div className="flex justify-center align-center">
          <div className="w-10/12 my-8">
            <div className="w-full p-4 rounded-lg shadow-xl">
              <Line
                data={chartData}
                options={options}
                style={{ width: "100%", height: "100%" }}
              />
              <OverallData />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CharStats;
