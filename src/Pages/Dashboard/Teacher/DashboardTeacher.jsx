import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiBookOpen, FiRotateCw, FiClock, FiTrendingUp } from "react-icons/fi";
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

const DashboardTeacher = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [summary, setSummary] = useState({
    totalRecordsFound: 0,
    currentlyBorrowed: 0,
    totalReturned: 0,
    avgReadingDays: 0,
  });
  const [teacherName, setTeacherName] = useState("Teacher");

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_ApiCall}/dashboard/teacher`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const { chartData, summary, user: userInfo } = response.data;
        setChartData(chartData);
        setSummary(summary);
        setTeacherName(userInfo.name || user?.displayName || "Teacher");
      } else {
        toast.error("Access denied");
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const lineChartData = chartData.labels?.map((label, i) => ({
    date: new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    borrowed: chartData.datasets?.[0]?.data?.[i] || 0,
  })) || [];

  if (loading) return <LoaderSpainer />;

  return (
    <div className="space-y-6 p-6 bg-base-100 text-base-content min-h-screen">
      <h2 className="text-3xl font-bold">
        Welcome back, <span className="text-primary">{teacherName}!</span>
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-purple-500/10 rounded-xl">
            <FiTrendingUp className="text-3xl text-purple-500" />
          </div>
          <div>
            <p className="text-sm opacity-70">Total Borrowed Ever</p>
            <p className="text-3xl font-bold text-purple-500">{summary.totalRecordsFound}</p>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-blue-500/10 rounded-xl">
            <FiBookOpen className="text-3xl text-blue-500" />
          </div>
          <div>
            <p className="text-sm opacity-70">Currently Borrowed</p>
            <p className="text-3xl font-bold text-blue-500">{summary.currentlyBorrowed}</p>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-green-500/10 rounded-xl">
            <FiRotateCw className="text-3xl text-green-500" />
          </div>
          <div>
            <p className="text-sm opacity-70">Total Returned</p>
            <p className="text-3xl font-bold text-green-500">{summary.totalReturned}</p>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl shadow-lg p-6 flex items-center gap-5">
          <div className="p-4 bg-orange-500/10 rounded-xl">
            <FiClock className="text-3xl text-orange-500" />
          </div>
          <div>
            <p className="text-sm opacity-70">Avg Reading Time</p>
            <p className="text-3xl font-bold text-orange-500">
              {summary.avgReadingDays || 0} days
            </p>
          </div>
        </div>
      </div>

      {/* Last 15 Days Chart */}
      <div className="bg-base-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-6">Borrowing Activity (Last 15 Days)</h3>
        {summary.totalRecordsFound === 0 ? (
          <div className="text-center py-12 opacity-60">
            <FiBookOpen className="text-6xl mx-auto mb-4 opacity-30" />
            <p>No borrowing activity yet.</p>
            <p className="text-sm mt-2">Start borrowing to see your trends!</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={30} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--b2))", borderRadius: "12px" }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Line
                type="monotone"
                dataKey="borrowed"
                stroke="#9333ea"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
                name="Borrowed"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 text-center">
        <p className="text-xl font-semibold text-purple-700">
          Unlimited borrowing privileges — enjoy exploring the library!
        </p>
      </div>
    </div>
  );
};

export default DashboardTeacher;