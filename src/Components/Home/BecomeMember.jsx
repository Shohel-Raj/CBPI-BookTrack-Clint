import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router";
import becomemb from "../../../public/becomeMember.json";

const BecomeMember = () => {
  return (
    <section className="bg-base-100 text-base-content py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* 🔹 Centered Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Member
          </h1>
          <p className="text-base-content/70 text-lg md:text-xl max-w-2xl mx-auto">
            Join our digital library community and unlock unlimited access to
            books, resources, and a growing knowledge-driven community.
          </p>
        </div>

        {/* 🔹 Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Why Join Our Library?
            </h2>

            <ul className="space-y-4 text-base-content/80 text-lg mb-8">
              <li>📚 Access thousands of books anytime</li>
              <li>👥 Connect with readers & educators</li>
              <li>📊 Track your reading progress</li>
              <li>🎓 Exclusive member-only resources</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="my-btn px-6 py-3 rounded-lg text-white font-semibold uppercase"
              >
                Join Now
              </Link>

              <Link
                to="/all-books"
                className="px-6 py-3 rounded-lg btn-out border-primary text-primary font-semibold  transition"
              >
                Explore Books
              </Link>
            </div>
          </div>

          {/* Right Animation */}
          <div className="max-w-md mx-auto">
            <Lottie animationData={becomemb} loop />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeMember;
