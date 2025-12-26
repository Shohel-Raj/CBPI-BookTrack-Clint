import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import ImgLottie from "../../public/register.json";
import axios from "axios";
import { uploadImageToImgbb } from "../utilities/uploadImageToImgbb";

const Register = () => {
  const { createUser, updateUserProfile, googleSignin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // Store uploaded image URL
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle image file selection and upload
  const handleUpload = async (file) => {
    if (!file) return;
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY; // Store your key in env
    setLoading(true);
    try {
      const data = await uploadImageToImgbb(file, apiKey);
      setPhotoURL(data.url);
      toast.success("Profile image uploaded!");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have at least one lowercase letter");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) return;

    setLoading(true);
    createUser(email, password)
      .then(async () => {
        try {
          // Update Firebase profile
          await updateUserProfile({
            displayName: name,
            photoURL,
          });

          // Save user in backend
          await axios.post(`${import.meta.env.VITE_ApiCall}/register`, {
            name,
            email,
            photoURL,
            role:"user",
            createdAt: new Date(),
          });

          toast.success("Account created successfully");
          navigate(from, { replace: true });
        } catch (error) {
          console.error("Registration error:", error);
          toast.error(error?.response?.data?.message || "Registration failed!");
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error("Error: " + error.code);
        setLoading(false);
      });
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
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_ApiCall}/register`, saveUser);

      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google Sign-In error:", err);
      toast.error(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-base-200 overflow-hidden px-4">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-secondary opacity-20 animate-ping"></div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 shadow-xl rounded overflow-hidden">
        {/* Left Column - Form */}
        <div className="bg-base-100 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center">Library Account Registration</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered w-full bg-base-200"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full bg-base-200"
            />

            {/* Profile Image Upload */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Profile Picture </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
                className="file-input file-input-bordered w-full bg-base-200"
              />
              {photoURL && (
                <img
                  src={photoURL}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full mt-2 object-cover border"
                />
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full pr-10 bg-base-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

      

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up with Google"}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right Column - Lottie */}
        <div className="hidden lg:flex items-center justify-center bg-base-100 p-6">
          <Lottie animationData={ImgLottie} loop className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Register;
