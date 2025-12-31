import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Mohammed Shohel",
    designation: "Full-stack Developer (MERN)",
    position: "Team Co-Leader",
    roll: "689225",
    image: "https://iili.io/fXO262R.png",
  },
  {
    name: "MD. Kasem",
    designation: "Developer & Tester",
    position: "Team Leader",
    roll: "689197",
    image: "https://iili.io/fXOeZNe.png",
  },
  {
    name: "Nahimul Alam Nahim",
    designation: "Developer & Tester",
    roll: "689259",
    image: "https://iili.io/fXOtRmG.jpg",
  },
  {
    name: "Kumkuma Hosna",
    designation: "Developer & Tester",
    roll: "689195",
    image: "https://iili.io/fXOtTdX.jpg",
  },
  {
    name: "Shemo Dey",
    designation: "Team Supporter",
    roll: "689158",
    image: "https://iili.io/fXOt01S.png",
  },
  {
    name: "Abdul Hai",
    designation: "Team Supporter",
    roll: "689208",
    image: "https://iili.io/fXOtzgt.jpg",
  },
  {
    name: "Choton Rudra",
    designation: "Team Supporter",
    roll: "689180",
    image: "https://iili.io/fXOtAes.png",
  },
  {
    name: "Abdullah Al Jihad",
    designation: "Team Supporter",
    roll: "689219",
    image: "https://iili.io/fXOtSYF.jpg",
  },
];

const OurTeam = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <section className="py-8 lg:pb-24 lg:pt-10 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-6">
            Our Team
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Dedicated students and developers behind the CBPI Library Management System.
          </p>
        </motion.div>

        {/* Team Grid - Equal Height Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group h-full" // Ensures full height of grid row
            >
              <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden h-full flex flex-col">
                {/* Fixed Height Image */}
                <figure className="relative overflow-hidden h-80 bg-base-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-200/80 via-transparent to-transparent" />
                </figure>

                {/* Card Body - Takes remaining space */}
                <div className="card-body text-center p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-base-content">{member.name}</h3>

                    {member.position && (
                      <p className="text-primary font-semibold mt-2">{member.position}</p>
                    )}

                    <p className="text-base-content/80 mt-3">{member.designation}</p>

                    <p className="text-sm text-base-content/60 mt-4">
                      Roll: <span className="font-medium">{member.roll}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam;