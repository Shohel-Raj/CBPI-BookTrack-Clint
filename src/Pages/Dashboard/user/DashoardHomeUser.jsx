import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiBookOpen, FiCalendar, FiTrendingUp, FiBook } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../../../Context/useAuth";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [summary, setSummary] = useState({
    totalBorrowedLast30Days: 0,
    totalReturnedLast30Days: 0,
    currentlyBorrowed: 0,
  });

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = await user.getIdToken();

      const response = await axios.get(
        `${import.meta.env.VITE_ApiCall}/dashboard/member`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setChartData(response.data.chartData);
        setSummary({
          totalBorrowedLast30Days: response.data.summary.totalBorrowedLast30Days || 0,
          totalReturnedLast30Days: response.data.summary.totalReturnedLast30Days || 0,
          // We'll get currently borrowed separately or calculate if needed
        });

        // Fetch current borrowed count separately (from existing endpoint)
        const currentRes = await axios.get(
          `${import.meta.env.VITE_ApiCall}/my-borrowed-books`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setSummary((prev) => ({
          ...prev,
          currentlyBorrowed: currentRes.data.length || 0,
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Transform API data into recharts format
  const lineChartData = chartData.labels?.map((label, index) => ({
    date: new Date(label).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    borrowed: chartData.datasets?.[0]?.data?.[index] || 0,
    returned: chartData.datasets?.[1]?.data?.[index] || 0,
  })) || [];

  if (loading) return <LoaderSpainer />;

  return (
    <div className="space-y-6 p-6 bg-base-100 text-base-content min-h-screen">
      <h2 className="text-3xl font-bold">
        Welcome back,{" "}
        <span className="text-primary">{user?.displayName || "Student"}</span>!
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-primary/10 rounded-xl">
            <FiBookOpen className="text-3xl text-primary" />
          </div>
          <div>
            <p className="text-sm opacity-70">Currently Borrowed</p>
            <p className="text-3xl font-bold text-primary">
              {summary.currentlyBorrowed}
            </p>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-blue-500/10 rounded-xl">
            <FiTrendingUp className="text-3xl text-blue-500" />
          </div>
          <div>
            <p className="text-sm opacity-70">Borrowed (Last 30 Days)</p>
            <p className="text-3xl font-bold text-blue-500">
              {summary.totalBorrowedLast30Days}
            </p>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-green-500/10 rounded-xl">
            <FiCalendar className="text-3xl text-green-500" />
          </div>
          <div>
            <p className="text-sm opacity-70">Returned (Last 30 Days)</p>
            <p className="text-3xl font-bold text-green-500">
              {summary.totalReturnedLast30Days}
            </p>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-purple-500/10 rounded-xl">
            <FiBook className="text-3xl text-purple-500" />
          </div>
          <div>
            <p className="text-sm opacity-70">Borrow Limit</p>
            <p className="text-2xl font-bold">3 Books</p>
            <p className="text-xs opacity-60 mt-1">
              {3 - summary.currentlyBorrowed} slot{3 - summary.currentlyBorrowed !== 1 ? "s" : ""} left
            </p>
          </div>
        </div>
      </div>

      {/* Borrowing Activity Chart */}
      <div className="bg-base-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-6">
          Your Borrowing Activity (Last 30 Days)
        </h3>

        {lineChartData.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <FiBookOpen className="text-6xl mx-auto mb-4 opacity-30" />
            <p>No borrowing activity in the last 30 days.</p>
            <p className="text-sm mt-2">Start borrowing books to see your trends!</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: "currentColor", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "currentColor", fontSize: 12 }}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--b2))",
                  border: "1px solid hsl(var(--bc) / 0.2)",
                  borderRadius: "12px",
                  color: "hsl(var(--bc))",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Line
                type="monotone"
                dataKey="borrowed"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5, fill: "#3b82f6" }}
                activeDot={{ r: 8 }}
                name="Borrowed"
              />
              <Line
                type="monotone"
                dataKey="returned"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 5, fill: "#22c55e" }}
                activeDot={{ r: 8 }}
                name="Returned"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Quick Tip */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
        <p className="text-lg font-medium">
          Tip: You can borrow up to <strong>3 books</strong> at a time as a student.
        </p>
        <p className="text-sm opacity-70 mt-2">
          Return books on time to avoid any restrictions.
        </p>
      </div>
    </div>
  );
};

export default StudentDashboardHome;