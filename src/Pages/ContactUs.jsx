import React, { useState } from "react";
import Lottie from "lottie-react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import contactAnimation from "../../public/becomeMember.json";
import Wraper from "../Components/Wraper";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";


const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    subject: e.target.subject.value,
    message: e.target.message.value,
  };

  try {
    const res = await axios.post(`${import.meta.env.VITE_ApiCall}/api/contact`, formData);

    if (res.status === 201) {
      toast.success("Message sent successfully!");
      e.target.reset();
    } else {
      toast.error(res.data.message || "Failed to send message.");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen text-base-content transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-base-200 py-10">
        <Wraper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Contact Us
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              We're here to help! Reach out for any queries about the Digital
              Library.
            </p>
          </div>
        </Wraper>
      </div>

      {/* Two-Column Layout */}
      <Wraper>
        <section className="py-10">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Left: Contact Form */}
            <motion.div
              className="bg-base-100 p-8 rounded-xl shadow-md transition-colors duration-300 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">
                Send us a Message
              </h2>
              <form
                className="space-y-6 flex-1 flex flex-col justify-between"
                onSubmit={handleSubmit} 
              >
                <div>
                  <label className="block font-medium mb-2">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g., Resource Request, Technical Issue"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    required
                    className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full btn btn-out font-semibold transition-colors mt-2 ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Right: Animation + Contact Info */}
            <motion.div
              className="space-y-4 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Lottie Animation */}
              <motion.div
                className="bg-base-100 p-4 rounded-xl shadow-md transition-colors duration-300 flex-1 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Lottie
                  animationData={contactAnimation}
                  loop
                  autoplay
                  style={{ height: "100%", width: "100%" }}
                />
              </motion.div>

              {/* Contact Details */}
              <motion.div
                className="bg-base-100 py-8 px-4 rounded-xl shadow-md transition-colors duration-300 flex-1 flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
                      <HiOutlineMail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p>coxpoly@gmail.com</p>
                      <p>library@cbpi.edu.bd</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
                      <HiOutlinePhone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>+880-341-63388</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
                      <HiOutlineLocationMarker className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p>Jhilongja, Link Road</p>
                      <p>Cox's Bazar, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </Wraper>
    </div>
  );
};

export default ContactUs;
