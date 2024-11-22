import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    BarElement, // Untuk bar chart
    CategoryScale,
    LinearScale,
    Filler,
} from "chart.js";

// Register Chart.js plugins and elements
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement, // Untuk garis
    PointElement, // Untuk titik
    BarElement, // Untuk bar chart
    CategoryScale,
    LinearScale,
    Filler
);

const Chart = ({ paymentData }) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const transactionCountsRPL = new Array(12).fill(0); // Dataset 1
    const transactionCountsOther = new Array(12).fill(0); // Dataset 2

    // Mengisi data berdasarkan bulan
    paymentData.forEach((payment) => {
        const paymentDate = new Date(payment.created_at.replace(" ", "T"));
        const paymentMonth = paymentDate.getMonth();

        if (!isNaN(paymentMonth)) {
            if (payment) {
                transactionCountsRPL[paymentMonth] += 1; // Tambahkan 1 untuk setiap transaksi
            } else {
                transactionCountsOther[paymentMonth] += 1; // Tambahkan 1 untuk transaksi lainnya
            }
        } else {
            console.error("Invalid date format:", payment.created_at);
        }
    });

    const data = {
        labels: months,
        datasets: [
            {
                label: "Jumlah Transaksi",
                data: transactionCountsRPL,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                fill: true,
                stack: "combined",
                type: "bar", // Bar chart
            },
            {
                label: "Jumlah Transaksi",
                data: transactionCountsRPL,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                fill: true,
                stack: "combined",
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Jumlah Transaksi SPP per Bulan",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Jumlah Transaksi",
                },
            },
        },
    };

    return (
        <div className="w-full">
            <h2>Chart Jumlah Transaksi SPP per Bulan</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Chart;
