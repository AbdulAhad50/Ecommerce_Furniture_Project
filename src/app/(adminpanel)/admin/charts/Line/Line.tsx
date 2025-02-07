// components/MonthlyOrderChart.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

// API response ke types define kar lete hain:
interface Product {
  totalPrice: number;
  totalQuantity: number[]; // example: [2] ya [1, 1] etc.
  totalName: string[];
  singleProductPrice: number[];
}

interface Order {
  createdAt: string;
  paymentMethod: string;
  products: Product[];
  totalOrderPrice: number;
}

interface ChartDataType {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

const MonthlyOrderChart = () => {
  // Initial chart data ko ek object se initialize karte hain
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        label: "Total Quantity Ordered",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // API call kar rahe hain
        const res = await fetch("/api/order/allorder");
        const orders: Order[] = await res.json();

        // Month-wise grouping ke liye aik object banate hain
        const groupedData: { [month: string]: number } = {};

        orders.forEach((order) => {
          // createdAt se month extract karte hain
          const orderDate = new Date(order.createdAt);
          const month = orderDate.toLocaleString("default", { month: "long" });
          
          // Har order ke products ke totalQuantity arrays ka sum nikalte hain
          let orderQuantity = 0;
          order.products.forEach((product) => {
            // Agar totalQuantity array hai to isme jitni values hain unka sum le lete hain
            const productQuantity = product.totalQuantity.reduce(
              (acc, qty) => acc + qty,
              0
            );
            orderQuantity += productQuantity;
          });

          // Grouping: agar month pehle se exist karta hai to quantity add karein, warna initialize kar dein
          groupedData[month] = (groupedData[month] || 0) + orderQuantity;
        });

        // Ab grouped data se labels (months) aur quantities (aggregated sum) nikal lete hain
        const labels = Object.keys(groupedData);
        const quantities = labels.map((month) => groupedData[month]);

        // Chart.js ke liye data update karte hain
        setChartData({
          labels,
          datasets: [
            {
              label: "Total Quantity Ordered",
              data: quantities,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card className="w-[80%] mx-auto">
      <CardHeader>
        <CardTitle>Monthly Order Quantity</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} />
      </CardContent>
    </Card>
  );
};

export default MonthlyOrderChart;
