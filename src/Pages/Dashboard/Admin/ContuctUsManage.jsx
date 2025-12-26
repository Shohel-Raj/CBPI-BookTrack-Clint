import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { HiTrash } from "react-icons/hi";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const ContuctUsManage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const auth = getAuth();

  // Get Firebase token
  const getToken = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    return await user.getIdToken();
  };

  // Fetch messages safely
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.get(`${import.meta.env.VITE_ApiCall}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(data)) setMessages(data);
      else setMessages([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

 const handleDeleteAll = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will delete all contact messages permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626", // Red
    cancelButtonColor: "#6b7280",   // Gray
    confirmButtonText: "Yes, delete all!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return; // Exit if user cancels

  setDeleting(true);
  try {
    const token = await getToken();
    const { data } = await axios.delete(
      `${import.meta.env.VITE_ApiCall}/api/contact`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    Swal.fire({
      title: "Deleted!",
      text: data.message || "All messages have been deleted.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    setMessages([]);
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete messages. Please try again.",
      icon: "error",
    });
  } finally {
    setDeleting(false);
  }
};
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Contact Messages</h1>

      <div className="mb-6 flex justify-end">
        <button
          onClick={handleDeleteAll}
          disabled={deleting || !messages?.length}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition ${
            deleting || !messages?.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <HiTrash className="w-5 h-5" />
          {deleting ? "Deleting..." : "Delete All"}
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 rounded animate-pulse"></div>
          ))}
        </div>
      ) : !messages?.length ? (
        <p className="text-center text-gray-500">No messages available.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto"
        >
          <table className="w-full table-auto border-collapse border border-gray-300 bg-base-100 rounded-lg">
            <thead className="bg-base-300 text-base-content/80">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Subject</th>
                <th className="border p-2 text-left">Message</th>
                <th className="border p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-base-200 transition-colors">
                  <td className="border p-2">{msg?.name || "N/A"}</td>
                  <td className="border p-2">{msg?.email || "N/A"}</td>
                  <td className="border p-2">{msg?.subject || "N/A"}</td>
                  <td className="border p-2">{msg?.message || "N/A"}</td>
                  <td className="border p-2">
                    {msg?.createdAt
                      ? new Date(msg.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ContuctUsManage;
