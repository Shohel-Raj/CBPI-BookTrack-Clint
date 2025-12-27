import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  BookOpen,
  LibraryBig,
  BookCheck,
  Activity,
  History,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../../Context/useAuth";
import LoaderSpainer from "../../Components/Loader/LoaderSpainer";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminDashboard = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = await user.getIdToken();

      const response = await axios.get(
        `${import.meta.env.VITE_ApiCall}/dashboard/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setDashboardData(response.data);
      } else {
        toast.error("Access denied: Admin only");
      }
    } catch (error) {
      console.error("Admin dashboard error:", error);
      toast.error("Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAdminDashboard();
    }
  }, [user]);

  if (loading) return <LoaderSpainer />;

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        No data available or access denied.
      </div>
    );
  }

  const { chartData, summary } = dashboardData;

  const lineChartData = chartData.labels.map((label, index) => ({
    date: new Date(label).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    borrows: chartData.datasets[0].data[index],
    returns: chartData.datasets[1].data[index],
  }));

  return (
    <div className="space-y-10 p-6 bg-base-100 min-h-screen text-base-content">
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>

      {/* ================= Summary Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={summary.totalBooks}
          icon={LibraryBig}
          gradient="from-indigo-500 to-purple-500"
        />

        <StatCard
          title="Available Books"
          value={summary.availableBooks}
          icon={BookCheck}
          gradient="from-green-500 to-emerald-500"
        />

        <StatCard
          title="Books on Loan"
          value={summary.booksOnLoan}
          icon={BookOpen}
          gradient="from-orange-500 to-amber-500"
        />

        <StatCard
          title="Active Borrows"
          value={summary.activeBorrows}
          icon={Activity}
          gradient="from-purple-500 to-fuchsia-500"
        />

        <StatCard
          title="Total Borrows Ever"
          value={summary.totalBorrowsEver}
          icon={History}
          gradient="from-blue-500 to-cyan-500"
        />

        <StatCard
          title="Borrows (Last 30 Days)"
          value={summary.borrowsLast30Days}
          icon={TrendingUp}
          gradient="from-pink-500 to-rose-500"
        />
      </div>

      {/* ================= Line Chart ================= */}
      <div className="bg-base-200 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">
          Borrowing & Returns Activity (Last 6 Months)
        </h2>

        {lineChartData.length === 0 ? (
          <div className="text-center py-12 opacity-70">
            No borrowing activity found.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.3} />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="borrows"
                stroke="#ef4444"
                strokeWidth={3}
                name="Daily Borrows"
              />
              <Line
                type="monotone"
                dataKey="returns"
                stroke="#22c55e"
                strokeWidth={3}
                name="Daily Returns"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ================= Status Message ================= */}
      <div className="bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-8 text-center">
        <p className="text-xl font-medium">
          Library is running smoothly with{" "}
          <strong>{summary.availableBooks}</strong> books available for borrowing.
        </p>
        <p className="mt-2 opacity-70">
          Keep managing the collection efficiently 🚀
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

/* ================= Reusable Stat Card ================= */
const StatCard = ({ title, value, icon:Icon,  gradient }) => {
  return (
    <div className="relative group">
      <div
        className={`absolute -inset-0.5 rounded-2xl bg-linear-to-r ${gradient} opacity-20 blur-lg group-hover:opacity-40 transition`}
      />

      <div className="relative bg-base-100 border border-base-300 rounded-2xl p-6 shadow-md group-hover:shadow-2xl transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">{title}</p>
            <p className="text-4xl font-bold mt-2">{value}</p>
          </div>

          <div
            className={`p-3 rounded-xl bg-linear-to-br ${gradient} text-white shadow-lg`}
          >
            <Icon size={26} />
          </div>
        </div>
      </div>
    </div>
  );
};
