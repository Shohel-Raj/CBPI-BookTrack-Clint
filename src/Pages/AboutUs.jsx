import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Wraper from "../Components/Wraper";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <header className="relative h-96 md:h-screen max-h-[calc(100vh-150px)] overflow-hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cbpi_campus.jpg/1200px-Cbpi_campus.jpg"
          alt="Cox's Bazar Polytechnic Institute Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Digital Library
            </h1>
            <p className="text-lg md:text-2xl opacity-90">
              Cox's Bazar Polytechnic Institute
            </p>
          </div>
        </div>
      </header>

      {/* About Institute */}
      <section className="py-16  bg-base-200">
        <Wraper>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About the Institute
              </h2>
              <p className="text-lg mb-4 opacity-90">
                Established in 2004, Cox's Bazar Polytechnic Institute is a
                government technical education institution located in Jhilongja,
                Cox's Bazar, Bangladesh.
              </p>
              <p className="text-lg mb-4 opacity-90">
                The institute is affiliated with the Bangladesh Technical
                Education Board (BTEB) and offers 4-year Diploma-in-Engineering
                programs in Computer, Civil, Food, RAC, Tourism & Hospitality,
                and other technologies.
              </p>
              <p className="text-lg opacity-90">
                With skilled faculty, modern labs, and practical learning, we
                prepare students for professional success at national and global
                levels.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src="https://coxsbazarcity.com/wp-content/uploads/2025/08/Coxs-Bazar-Polytechnic-Institute.jpg"
                alt="Institute Building"
                className="rounded-xl shadow-lg max-w-full"
              />
            </div>
          </div>
        </Wraper>
      </section>

      {/* Digital Library */}
      <Wraper>
        <section className="py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Our Digital Library
          </h2>

          <p className="text-lg max-w-4xl mx-auto mb-6 opacity-90">
            The Digital Library enhances traditional learning by providing
            online access to academic and technical resources for students and
            teachers.Users can explore e-books, journals, lecture notes,
            research papers, and past exam materials anytime from any device.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <img
              src="https://i.postimg.cc/rwC5xdWK/man-library-with-tablet.jpg"
              alt="Digital Library Usage"
              className="w-full h-64 md:h-80 lg:h-96 rounded-xl shadow-md object-cover"
            />
            <img
              src="https://blog.kotobee.com/wp-content/uploads/2025/06/what-is-a-digital-library-1024x537.jpg"
              alt="Digital Resources"
              className="w-full h-64 md:h-80 lg:h-96 rounded-xl shadow-md object-cover"
            />
          </div>

          {/* Features */}
          <div className="mt-14 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">Key Features</h3>
            <ul className="grid md:grid-cols-2 gap-4 text-left text-lg">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-success mt-1" />
                <span>Smart book search & advanced filtering</span>
              </li>

              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-success mt-1" />
                <span>Easy borrow, return & reservation system</span>
              </li>

              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-success mt-1" />
                <span>Role-based access for students, teachers & admins</span>
              </li>

              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-success mt-1" />
                <span>Mobile-friendly & remote library access</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      </Wraper>
      
    </div>
  );
};

export default AboutUs;
