import React from "react";
import { BookOpen, Brain, GraduationCap, Users } from "lucide-react";

const reasons = [
  {
    icon: <Brain size={40} />,
    title: "Enhances Critical Thinking",
    description:
      "Reading regularly strengthens the mind by improving focus, memory, and analytical thinking. It encourages readers to evaluate ideas and form independent opinions.",
  },
  {
    icon: <GraduationCap size={40} />,
    title: "Supports Academic Success",
    description:
      "Access to books and learning materials helps students perform better academically by expanding vocabulary, improving comprehension, and deepening subject knowledge.",
  },
  {
    icon: <BookOpen size={40} />,
    title: "Builds Knowledge & Awareness",
    description:
      "Books open doors to new cultures, histories, and perspectives, allowing readers to stay informed and develop a broader understanding of the world.",
  },
  {
    icon: <Users size={40} />,
    title: "Encourages Lifelong Learning",
    description:
      "Reading nurtures curiosity and personal growth at every stage of life, fostering continuous learning beyond classrooms and formal education.",
  },
];

const WhyReadingMatters = () => {
  return (
    <section >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Why Reading Matters
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Reading is the foundation of knowledge, growth, and lifelong learning.
            Discover why it plays a vital role in education and personal development.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="
                bg-base-200
                text-base-content
                shadow-md
                rounded-2xl
                p-6
                text-center
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
              "
            >
              <div className="flex justify-center mb-4 text-primary">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-base-content/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyReadingMatters;
