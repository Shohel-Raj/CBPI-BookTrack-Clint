import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useAuth } from "../Context/useAuth";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";

const ProfilePage = () => {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch User From DB ---------------- */
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_ApiCall}/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLoggedUser(res.data.user || res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return <LoaderSpainer />;
  if (!loggedUser) return null;

  /* ---------------- Helpers ---------------- */
  const formatDate = (date) =>
    date ? format(new Date(date), "MMMM dd, yyyy") : "N/A";

  const statusStyles = {
    active: "badge-success",
    pending: "badge-warning",
    blocked: "badge-error",
  };

  const statusDot = {
    active: "bg-success",
    pending: "bg-warning",
    blocked: "bg-error",
  };

  const isTeacher = loggedUser.role === "teacher";

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* ================= Profile Card ================= */}
        <div className="relative bg-base-100 border border-base-300 rounded-3xl shadow-lg overflow-hidden">

          {/* Cover */}
          <div className="h-36 bg-linear-to-r from-primary via-secondary to-accent" />

          {/* Avatar */}
          <div className="absolute left-8 top-16">
            <div className="relative">
              <img
                src={loggedUser.photoURL || "/avatar.png"}
                alt={loggedUser.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-base-100 shadow-md"
              />
              <span
                className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-base-100 ${
                  statusDot[loggedUser.status] || "bg-neutral"
                }`}
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-24 px-8 pb-10">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-base-content">
                  {loggedUser.name}
                </h1>
                <p className="text-base-content/70 capitalize">
                  {loggedUser.role}
                </p>

                <span
                  className={`badge mt-2 ${
                    statusStyles[loggedUser.status] || "badge-ghost"
                  }`}
                >
                  {loggedUser.status}
                </span>
              </div>
            </div>

            {/* ================= Details ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

              {/* Left */}
              <div className="space-y-5">
                <Info label="Email" value={loggedUser.email} />
                <Info label="Department" value={loggedUser.department} />

                {isTeacher && (
                  <Info label="Position" value={loggedUser.position} />
                )}
              </div>

              {/* Right */}
              <div className="space-y-5">
                {isTeacher ? (
                  <Info
                    label="Teacher ID"
                    value={loggedUser.teacherId}
                    mono
                  />
                ) : (
                  <>
                    <Info label="Registration No" value={loggedUser.RegNumber} mono />
                    <Info label="Roll No" value={loggedUser.roll} mono />
                  </>
                )}

                <Info
                  label="Member Since"
                  value={formatDate(loggedUser.createdAt)}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-base-content/60">
          Welcome back, <span className="font-semibold">{loggedUser.name}</span> 👋
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;

/* ================= Reusable Info Row ================= */
const Info = ({ label, value, mono }) => (
  <div>
    <p className="text-sm text-base-content/60">{label}</p>
    <p className={`text-lg text-base-content ${mono ? "font-mono" : ""}`}>
      {value || "N/A"}
    </p>
  </div>
);
