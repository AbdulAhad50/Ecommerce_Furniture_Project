// components/MonthlyRevenueChart.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// API response ke types define karte hain:
interface Order {
  createdAt: string;
  totalOrderPrice: number;
  // Baqi properties jaise paymentMethod, products, etc. ho sakti hain
}

interface ChartDataType {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    // Agar zaroorat ho to aap borderColor, borderWidth etc. bhi add kar sakte hain
  }[];
}

const MonthlyRevenueChart = () => {
  // Chart data ka initial state aik object se set karte hain
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        label: "Revenue Generated",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // API endpoint se orders fetch kar rahe hain
        const res = await fetch("/api/order/allorder");
        const orders: Order[] = await res.json();

        // Month-wise revenue grouping ke liye aik object banate hain
        const groupedRevenue: { [month: string]: number } = {};

        orders.forEach((order) => {
          // createdAt se month extract karte hain
          const dateObj = new Date(order.createdAt);
          const month = dateObj.toLocaleString("default", { month: "long" });
          // Agar month already exist karta hai to usmein current order ka revenue add kar dein,
          // warna naya key initialize kar dein.
          groupedRevenue[month] = (groupedRevenue[month] || 0) + order.totalOrderPrice;
        });

        // Grouped data se labels aur revenue values nikalte hain
        const labels = Object.keys(groupedRevenue);
        const revenue = labels.map((month) => groupedRevenue[month]);

        // Chart data update karte hain
        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue Generated",
              data: revenue,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card className="w-[80%] mx-auto">
      <CardHeader>
        <CardTitle>Monthly Revenue Generated</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={chartData} />
      </CardContent>
    </Card>
  );
};

export default MonthlyRevenueChart;
