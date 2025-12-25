import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiBook, FiStar, FiPlus } from "react-icons/fi";
import { Link } from "react-router";
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

const DashoardHomeUser = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [recentLessons, setRecentLessons] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();

      const resLessons = await axios.get(
        `${import.meta.env.VITE_ApiCall}/my-public-lessons`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalLessons(resLessons.data.totalLessonsCount || 0);

      const resSaved = await axios.get(
        `${import.meta.env.VITE_ApiCall}/my-favorites`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalSaved(resSaved.data.data.length || 0);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_ApiCall}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecentLessons(res.data.lessons);

      const weeklyCounts = Array(7).fill(0);
      const today = new Date();

      res.data.lessons.forEach((lesson) => {
        const created = new Date(lesson.created_at);
        const diffDays = Math.floor((today - created) / (1000 * 60 * 60 * 24));
        if (diffDays < 7) weeklyCounts[6 - diffDays] += 1;
      });

      const chartData = weeklyCounts.map((count, idx) => {
        const day = new Date();
        day.setDate(today.getDate() - (6 - idx));
        return {
          day: day.toLocaleDateString("en-US", { weekday: "short" }),
          count,
        };
      });

      setWeeklyData(chartData);
    } catch {
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLessons();
  }, [user]);

  if (loading) return <LoaderSpainer />;

  return (
    <div className="space-y-6 p-6 bg-base-100 text-base-content min-h-screen">
      <h2 className="text-2xl font-bold">
        Welcome, <span className="text-primary">{user?.displayName || "User"}</span>
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-200 rounded-xl shadow p-4 flex items-center gap-4">
          <FiBook className="text-3xl text-primary" />
          <div>
            <p className="text-sm opacity-70">Total Lessons</p>
            <p className="text-2xl font-bold">{totalLessons}</p>
          </div>
        </div>

        <div className="bg-base-200 rounded-xl shadow p-4 flex items-center gap-4">
          <FiStar className="text-3xl text-warning" />
          <div>
            <p className="text-sm opacity-70">Saved Lessons</p>
            <p className="text-2xl font-bold">{totalSaved}</p>
          </div>
        </div>

        <Link
          to="/dashboard/add-lesson"
          className="bg-primary hover:bg-primary/90 text-primary-content rounded-xl shadow p-4 flex items-center justify-center gap-3 transition"
        >
          <FiPlus className="text-3xl" />
          <span className="font-semibold">Add Lesson</span>
        </Link>
      </div>

      {/* Recent Lessons */}
      <div className="bg-base-200 rounded-xl shadow p-5">
        <h3 className="text-xl font-semibold mb-3">Recently Added Lessons</h3>
        {recentLessons.length === 0 ? (
          <p className="opacity-60">No lessons added yet.</p>
        ) : (
          <ul className="space-y-2">
            {recentLessons.map((lesson) => (
              <li
                key={lesson._id}
                className="flex justify-between items-center bg-base-100 rounded-lg px-4 py-3 hover:bg-base-300 transition"
              >
                <span className="font-medium">{lesson.title}</span>
                <span className="text-sm opacity-60">
                  {new Date(lesson.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Analytics */}
      <div className="bg-base-200 rounded-xl shadow p-5">
        <h3 className="text-xl font-semibold mb-3">Weekly Lessons Added</h3>
        {weeklyData.length === 0 ? (
          <p className="opacity-60">No activity this week.</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
  <LineChart data={weeklyData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />
    
    <XAxis 
      dataKey="day" 
      tick={{ fill: "currentColor" }} 
    />

    <YAxis 
      allowDecimals={false} 
      width={40}
      tick={{ fill: "currentColor" }}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: "hsl(var(--b1))",
        borderRadius: "8px",
        border: "1px solid hsl(var(--bc) / 0.2)",
        color: "hsl(var(--bc))",
      }}
    />

    <Line
      type="monotone"
      dataKey="count"
      stroke="#3B82F6"          // ✅ FIXED: guaranteed visible
      strokeWidth={3}
      dot={{ r: 5 }}             // ✅ visible points
      activeDot={{ r: 7 }}
    />
  </LineChart>
</ResponsiveContainer>

        )}
      </div>
    </div>
  );
};

export default DashoardHomeUser;
