import axios from "axios";

// Fetch current logged-in user info from backend
export class UserUtils {
  static async getCurrentUser(token) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ApiCall}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data.user; // user object
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
}
