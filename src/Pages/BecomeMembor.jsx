import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/useAuth";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

// icons
import {
  FiBook,
  FiUser,
  FiStar,
  FiAward,
  FiUsers,
} from "react-icons/fi";
import { FaGraduationCap, FaBookReader, FaChalkboardTeacher } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { AiOutlineRead } from "react-icons/ai";

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

  console.log(databasedUser)

  /* ================= FETCH USER ================= */
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
      } catch {
        toast.error("Failed to fetch user data");
      } finally {
        setFetchingLoader(false);
      }
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { role, status: "pending", email: user?.email };

    if (role === "student") {
      const { department, roll, RegNumber, mobile } = formData;
      if (!department || !roll || !RegNumber || !mobile) {
        toast.error("Fill all student fields");
        return;
      }
      payload = { ...payload, department, roll, RegNumber, mobile };
    } else {
      const { teacherId, department, position } = formData;
      if (!teacherId || !department || !position) {
        toast.error("Fill all teacher fields");
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

      toast.success("Membership request submitted!");
      navigate("/all-books");
    } catch {
      toast.error("Submission failed");
    }
  };

  if (authLoading || fetchingLoader) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const isPending = databasedUser?.status === "pending";
  const isActive =
    databasedUser?.status === "active" &&
    (databasedUser?.isMember === "student" ||
      databasedUser?.role === "teacher" ||
      databasedUser?.role === "admin");

  /* ================= ACTIVE ================= */
  if (isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden">
        <FloatingIcons />
        <div className="bg-base-200 p-10 rounded-xl shadow-xl text-center max-w-xl z-10">
          <FiAward className="text-6xl text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">You’re already a member 🎉</h2>
          <p className="opacity-80 mb-6">
            Enjoy full access to books and library resources.
          </p>
          <Link to="/all-books" className="btn my-btn px-8">
            Explore Books
          </Link>
        </div>
      </div>
    );
  }

  /* ================= FORM ================= */
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-6 relative overflow-hidden">
      <FloatingIcons />

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center mb-3">Become a Member</h1>
        <p className="text-center opacity-70 mb-8">
          Join our library and unlock unlimited knowledge.
        </p>

        {isPending && (
          <div className="alert alert-warning mb-6">
            <FiUser />
            <span>Your membership request is pending approval.</span>
          </div>
        )}

        <div className="bg-base-200 p-8 rounded-xl shadow-lg">
          {/* Role Toggle */}
          <div className="flex justify-center mb-6">
            <button
              className={`btn rounded-r-none ${role === "student" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setRole("student")}
              disabled={isPending}
            >
              <FaGraduationCap /> Student
            </button>
            <button
              className={`btn rounded-l-none ${role === "teacher" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setRole("teacher")}
              disabled={isPending}
            >
              <FaChalkboardTeacher /> Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {role === "student" ? (
              <>
                <Input name="department" value={formData.department} onChange={handleChange} placeholder="Department" disabled={isPending} />
                <Input name="roll" value={formData.roll} onChange={handleChange} placeholder="Roll Number" disabled={isPending} />
                <Input name="RegNumber" value={formData.RegNumber} onChange={handleChange} placeholder="Registration Number" disabled={isPending} />
                <Input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" disabled={isPending} />
              </>
            ) : (
              <>
                <Input name="teacherId" value={formData.teacherId} onChange={handleChange} placeholder="Teacher ID" disabled={isPending} />
                <Input name="department" value={formData.department} onChange={handleChange} placeholder="Department" disabled={isPending} />
                <Input name="position" value={formData.position} onChange={handleChange} placeholder="Position" disabled={isPending} />
              </>
            )}

            <button type="submit" className="btn my-btn w-full">
              {isPending ? "Pending Approval..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeMembor;

/* ================= INPUT ================= */
const Input = (props) => (
  <input
    {...props}
    className="input input-bordered w-full bg-base-100"
    required
  />
);

/* ================= FLOATING ICONS ================= */
const FloatingIcons = () => (
  <>
    {[
      FiBook,
      FiStar,
      FiUsers,
      FiAward,
      MdLibraryBooks,
      FaBookReader,
      FaGraduationCap,
      FaChalkboardTeacher,
      AiOutlineRead,
    ].map((Icon, i) => (
      <Icon
        key={i}
        className={`absolute text-primary opacity-20 text-${4 + (i % 4)}xl
        animate-${i % 2 ? "bounce" : "pulse"}`}
        style={{
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
        }}
      />
    ))}
  </>
);
