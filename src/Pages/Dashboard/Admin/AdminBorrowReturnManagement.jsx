import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";
import { useAuth } from "../../../Context/useAuth";

const AdminBorrowReturnManagement = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchPendingRequests = async (currentPage = 1) => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_ApiCall}/admin/borrows/pending?page=${currentPage}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setRequests(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setPage(response.data.pagination?.page || 1);
      } else {
        toast.error("Access denied");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch pending requests");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBorrow = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await axios.post(
        `${import.meta.env.VITE_ApiCall}/admin/confirm-borrow/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Borrow confirmed!");
        fetchPendingRequests(page);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to confirm borrow");
    }
  };

  const handleConfirmReturn = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await axios.post(
        `${import.meta.env.VITE_ApiCall}/admin/confirm-return/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Return confirmed!");
        fetchPendingRequests(page);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to confirm return");
    }
  };

  useEffect(() => {
    if (user) fetchPendingRequests(page);
  }, [user, page]);

  if (loading) return <LoaderSpainer />;

  return (
    <div className="p-4 sm:p-6 bg-base-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Pending Borrow & Return Requests
      </h1>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No pending requests at the moment.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table - Hidden on small screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Title</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr key={req._id} className="hover">
                    <td>{(page - 1) * limit + idx + 1}</td>
                    <td className="font-semibold">{req.book?.title || "Unknown"}</td>
                    <td>
                      <div>
                        <p className="font-medium">{req.user?.name || "N/A"}</p>
                        <p className="text-sm text-gray-500">{req.user?.email}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`badge capitalize ${
                        req.status === "pending-borrow" ? "badge-info" : "badge-warning"
                      }`}>
                        {req.status.replace("-", " ")}
                      </span>
                    </td>
                    <td>{new Date(req.borrowDate).toLocaleDateString()}</td>
                    <td>{new Date(req.returnDate).toLocaleDateString()}</td>
                    <td>
                      {req.status === "pending-borrow" && (
                        <button
                          onClick={() => handleConfirmBorrow(req._id)}
                          className="btn btn-sm btn-success"
                        >
                          Confirm Borrow
                        </button>
                      )}
                      {req.status === "pending-return" && (
                        <button
                          onClick={() => handleConfirmReturn(req._id)}
                          className="btn btn-sm btn-warning"
                        >
                          Confirm Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {requests.map((req, idx) => (
              <div key={req._id} className="card bg-base-200 shadow-lg">
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="badge badge-primary">#{ (page - 1) * limit + idx + 1 }</span>
                    <span className={`badge capitalize ${
                      req.status === "pending-borrow" ? "badge-info" : "badge-warning"
                    }`}>
                      {req.status.replace("-", " ")}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">{req.book?.title || "Unknown Book"}</h3>
                  <p className="text-sm text-gray-500">
                    by {req.book?.author?.join(", ") || "Unknown"}
                  </p>

                  <div className="divider my-3"></div>

                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">User:</span> {req.user?.name || "N/A"} ({req.user?.email})</p>
                    <p><span className="font-medium">Borrowed:</span> {new Date(req.borrowDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Due:</span> {new Date(req.returnDate).toLocaleDateString()}</p>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    {req.status === "pending-borrow" && (
                      <button
                        onClick={() => handleConfirmBorrow(req._id)}
                        className="btn btn-success btn-sm"
                      >
                        Confirm Borrow
                      </button>
                    )}
                    {req.status === "pending-return" && (
                      <button
                        onClick={() => handleConfirmReturn(req._id)}
                        className="btn btn-warning btn-sm"
                      >
                        Confirm Return
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Responsive Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-primary"
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBorrowReturnManagement;