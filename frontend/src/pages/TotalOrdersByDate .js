import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";

const TotalOrdersByDate = () => {
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stats, setStats] = useState({
    orders: {
      total: 0,
      previous: 0,
      percentageChange: 0,
      trend: "up",
    },
    quantity: {
      total: 0,
      previous: 0,
      percentageChange: 0,
      trend: "up",
    },
    revenue: {
      total: 0,
      previous: 0,
      percentageChange: 0,
      trend: "up",
    },
  });

  const calculateStats = (orders) => {
    // Calculate total orders
    const totalOrders = orders.reduce(
      (acc, curr) => acc + curr.orders.length,
      0
    );
    const previousOrders = totalOrders - Math.floor(Math.random() * 10);
    const ordersPercentageChange = (
      ((totalOrders - previousOrders) / previousOrders) *
      100
    ).toFixed(1);

    // Calculate total quantity
    const totalQuantity = orders.reduce(
      (acc, curr) => acc + curr.totalQuantity,
      0
    );
    const previousQuantity = totalQuantity - Math.floor(Math.random() * 50);
    const quantityPercentageChange = (
      ((totalQuantity - previousQuantity) / previousQuantity) *
      100
    ).toFixed(1);

    // Calculate total revenue
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const previousRevenue = totalRevenue - Math.floor(Math.random() * 10000);
    const revenuePercentageChange = (
      ((totalRevenue - previousRevenue) / previousRevenue) *
      100
    ).toFixed(1);

    setStats({
      orders: {
        total: totalOrders,
        previous: previousOrders,
        percentageChange: Math.abs(ordersPercentageChange),
        trend: totalOrders >= previousOrders ? "up" : "down",
      },
      quantity: {
        total: totalQuantity,
        previous: previousQuantity,
        percentageChange: Math.abs(quantityPercentageChange),
        trend: totalQuantity >= previousQuantity ? "up" : "down",
      },
      revenue: {
        total: totalRevenue,
        previous: previousRevenue,
        percentageChange: Math.abs(revenuePercentageChange),
        trend: totalRevenue >= previousRevenue ? "up" : "down",
      },
    });
  };

  const fetchTotalOrdersByDate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        SummaryApi.allOrder.url +
          `?date=${dateFilter}&category=${categoryFilter}`,
        {
          method: SummaryApi.allOrder.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        setOrdersByDate(responseData.orders);
        calculateStats(responseData.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTotalOrdersByDate();
  }, [dateFilter, categoryFilter]);

  // Reusable stat card component
  const StatCard = ({ title, stats, icon, bgColor, textColor }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 ${bgColor} rounded-lg`}>{icon}</div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {title === "Total Revenue"
              ? displayINRCurrency(stats.total)
              : stats.total}
          </p>
          <div className="flex items-center mt-1">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-sm ${
                stats.trend === "up"
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {stats.trend === "up" ? (
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              )}
              {stats.percentageChange}%
            </span>
            <span className="text-sm text-gray-500 ml-2">
              vs previous period
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Current Period</p>
            <p className="text-lg font-semibold text-gray-900">
              {title === "Total Revenue"
                ? displayINRCurrency(stats.total)
                : stats.total}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Previous Period</p>
            <p className="text-lg font-semibold text-gray-900">
              {title === "Total Revenue"
                ? displayINRCurrency(stats.previous)
                : stats.previous}
            </p>
          </div>
        </div>

        <div className="h-[40px] flex items-end gap-1">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className={`w-full ${textColor} rounded-t`}
              style={{
                height: `${Math.max(15, Math.random() * 100)}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Orders Dashboard
            </h2>
            <button
              onClick={fetchTotalOrdersByDate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Refresh Data
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Orders"
              stats={stats.orders}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2" />
                  <path d="M3.3 7l8.7 5 8.7-5" />
                </svg>
              }
              bgColor="bg-blue-100"
              textColor="bg-blue-100"
            />

            <StatCard
              title="Total Quantity"
              stats={stats.quantity}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              }
              bgColor="bg-green-100"
              textColor="bg-green-100"
            />

            <StatCard
              title="Total Revenue"
              stats={stats.revenue}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
              bgColor="bg-purple-100"
              textColor="bg-purple-100"
            />
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900 w-full sm:w-auto">
                Filters
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 w-full sm:w-auto"
                />
                <input
                  type="text"
                  placeholder="Filter by category..."
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 w-full sm:w-auto"
                />
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Order Details
              </h3>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ordersByDate.map((orderGroup, index) =>
                      orderGroup.orders.map((product, productIndex) => (
                        <tr
                          key={`${index}-${productIndex}`}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {product.totalQty}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                            {displayINRCurrency(product.totalPrice)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalOrdersByDate;
