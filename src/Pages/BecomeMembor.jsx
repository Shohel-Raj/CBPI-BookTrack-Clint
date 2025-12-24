import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/useAuth";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const BecomeMembor = () => {
  const navigate = useNavigate();
  const { loading: authLoading, user } = useAuth();

  const [databasedUser, setDatabasedUser] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    department: "",
    roll: "",
    RegNumber: "",
    mobile: "",
    teacherId: "",
    position: "",
  });

  // Fetch current user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user) return;
        const token = await getIdToken(auth.currentUser);

        const { data } = await axios.get(`${import.meta.env.VITE_ApiCall}/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setDatabasedUser(data.user);

        // Prefill form if pending
        if (data.user?.status === "pending") {
          if (data.user.isMember === "student") {
            setRole("student");
            setFormData({
              department: data.user.department || "",
              roll: data.user.roll || "",
              RegNumber: data.user.RegNumber || "",
              mobile: data.user.mobile || "",
              teacherId: "",
              position: "",
            });
          } else if (data.user.role === "teacher") {
            setRole("teacher");
            setFormData({
              department: data.user.department || "",
              roll: "",
              RegNumber: "",
              mobile: "",
              teacherId: data.user.teacherId || "",
              position: data.user.position || "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setFetchingLoader(false);
      }
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { role, status: "pending", email: user?.email };

    if (role === "student") {
      const { department, roll, RegNumber, mobile } = formData;
      if (!department || !roll || !RegNumber || !mobile) {
        toast.error("Please fill all the student fields");
        return;
      }
      payload = { ...payload, department, roll, RegNumber, mobile };
    } else {
      const { teacherId, department, position } = formData;
      if (!teacherId || !department || !position) {
        toast.error("Please fill all the teacher fields");
        return;
      }
      payload = { ...payload, teacherId, department, position };
    }

    try {
      const token = await getIdToken(auth.currentUser);

      await axios.put(`${import.meta.env.VITE_ApiCall}/update`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      toast.success("Membership request submitted successfully!");
      navigate("/all-books");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Submission failed");
    }
  };

  if (authLoading || fetchingLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isPending = databasedUser?.status === "pending";
  const isActive =
    databasedUser?.status === "active" &&
    (databasedUser?.isMember === "student" ||
      databasedUser?.role === "teacher" ||
      databasedUser?.role === "admin");

  if (isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-base-800">
        <div className="bg-green-100 dark:bg-green-900 p-10 rounded-lg text-center max-w-xl relative overflow-hidden">
          {/* Animated background icons */}
          <div className="absolute top-5 left-5 text-yellow-400 text-4xl animate-bounce opacity-30">📚</div>
          <div className="absolute top-1/3 right-10 text-blue-400 text-5xl animate-spin opacity-20">⭐</div>
          <div className="absolute bottom-10 left-20 text-pink-400 text-6xl animate-bounce opacity-25">📖</div>

          <h2 className="text-2xl font-semibold mb-4">🎉 You are already a member!</h2>
          <p className="text-base-content/80 mb-6">
            Thank you for being part of our library community. Now you can explore all our books and resources.
          </p>
          <Link
            to="/all-books"
            className="my-btn px-6 py-3 rounded-lg text-white font-semibold"
          >
            Explore Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-6 relative overflow-hidden">
      {/* Animated background icons */}
      <div className="absolute top-10 left-5 text-yellow-400 text-4xl animate-bounce opacity-20">📚</div>
      <div className="absolute top-1/3 right-10 text-blue-400 text-5xl animate-spin opacity-20">⭐</div>
      <div className="absolute bottom-10 left-20 text-pink-400 text-6xl animate-bounce opacity-20">📖</div>
      <div className="absolute bottom-1/4 right-10 text-green-400 text-5xl animate-spin opacity-15">✨</div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Become a Member</h1>
        <p className="text-center text-base-content/70 mb-6">
          Join our library community and unlock access to thousands of books and resources.
        </p>

        {isPending && (
          <div className="bg-yellow-100  p-6 rounded-lg mb-6 text-center relative z-10">
            <p className="text-primary">
              Your membership request is pending. You cannot edit the form until it is approved.
            </p>
          </div>
        )}

        <div className="bg-base-200 dark:bg-gray-900 p-8 rounded-lg shadow-md relative z-10">
          {/* Role toggle */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 rounded-l-lg font-semibold ${
                role === "student"
                  ? "bg-primary text-white"
                  : "bg-base-300 dark:bg-gray-700 text-base-content"
              }`}
              onClick={() => setRole("student")}
              disabled={isPending}
            >
              Student
            </button>
            <button
              className={`px-6 py-2 rounded-r-lg font-semibold ${
                role === "teacher"
                  ? "bg-primary text-white"
                  : "bg-base-300 dark:bg-gray-700 text-base-content"
              }`}
              onClick={() => setRole("teacher")}
              disabled={isPending}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {role === "student" ? (
              <>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  className="input input-bordered w-full bg-base-100 dark:bg-gray-800"
                  required
                  disabled={isPending}
                />
                <input
                  type="text"
                  name="roll"
                  value={formData.roll}
                  onChange={handleChange}
                  placeholder="Roll Number"
                  className="input input-bordered w-full bg-base-100 dark:bg-gray-800"
                  required
                  disabled={isPending}
                />
                <input
                  type="text"
                  name="RegNumber"
                  value={formData.RegNumber}
                  onChange={handleChange}
                  placeholder="Registration Number"
                  className="input input-bordered w-full bg-base-100 dark:bg-gray-800"
                  required
                  disabled={isPending}
                />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="input input-bordered w-full bg-base-100 dark:bg-gray-800"
                  required
                  disabled={isPending}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  placeholder="Teacher ID"
                  className="input input-bordered w-full bg-base-100 dark:bg-gray-800"
                  required
                  disabled={isPending}
                />
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  className="input input-bordered w-full bg-base-100 dark:bg-gray-800"
                  required
                  disabled={isPending}
                />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="input input-bordered w-full bg-base-100 dark:bg-gray-800"
                  required
                  disabled={isPending}
                />
              </>
            )}

            <button
              type="submit"
              className="my-btn w-full py-3 rounded-lg font-semibold text-white uppercase"
              disabled={isPending}
            >
              {isPending ? "Pending Approval..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeMembor;
