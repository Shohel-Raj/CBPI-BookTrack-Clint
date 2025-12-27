import React, { useEffect, useState } from "react";
import axios from "axios";
import Wraper from "../Components/Wraper";
import MyCarousel from "../Components/Home/MyCarousel";
import WhyReadingMatters from "../Components/Home/WhyReadingMatters";
import BookCard from "../Components/Common/BookCard";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import BecomeMember from "../Components/Home/BecomeMember";

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
  },
];

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState(fallbackBooks);
  const [topBorrowedBooks, setTopBorrowedBooks] = useState(fallbackBooks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${import.meta.env.VITE_SITE} | Home`;

    const fetchFeaturedBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ApiCall}/featured`
        );
        const data = res.data?.books ?? [];
        setFeaturedBooks(data.length ? data : fallbackBooks);
      } catch (error) {
        console.error("Featured Books API error:", error);
        setFeaturedBooks(fallbackBooks);
      }
    };

    const fetchTopBorrowedBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ApiCall}/top-borrowed`
        );
        const data = res.data?.books ?? [];
        setTopBorrowedBooks(data.length ? data : fallbackBooks);
      } catch (error) {
        console.error("Top Borrowed Books API error:", error);
        setTopBorrowedBooks(fallbackBooks);
      }
    };

    const fetchAllBooks = async () => {
      setLoading(true);
      await fetchFeaturedBooks();
      await fetchTopBorrowedBooks();
      setLoading(false);
    };

    fetchAllBooks();
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
            {featuredBooks.map((book) => (
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
            {topBorrowedBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </Wraper>
      </div>

      <BecomeMember />
    </div>
  );
};

export default Home;
