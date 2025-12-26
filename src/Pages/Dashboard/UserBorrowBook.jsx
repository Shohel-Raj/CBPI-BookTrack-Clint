import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/useAuth";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const UserBorrowBook = () => {
  const { user } = useAuth();

  const [currentlyBorrowed, setCurrentlyBorrowed] = useState([]);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loadingCurrent, setLoadingCurrent] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const fetchCurrentlyBorrowed = async () => {
    try {
      setLoadingCurrent(true);
      const token = user && (await user.getIdToken());
      const { data } = await axios.get(
        `${import.meta.env.VITE_ApiCall}/my-borrowed-books`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setCurrentlyBorrowed(data);
    } catch (err) {
      toast.error("Failed to fetch currently borrowed books");
    } finally {
      setLoadingCurrent(false);
    }
  };

  const fetchBorrowHistory = async () => {
    try {
      setLoadingHistory(true);
      const token = user && (await user.getIdToken());
      const { data } = await axios.get(
        `${import.meta.env.VITE_ApiCall}/borrow-history`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setBorrowHistory(data);
    } catch (err) {
      toast.error("Failed to fetch borrow history");
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCurrentlyBorrowed();
      fetchBorrowHistory();
    }
  }, [user]);

const handleReturnBook = async (bookId) => {
  swalWithBootstrapButtons
    .fire({
      title: "Return this book?",
      text: "You will mark this book as returned.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, return it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = user && (await user.getIdToken());
          await axios.post(
            `${import.meta.env.VITE_ApiCall}/books/return/${bookId}`,
            {}, // empty body
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          toast.success("Book returned successfully!");
          // Refresh both tables
          fetchCurrentlyBorrowed();
          fetchBorrowHistory();
        } catch (err) {
          const message =
            err.response?.data?.message ||
            "Failed to return book. It may have already been returned.";
          toast.error(message);
        }
      }
    });
};

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-3 md:p-6 bg-base-100">
      <h1 className="text-3xl font-bold mb-8 text-center">My Borrowed Books</h1>

      {/* Currently Borrowed Books */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Currently Borrowed Books</h2>

        <div className="bg-base-200 rounded-lg shadow-md">
          <div className="">
            <table className="table table-zebra">
              <thead className="sticky top-0 bg-base-300">
                <tr>
                  <th>Title</th>
                  <th className="hidden md:table-cell">Author</th>
                  <th className="hidden md:table-cell">Category</th>
                  <th className="hidden md:table-cell">Borrow Date</th>
                  <th className="hidden lg:table-cell">Due Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingCurrent ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8">Loading...</td>
                  </tr>
                ) : currentlyBorrowed.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No books currently borrowed
                    </td>
                  </tr>
                ) : (
                  currentlyBorrowed.map((item) => (
                    <tr key={item._id}>
                      <td className="font-medium">{item.book.title}</td>
                      <td className="hidden md:table-cell">{item.book.author || "N/A"}</td>
                      <td className="hidden md:table-cell">{item.book.category}</td>
                      <td className="hidden md:table-cell">{formatDate(item.borrowDate)}</td>
                      <td className="hidden lg:table-cell">
                        {formatDate(item.dueDate)}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleReturnBook(item.book._id)}
                          className="btn btn-sm btn-success"
                        >
                          Return Book
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Borrow History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Borrow History</h2>

        <div className="bg-base-200 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="sticky top-0 bg-base-300">
                <tr>
                  <th>Title</th>
                  <th className="hidden md:table-cell">Author</th>
                  <th className="hidden md:table-cell">Category</th>
                  <th className="hidden md:table-cell">Borrow Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loadingHistory ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8">Loading...</td>
                  </tr>
                ) : borrowHistory.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No borrow history yet
                    </td>
                  </tr>
                ) : (
                  borrowHistory.map((item) => (
                    <tr key={item._id}>
                      <td className="font-medium">{item.book.title}</td>
                      <td className="hidden md:table-cell">{item.book.author || "N/A"}</td>
                      <td className="hidden md:table-cell">{item.book.category}</td>
                      <td className="hidden md:table-cell">{formatDate(item.borrowDate)}</td>
                      <td>{formatDate(item.returnDate)}</td>
                      <td>
                        {item.status === "borrowed" ? (
                          <span className="badge badge-warning">Borrowed</span>
                        ) : (
                          <span className="badge badge-success">Returned</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserBorrowBook;