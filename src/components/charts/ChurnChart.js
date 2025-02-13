import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ANALYTICS_API = "https://ecfr-backend.onrender.com";

const ChurnChart = () => {
    const [churnData, setChurnData] = useState({ labels: [], values: [] });

    useEffect(() => {
        fetch(`${ANALYTICS_API}/regulation_churn`)
            .then(response => response.json())
            .then(data => {
                const aggregatedData = {};

                data.forEach(({ changes_per_year }) => {
                    Object.entries(changes_per_year).forEach(([year, count]) => {
                        if (parseInt(year) > 2016) { // Filter years > 2015
                            aggregatedData[year] = (aggregatedData[year] || 0) + count;
                        }
                    });
                });

                const sortedYears = Object.keys(aggregatedData).sort();
                const values = sortedYears.map(year => aggregatedData[year]);

                setChurnData({ labels: sortedYears, values });
            })
            .catch(error => console.error("Error fetching regulation churn data:", error));
    }, []);

    return (
        <div className="w-3/4 mx-auto">
            <h2 className="text-xl font-bold text-white">Regulation Churn</h2>
            <p className="mb-4">Total number of amendments to all titles by year</p>
            <Bar
                data={{
                    labels: churnData.labels,
                    datasets: [
                        {
                            label: "Total Changes",
                            data: churnData.values,
                            backgroundColor: "rgba(0, 191, 255, 0.8)",
                            borderWidth: 1,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        // title: { display: true, text: "Regulation Churn Over the Years", color: "#fff" },
                    },
                    scales: {
                        x: {
                            ticks: { color: "#fff" }, // White text for dark mode
                        },
                        y: {
                            ticks: { color: "#fff" },
                        },
                    },
                }}
            />
        </div>
    );
};

export default ChurnChart;
