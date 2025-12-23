import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/useAuth";
import Lottie from "lottie-react";
import ImgLottie from "../../public/Login.json"
import axios from "axios";

const Login = () => {
  const { signInUser, googleSignin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

    const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleSignin();
      const user = result.user;

  

      const saveUser = {
        name: user.displayName || "No Name",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user", // default role
        isPremium: false, // free plan by default
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_ApiCall}/register`, saveUser);

      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google Sign-In error:", err);
      toast.error(
        err?.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-base-200 transition-colors duration-300 overflow-hidden">
      {/* Animated background icons */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary opacity-20 animate-bounce"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-secondary opacity-20 animate-ping"></div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 shadow-xl rounded overflow-hidden">
        {/* Left Column - Lottie */}
        <div className="hidden lg:flex items-center justify-center bg-base-100 p-6">
          <Lottie
            animationData={ImgLottie}
            loop={true}
            className="w-full h-full"
          />
        </div>

        {/* Right Column - Form */}
        <div className="bg-base-100 p-8 flex flex-col justify-center transition-colors duration-300">
          <h2 className="text-3xl font-bold mb-6 text-base-content text-center">
            Login
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full bg-base-200 text-base-content border-gray-300 focus:border-primary focus:ring focus:ring-primary/30 transition-colors duration-300"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full pr-10 bg-base-200 text-base-content border-gray-300 focus:border-primary focus:ring focus:ring-primary/30 transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign in with Google"}
          </button>

          <p className="text-sm text-center mt-4 text-base-content">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
