import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaBook,
  FaUserEdit,
  FaLayerGroup,
  FaLanguage,
  FaWarehouse,
  FaUpload,
  FaCheckCircle,
} from "react-icons/fa";
import { getIdToken } from "firebase/auth";
import { useAuth } from "../../../Context/useAuth";
import { uploadImageToImgbb } from "../../../utilities/uploadImageToImgbb";
import { auth } from "../../../firebase/firebase.init";
import { motion } from "framer-motion";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const AddBook = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    authorsInput: "",
    authors: [],
    description: "",
    category: "",
    language: "",
    totalCopies: "",
    shelfNo: "",
    status: "available",
  });

  const [photoURL, setPhotoURL] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "authorsInput") {
      setFormData((prev) => ({ ...prev, authorsInput: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAuthorsKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = formData.authorsInput.trim();
      if (trimmed && !formData.authors.includes(trimmed)) {
        setFormData((prev) => ({
          ...prev,
          authors: [...prev.authors, trimmed],
          authorsInput: "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, authorsInput: "" }));
      }
    }
  };

  const removeAuthor = (author) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((a) => a !== author),
    }));
  };

  const handleCoverUpload = async (file) => {
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const data = await uploadImageToImgbb(file, apiKey);
      setPhotoURL(data.url);
      toast.success("Cover image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload cover image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoURL) return toast.error("Please upload cover image");
    if (formData.authors.length === 0)
      return toast.error("Add at least one author");

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        authors: formData.authors,
        description: formData.description,
        category: formData.category,
        language: formData.language,
        coverImage: photoURL,
        totalCopies: Number(formData.totalCopies),
        availableCopies: Number(formData.totalCopies),
        shelfNo: formData.shelfNo,
        status: Number(formData.totalCopies) > 0 ? "available" : "unavailable",
      };

      const token = await getIdToken(auth.currentUser);

      await axios.post(`${import.meta.env.VITE_ApiCall}/books`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        authorsInput: "",
        authors: [],
        description: "",
        category: "",
        language: "",
        totalCopies: "",
        shelfNo: "",
        status: "available",
      });
      setPhotoURL("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-base-content  px-4 transition-colors duration-300">
      <div className="mx-auto bg-base-200 dark:bg-gray-900 rounded-2xl shadow-xl p-10 transition-colors duration-300">
        {/* Heading */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2"
        >
          <FaBook className="text-primary animate-bounce" /> Add New Book
        </motion.h1>

        <p className="text-center text-gray-500 dark:text-gray-300 mb-8 transition-colors duration-300">
          Enter book details and cover image to add a new book
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Book Title */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <label className="label font-medium flex items-center gap-2">
              <FaBook className="text-primary" /> Title
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book Title"
              required
            />
          </motion.div>

          {/* Category */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <label className="label font-medium flex items-center gap-2">
              <FaLayerGroup className="text-secondary" /> Category
            </label>
            <input
              type="text"
              name="category"
              className="input input-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
          </motion.div>

          {/* Authors */}
          <div className="md:col-span-2">
            <label className="label font-medium flex items-center gap-2">
              <FaUserEdit className="text-green-500" /> Authors
            </label>
            <div className="flex flex-wrap items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 transition-colors duration-300">
              {formData.authors.map((author) => (
                <motion.span
                  key={author}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-primary text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                  {author}
                  <button
                    type="button"
                    onClick={() => removeAuthor(author)}
                    className="font-bold hover:text-gray-200"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
              <input
                type="text"
                name="authorsInput"
                value={formData.authorsInput}
                onChange={handleChange}
                onKeyDown={handleAuthorsKey}
                placeholder="Type author and press Enter or comma"
                className="flex-1 min-w-30 border-none focus:ring-2 focus:ring-primary p-2 rounded-md bg-transparent text-base-content dark:text-white placeholder-gray-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* Language */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <label className="label font-medium flex items-center gap-2">
              <FaLanguage className="text-yellow-500" /> Language
            </label>
            <input
              type="text"
              name="language"
              className="input input-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              value={formData.language}
              onChange={handleChange}
              placeholder="Language"
              required
            />
          </motion.div>

          {/* Shelf No */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <label className="label font-medium flex items-center gap-2">
              <FaWarehouse className="text-purple-500" /> Shelf No
            </label>
            <input
              type="text"
              name="shelfNo"
              className="input input-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              value={formData.shelfNo}
              onChange={handleChange}
              placeholder="Shelf Number"
              required
            />
          </motion.div>

          {/* Total Copies */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <label className="label font-medium flex items-center gap-2">
              <FaCheckCircle className="text-teal-500" /> Total Copies
            </label>
            <input
              type="number"
              min="1"
              name="totalCopies"
              className="input input-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              value={formData.totalCopies}
              onChange={handleChange}
              placeholder="Total Copies"
              required
            />
          </motion.div>

          {/* Admin */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <label className="label font-medium flex items-center gap-2">
              <MdOutlineAdminPanelSettings className="text-primary" /> Added by
            </label>
            <input
              type="text"
              name="Added"
              disabled
              className="input input-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              value={user?.email}
              placeholder="Book Title"
              required
            />
          </motion.div>

          {/* Cover Image */}
          <div className="md:col-span-2">
            <label className="label font-medium flex items-center gap-2">
              <FaUpload className="text-pink-500 animate-bounce" /> Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              onChange={(e) => handleCoverUpload(e.target.files[0])}
              required
            />
            {photoURL && (
              <motion.img
                src={photoURL}
                alt="cover preview"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2 w-32 h-40 object-cover rounded-md border border-gray-300 dark:border-gray-700"
              />
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              rows="4"
              className="textarea textarea-bordered w-full bg-base-100 dark:bg-gray-800 transition-colors duration-300"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the book"
              required
            />
          </div>

          {/* Submit */}
          <motion.div className="md:col-span-2" whileHover={{ scale: 1.02 }}>
            <button
              type="submit"
              className="btn btn-out w-full text-lg"
              disabled={loading}
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
