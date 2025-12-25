import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fake data for testing
  useEffect(() => {
    const fakeData = {
      totalUsers: 124,
      totalBooks: 540,
      totalReportedBooks: 12,
      todaysNewBooks: 8,
      mostActiveLibrarians: [
        { name: "Alice Johnson", email: "alice@mail.com", booksAdded: 32 },
        { name: "Bob Smith", email: "bob@mail.com", booksAdded: 28 },
        { name: "Charlie Brown", email: "charlie@mail.com", booksAdded: 25 },
      ],
      bookGrowth: [
        { date: "2025-12-18", count: 5 },
        { date: "2025-12-19", count: 6 },
        { date: "2025-12-20", count: 4 },
        { date: "2025-12-21", count: 7 },
        { date: "2025-12-22", count: 8 },
        { date: "2025-12-23", count: 6 },
        { date: "2025-12-24", count: 8 },
      ],
      userGrowth: [
        { date: "2025-12-18", count: 2 },
        { date: "2025-12-19", count: 4 },
        { date: "2025-12-20", count: 3 },
        { date: "2025-12-21", count: 5 },
        { date: "2025-12-22", count: 6 },
        { date: "2025-12-23", count: 4 },
        { date: "2025-12-24", count: 7 },
      ],
    };

    setTimeout(() => {
      setDashboardData(fakeData);
      setLoading(false);
    }, 1000); // simulate loading
  }, []);

  if (loading || !dashboardData)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading Dashboard...
      </div>
    );

  const {
    totalUsers,
    totalBooks,
    totalReportedBooks,
    todaysNewBooks,
    mostActiveLibrarians,
    bookGrowth,
    userGrowth,
  } = dashboardData;

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: totalUsers },
          { title: "Total Books", value: totalBooks },
          { title: "Reported Books", value: totalReportedBooks },
          { title: "Today's New Books", value: todaysNewBooks },
        ].map((metric) => (
          <div
            key={metric.title}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-lg font-medium">{metric.title}</h2>
            <p className="text-3xl font-bold text-[#FBD536]">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Most Active Librarians */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-3">Most Active Librarians</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {mostActiveLibrarians.map((librarian) => (
            <li
              key={librarian.email}
              className="py-2 flex justify-between items-center text-sm sm:text-base"
            >
              <span>{librarian.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {librarian.booksAdded} books
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-3">
            Book Additions Growth (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 6 }}
                labelStyle={{ color: "#FBD536" }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FBD536"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-3">
            User Registrations Growth (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 6 }}
                labelStyle={{ color: "#FBD536" }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FBD536"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
