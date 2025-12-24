import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoaderSpainer from "../Loader/LoaderSpainer";

/* 🔹 Fake / fallback data (Library Management themed) */
const fallbackSlides = [
  {
    img: "https://i.postimg.cc/Y06QnfBr/learning.jpg",
    text:
      "A modern library is more than shelves of books—it is a digital gateway to knowledge, research, and lifelong learning for students and educators alike.",
  },
  {
    img: "https://i.postimg.cc/kMzrqMmh/learning_(1).jpg",
    text:
      "Manage books, track borrowing history, and organize resources effortlessly with a smart library management system built for efficiency.",
  },
  {
    img: "https://i.postimg.cc/C5Tjsrtm/learning_(10).jpg",
    text:
      "From students to teachers and administrators, our library platform connects everyone to the right information at the right time.",
  },
  {
    img: "https://i.postimg.cc/vBjPFvKt/learning_(11).jpg",
    text:
      "Every book tells a story, and every reader shapes the future—our system helps preserve, organize, and share that knowledge seamlessly.",
  },
  {
    img: "https://i.postimg.cc/XY3sbqsz/learning_(12).jpg",
    text:
      "Reduce manual work, simplify catalog management, and focus on building a culture of reading and research in your institution.",
  },
];

const MIN_SLIDES = 3;

const MyCarousel = () => {
  const [slides, setSlides] = useState(fallbackSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_ApiCall}/slides-data`)
      .then((res) => res.json())
      .then((data) => {
        /* ✅ Validate API data */
        if (Array.isArray(data) && data.length >= MIN_SLIDES) {
          setSlides(data);
        } else {
          console.warn("API returned insufficient data, using fallback slides");
          setSlides(fallbackSlides);
        }
      })
      .catch((error) => {
        console.error("Slide API error:", error);
        setSlides(fallbackSlides);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[66vh] flex items-center justify-center text-lg font-semibold">
        <LoaderSpainer/>
      </div>
    );
  }

  return (
    <div className="max-h-[66vh] overflow-hidden shadow-xl">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={900}
        swipeable
        emulateTouch
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative max-h-[66vh]">
            {/* Image */}
            <img
              src={slide.img}
              alt={`library-slide-${i}`}
              className="object-cover w-full h-[66vh] object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <h2 className="text-white text-xl md:text-4xl font-semibold text-center leading-relaxed drop-shadow-xl tracking-wide max-w-4xl">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
