import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../Context/useAuth";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const ManageUser = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
  });

  /* =============================
     FETCH USERS
  ============================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();

      const { data } = await axios.get(
        `${import.meta.env.VITE_ApiCall}/users`,
        {
          params: { page, ...filters },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filters]);

  /* =============================
     DELETE USER
  ============================= */
  const handleDelete = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "This user will be permanently removed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = await user.getIdToken();
            await axios.delete(`${import.meta.env.VITE_ApiCall}/users/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            });

            swalWithBootstrapButtons.fire(
              "Deleted!",
              "User has been deleted.",
              "success"
            );
            fetchUsers();
          } catch (err) {
            Swal.fire(
              "Error!",
              err.response?.data?.message || "Failed to delete user",
              "error"
            );
          }
        }
      });
  };

  /* =============================
     TOGGLE USER STATUS WITH CONFIRM MODAL
  ============================= */
  const handleToggleStatus = async (id, currentStatus, name) => {
    const nextStatus = currentStatus === "active" ? "pending" : "active";

    swalWithBootstrapButtons
      .fire({
        title: `Change status of ${name}?`,
        text: `This will set the user to "${nextStatus}"`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update!",
        cancelButtonText: "Cancel",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = await user.getIdToken();
            const { data } = await axios.patch(
              `${import.meta.env.VITE_ApiCall}/users/${id}/status`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }
            );

            toast.success(data.message);
            fetchUsers();
          } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status");
          }
        }
      });
  };

  return (
    <div className="min-h-screen p-3 md:p-6 bg-base-100">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search name or email"
          className="input input-bordered flex-1"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          className="select select-bordered flex-1"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <select
          className="select select-bordered flex-1"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-base-200 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="sticky top-0 bg-base-300 z-10">
              <tr>
                <th>Name</th>
                <th className="hidden md:table-cell">Email</th>
                <th className="hidden md:table-cell">Role</th>
                <th>Status</th>
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
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td className="hidden md:table-cell">{u.email}</td>
                    <td className="hidden md:table-cell capitalize">{u.role}</td>
                    <td className="capitalize">{u.status || "active"}</td>
                    <td className="flex justify-center flex-col md:flex-row gap-2">
                      <button
                        className={`btn btn-sm ${
                          u.status === "active" ? "btn-warning" : "btn-success"
                        }`}
                        onClick={() => handleToggleStatus(u._id, u.status, u.name)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(u._id)}
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

      {/* PAGINATION */}
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

export default ManageUser;
