import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../Context/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const ManageBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    availability: "",
    sort: "",
  });

  // Fetch books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_ApiCall}/books`,
        { params: { page, ...filters } }
      );
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, filters]);

  // Delete book
  const handleDelete = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = user && (await user.getIdToken());
            await axios.delete(`${import.meta.env.VITE_ApiCall}/books/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            });

            swalWithBootstrapButtons.fire(
              "Deleted!",
              "The book has been deleted.",
              "success"
            );
            fetchBooks();
          } catch (err) {
            Swal.fire(
              "Error!",
              err.response?.data?.message || "Failed to delete book",
              "error"
            );
          }
        }
      });
  };

  return (
    <div className="min-h-screen p-3 md:p-6 bg-base-100">
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search title/author"
          className="input input-bordered flex-1"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="input input-bordered flex-1"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />

        <select
          className="select select-bordered flex-1"
          value={filters.availability}
          onChange={(e) =>
            setFilters({ ...filters, availability: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <select
          className="select select-bordered flex-1"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">Sort By</option>
          <option value="newest">Newest</option>
          <option value="popular">Most Borrowed</option>
        </select>
      </div>

      {/* Scrollable Table */}
      <div className="bg-base-200 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="table table-zebra ">
            <thead className="sticky top-0 bg-base-300 z-10">
              <tr>
                <th>Title</th>
                <th className="hidden md:table-cell">Category</th>
                <th className="hidden md:table-cell">Availability</th>
                <th>Copies</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No books found
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td className="hidden md:table-cell">{book.category}</td>
                    <td className="hidden md:table-cell">
                      {book.availability || book.status}
                    </td>
                    <td>{book.totalCopies} Available</td>
                    <td className="flex justify-center flex-col md:flex-row gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate(`books/edit/${book._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          className="btn btn-sm"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="btn btn-sm btn-disabled">{page}</span>
        <button
          className="btn btn-sm"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageBook;
