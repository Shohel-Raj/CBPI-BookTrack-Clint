import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";
import { useAuth } from "../../../Context/useAuth";

const AdminBorrowedHistory = () => {
  const { user } = useAuth();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const limit = 20;

  const fetchBorrows = async (currentPage = 1, order = sortOrder) => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_ApiCall}/admin/borrows?page=${currentPage}&limit=${limit}&sort=status&order=${order}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBorrows(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setPage(response.data.pagination?.page || 1);
      } else {
        toast.error("Access denied");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch borrowed history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBorrows(page, sortOrder);
  }, [user, page, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (loading) return <LoaderSpainer />;

  return (
    <div className="p-4 sm:p-6 bg-base-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Borrowed History
      </h1>

      {borrows.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No borrow records found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table - Hidden on small screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-left">Book</th>
                  <th className="text-left">User</th>
                  <th className="text-left">
                    <button
                      className="underline hover:text-primary transition"
                      onClick={toggleSortOrder}
                    >
                      Status {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                  </th>
                  <th className="text-left">Borrow Date</th>
                  <th className="text-left">Return Date</th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((b, idx) => (
                  <tr key={b._id} className="hover">
                    <td>{(page - 1) * limit + idx + 1}</td>
                    <td>
                      <div>
                        <p className="font-semibold">{b.book?.title || "-"}</p>
                        <p className="text-sm text-gray-500">
                          {b.book?.author?.join(", ") || "-"}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium">{b.user?.name || "-"}</p>
                        <p className="text-sm text-gray-500">{b.user?.email || "-"}</p>
                      </div>
                    </td>
                    <td className="capitalize font-medium">
                      {b.status?.replace("-", " ") || "-"}
                    </td>
                    <td>
                      {b.borrowDate
                        ? new Date(b.borrowDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {b.returnDate
                        ? new Date(b.returnDate).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Cards - Visible on screens < lg */}
          <div className="lg:hidden space-y-4">
            {borrows.map((b, idx) => (
              <div
                key={b._id}
                className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="badge badge-primary badge-sm">
                      #{(page - 1) * limit + idx + 1}
                    </span>
                    <span
                      className={`badge capitalize ${
                        b.status === "borrowed"
                          ? "badge-warning"
                          : b.status === "returned"
                          ? "badge-success"
                          : b.status.includes("pending")
                          ? "badge-info"
                          : "badge-ghost"
                      }`}
                    >
                      {b.status?.replace("-", " ") || "unknown"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-lg">{b.book?.title || "Unknown Book"}</h3>
                      <p className="text-sm text-gray-500">
                        by {b.book?.author?.join(", ") || "Unknown Author"}
                      </p>
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-sm">
                        <span className="font-medium">User:</span>{" "}
                        {b.user?.name || "N/A"} ({b.user?.email || "-"})
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Borrowed:</span>
                        <br />
                        {b.borrowDate
                          ? new Date(b.borrowDate).toLocaleDateString()
                          : "-"}
                      </div>
                      <div>
                        <span className="font-medium">Due/Returned:</span>
                        <br />
                        {b.returnDate
                          ? new Date(b.returnDate).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination - Responsive */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </div>

        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Previous
          </button>

          <button
            className="btn btn-sm btn-primary"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>

        {/* Sort Button for Mobile */}
        <button
          onClick={toggleSortOrder}
          className="btn btn-outline btn-sm lg:hidden"
        >
          Sort by Status {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>
    </div>
  );
};

export default AdminBorrowedHistory;