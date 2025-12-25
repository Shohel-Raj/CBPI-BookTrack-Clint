import axios from "axios";

// Check the role of the logged-in user
export class RoleUtils {
  static async getUserRole(token) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data.role; // e.g., "user" or "admin"
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    }
  }

  // Optional: Check if user has a specific role
  static async hasRole(token, requiredRole) {
    const role = await this.getUserRole(token);
    return role === requiredRole;
  }
}
