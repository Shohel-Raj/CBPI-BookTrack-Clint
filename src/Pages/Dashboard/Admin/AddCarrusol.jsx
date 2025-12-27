import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaTrash, FaEdit, FaImage } from "react-icons/fa";
import { uploadImageToImgbb } from "../../../utilities/uploadImageToImgbb";
import { useAuth } from "../../../Context/useAuth";
import { getIdToken } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";
import Swal from "sweetalert2";

const AddCarousel = () => {
    const { user } = useAuth();
  
  const [carouselItems, setCarouselItems] = useState([]);
  const [newItem, setNewItem] = useState({ img: "", text: "" });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  


  /* ---------------- Fetch Carousel ---------------- */
  const fetchCarousel = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ApiCall}/carousel`);
      setCarouselItems(res.data);
    } catch (err) {
      toast.error("Failed to load carousel");
    }
  };

  useEffect(() => {
    
    fetchCarousel();
  }, [user]);

  
  /* ---------------- Image Upload ---------------- */
  const handleUpload = async (file, isEdit = false) => {
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const data = await uploadImageToImgbb(file, apiKey);

      if (isEdit) {
        setEditingItem((prev) => ({ ...prev, img: data.url }));
      } else {
        setNewItem((prev) => ({ ...prev, img: data.url }));
      }

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Add Carousel ---------------- */
  const handleAdd = async () => {
    if (!newItem.img || !newItem.text) {
      return toast.error("Image & text required");
    }

    try {
            const token = await getIdToken(auth.currentUser);

      await axios.post(`${import.meta.env.VITE_ApiCall}/carousel`, newItem ,{
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("Carousel added");
      setNewItem({ img: "", text: "" });
      fetchCarousel();
    } catch {
      toast.error("Failed to add carousel");
    }
  };

  /* ---------------- Update Carousel ---------------- */
  const handleUpdate = async () => {
    try {
      const token = await getIdToken(auth.currentUser);
      await axios.put(
        `${import.meta.env.VITE_ApiCall}/carousel/${editingItem._id}`,
        editingItem,{
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
      );
      toast.success("Carousel updated");
      setEditingItem(null);
      fetchCarousel();
    } catch {
      toast.error("Update failed");
    }
  };

 const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This carousel item will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    const token = await getIdToken(auth.currentUser);

    await axios.delete(
      `${import.meta.env.VITE_ApiCall}/carousel/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    Swal.fire({
      title: "Deleted!",
      text: "Carousel item has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchCarousel();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Failed to delete carousel item",
      icon: "error",
    });
  }
};


  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-4xl font-bold text-center mb-10">
          🎞️ Carousel Management
        </h2>

        {/* ---------------- Add Section ---------------- */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="border-2 border-dashed rounded-xl p-6 text-center">
            <FaImage className="mx-auto text-4xl mb-2 opacity-70" />
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
            {newItem.img && (
              <motion.img
                src={newItem.img}
                className="mt-4 h-40 mx-auto rounded-lg shadow"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              />
            )}
          </div>

          <div className="space-y-4">
            <textarea
              className="textarea textarea-bordered w-full h-32"
              placeholder="Carousel description..."
              value={newItem.text}
              onChange={(e) =>
                setNewItem({ ...newItem, text: e.target.value })
              }
            />
            <button
              className="btn btn-primary w-full"
              onClick={handleAdd}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Carousel"}
            </button>
          </div>
        </div>

        {/* ---------------- List Section ---------------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {carouselItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card bg-base-200 shadow-md"
              >
                <figure>
                  <img
                    src={item.img}
                    className="h-52 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <p className="line-clamp-3">{item.text}</p>
                  <div className="card-actions justify-between mt-4">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setEditingItem(item)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ---------------- Edit Modal ---------------- */}
      {editingItem && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Carousel</h3>

            <input
              type="file"
              className="file-input w-full mb-3"
              onChange={(e) =>
                handleUpload(e.target.files[0], true)
              }
            />

            <textarea
              className="textarea textarea-bordered w-full"
              value={editingItem.text}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  text: e.target.value,
                })
              }
            />

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AddCarousel;
