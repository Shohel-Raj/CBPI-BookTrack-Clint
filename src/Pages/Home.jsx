import React, { useEffect, useState } from "react";
import Wraper from "../Components/Wraper";
import MyCarousel from "../Components/Home/MyCarousel";
import WhyReadingMatters from "../Components/Home/WhyReadingMatters";
import BookCard from "../Components/Common/BookCard";
import { Link } from "react-router";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import BecomeMember from "../Components/Home/BecomeMember";

/* ✅ Fake / fallback book data */
const fallbackBooks = [
  {
    _id: "b001",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    availableCopies: 8,
    totalCopies: 10,
    description:
      "A proven framework for building good habits and breaking bad ones through small, consistent changes.",
    publisher: "Penguin Random House",
    publishedYear: 2018,
    isbn: "9780735211292",
  },
  {
    _id: "b002",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    availableCopies: 3,
    totalCopies: 5,
    description:
      "A philosophical story about following your dreams and listening to your heart.",
    publisher: "HarperOne",
    publishedYear: 1993,
    isbn: "9780062315007",
  },
  {
    _id: "b003",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    availableCopies: 0,
    totalCopies: 4,
    description:
      "A handbook of agile software craftsmanship for writing clean, readable, and maintainable code.",
    publisher: "Prentice Hall",
    publishedYear: 2008,
    isbn: "9780132350884",
  },
  {
    _id: "b004",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    coverImage:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    availableCopies: 6,
    totalCopies: 6,
    description:
      "Rules for focused success in a distracted world and achieving peak productivity.",
    publisher: "Grand Central Publishing",
    publishedYear: 2016,
    isbn: "9781455586691",
  },
  {
    _id: "b005",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    coverImage:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    availableCopies: 2,
    totalCopies: 7,
    description:
      "Comprehensive textbook covering a wide range of algorithms in depth.",
    publisher: "MIT Press",
    publishedYear: 2009,
    isbn: "9780262033848",
  },
];

const Home = () => {
  const [books, setBooks] = useState(fallbackBooks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${import.meta.env.VITE_SITE} | Home`;

    fetch(`${import.meta.env.VITE_ApiCall}/books`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBooks(data);
        } else {
          console.warn("API returned no data, using fallback books");
          setBooks(fallbackBooks);
        }
      })
      .catch((error) => {
        console.error("Book API error:", error);
        setBooks(fallbackBooks);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderSpainer />
      </div>
    );
  }

  return (
    <div>
      <MyCarousel />

      <div className="bg-base-200 py-10">
        <Wraper>
          <WhyReadingMatters />
        </Wraper>
      </div>

      {/* Featured Books Section */}
      <div className="py-10">
        <Wraper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Featured Books
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Reading is the foundation of knowledge, growth, and lifelong
              learning. Discover why it plays a vital role in education and
              personal development.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </Wraper>
      </div>

      {/* Top Borrowed Books Section */}
      <div className="bg-base-200 py-10">
        <Wraper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Top Borrowed Books
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              These are the most popular books among our readers. Check them
              out and see what everyone is borrowing!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </Wraper>
      </div>

    
      <BecomeMember/>


    </div>
  );
};

export default Home;
