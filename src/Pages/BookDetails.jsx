import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { toast, ToastContainer } from "react-toastify";
import { FaArrowLeft, FaBook, FaStar, FaFeatherAlt } from "react-icons/fa";
import Wraper from "../Components/Wraper";
import { useAuth } from "../Context/useAuth";
import { UserUtils } from "../utilities/UserUtils";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [uLoading, setUloading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        setUloading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const data = await UserUtils.getCurrentUser(token);
        setLoggedUser(data);
      } catch (err) {
        toast.error("Error fetching logged user");
      } finally {
        setUloading(false);
      }
    };

    fetchUser();
  }, [user]);

  // Fetch book details
  const fetchBook = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_ApiCall}/books/${id}`
      );
      setBook(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch book details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  // Borrow book
  const handleBorrow = async () => {
    try {
      setBorrowing(true);
      const token = user && (await user.getIdToken());

      const { data } = await axios.post(
        `${import.meta.env.VITE_ApiCall}/books/borrow/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data.message);
      fetchBook(); // refresh book data
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to borrow book");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading || uLoading) return <LoaderSpainer />;
  if (!book)
    return <p className="text-center py-6 text-gray-500">Book not found</p>;

  return (
    <div className="relative bg-base-100 p-4 md:p-6 overflow-hidden">
      {/* Animated background icons */}
      <FaBook className="absolute text-primary/10 text-6xl animate-bounce-slow top-10 left-5" />
      <FaStar className="absolute text-accent/10 text-5xl animate-spin-slow top-1/3 right-10" />
      <FaFeatherAlt className="absolute text-secondary/10 text-7xl animate-pulse-slow bottom-10 left-1/4" />

      <Wraper>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Book Details Card */}
        <div className="bg-base-200 rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 relative z-10">
          {/* Cover Image */}
          <div className="shrink-0 w-full md:w-1/3">
            <img
              src={book.coverPage}
              alt={book.title}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">{book.title}</h1>
            <p className="text-gray-500">
              <span className="font-semibold">Author(s): </span>
              {book.author.join(", ")}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Category: </span>
              {book.category}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Language: </span>
              {book.language}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Available Copies: </span>
              {book.availableCopies}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Shelf No: </span>
              {book.shelfNo}
            </p>
            <p className="text-gray-500 capitalize">
              <span className="font-semibold">Status: </span>
              {book.status}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Added On: </span>
              {new Date(book.createdAt).toLocaleString()}
            </p>

            {/* Description */}
            <div className="mt-4">
              <h2 className="font-semibold text-lg md:text-xl mb-2">
                Description
              </h2>
              <p className="text-gray-700">{book.description}</p>
            </div>

          {/* Borrow Button */}
<button
  onClick={handleBorrow}
  disabled={borrowing || book.availableCopies === 0 || loggedUser?.status !== "active"}
  className={`mt-4 w-max px-6 py-2 rounded-lg font-semibold transition-colors ${
    loggedUser?.status === "active" && book.availableCopies > 0
      ? "btn btn-out"
      : "bg-gray-400 text-gray-700 cursor-not-allowed"
  }`}
>
  {loggedUser?.status !== "active"
    ? "Not Applicable"
    : borrowing
    ? "Requesting..."
    : "Request Borrow"}
</button>

          </div>
        </div>
      </Wraper>
      <ToastContainer />
    </div>
  );
};

export default BookDetails;
