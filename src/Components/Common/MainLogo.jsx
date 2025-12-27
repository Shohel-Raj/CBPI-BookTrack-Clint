// src/components/MainLogo.jsx
import React from "react";
import { FaBook, FaBookmark, FaBookReader } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { GrHelpBook } from "react-icons/gr";

export default function MainLogo() {
  return (
    <div className="flex items-center">
      <div className="relative overflow-hidden h-10 flex items-center min-w-50">
        {/* Text - First appearance */}
        <span className="absolute inset-0 flex items-center justify-center animate-slide-text-1">
          <h1 className="text-2xl font-bold text-primary whitespace-nowrap">
            CBPI BOOKTRACK
          </h1>
        </span>

        {/* Icons - First appearance */}
        <span className="absolute inset-0 flex items-center justify-center gap-4 animate-slide-icons-1 opacity-0">
          <span className="text-primary font-bold">&#123;</span>
          <FaBook className="w-6 h-6 text-blue-500" />
          <FaBookmark className="w-6 h-6 text-yellow-400" />
          <FaBookReader className="w-6 h-6 text-green-500" />
          <GoBook className="w-6 h-6 text-purple-500" />
          <GrHelpBook className="w-6 h-6 text-red-500" />
          <span className="text-primary font-bold">&#125;</span>
        </span>

        {/* Text - Second appearance */}
        <span className="absolute inset-0 flex items-center justify-center animate-slide-text-2 opacity-0">
          <h1 className="text-2xl font-bold text-primary whitespace-nowrap">
            CBPI BOOKTRACK
          </h1>
        </span>

        {/* Icons - Second appearance */}
        <span className="absolute inset-0 flex items-center justify-center gap-4 animate-slide-icons-2 opacity-0">
          <span className="text-primary font-bold">&#123;</span>
          <FaBook className="w-6 h-6 text-blue-500" />
          <FaBookmark className="w-6 h-6 text-yellow-400" />
          <FaBookReader className="w-6 h-6 text-green-500" />
          <GoBook className="w-6 h-6 text-purple-500" />
          <GrHelpBook className="w-6 h-6 text-red-500" />
          <span className="text-primary font-bold">&#125;</span>
        </span>
      </div>

      <style jsx>{`
        @keyframes slide-text-1 {
          0%,
          22% {
            transform: translateY(0);
            opacity: 1;
          }
          25%,
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
        @keyframes slide-icons-1 {
          0%,
          22% {
            transform: translateY(100%);
            opacity: 0;
          }
          25%,
          47% {
            transform: translateY(0);
            opacity: 1;
          }
          50%,
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
        @keyframes slide-text-2 {
          0%,
          47% {
            transform: translateY(100%);
            opacity: 0;
          }
          50%,
          72% {
            transform: translateY(0);
            opacity: 1;
          }
          75%,
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
        @keyframes slide-icons-2 {
          0%,
          72% {
            transform: translateY(100%);
            opacity: 0;
          }
          75%,
          97% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        .animate-slide-text-1 {
          animation: slide-text-1 8s ease-in-out infinite;
        }
        .animate-slide-icons-1 {
          animation: slide-icons-1 8s ease-in-out infinite;
        }
        .animate-slide-text-2 {
          animation: slide-text-2 8s ease-in-out infinite;
        }
        .animate-slide-icons-2 {
          animation: slide-icons-2 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
