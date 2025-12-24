import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Wraper from "../Components/Wraper";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import BookCard from "../Components/Common/BookCard";
import ImgLottie from "../../public/noBooks.json";
import Lottie from "lottie-react";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  /* Page title */
  useEffect(() => {
    document.title = `${import.meta.env.VITE_SITE} | All Books`;
  }, []);

  /* Debounced search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* Fetch books */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const url = new URL(`${import.meta.env.VITE_ApiCall}/books`);
        url.searchParams.append("page", page);
        url.searchParams.append("pageSize", pageSize);
        if (debouncedSearch) url.searchParams.append("search", debouncedSearch);
        if (category) url.searchParams.append("category", category);
        if (availability) url.searchParams.append("availability", availability);
        if (sort) url.searchParams.append("sort", sort);

        const { data } = await axios.get(url);
        setBooks(data.books || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedSearch, category, availability, sort, page]);

  if (loading) return <LoaderSpainer />;

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-12">
      <Wraper>
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Explore Our Library
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Browse all available books. Search, filter, and sort to find what
            you need.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author"
            className="input input-bordered w-full bg-base-100"
          />

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="select select-bordered w-full bg-base-100"
          >
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>

          <select
            value={availability}
            onChange={(e) => {
              setPage(1);
              setAvailability(e.target.value);
            }}
            className="select select-bordered w-full bg-base-100"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="select select-bordered w-full bg-base-100"
          >
            <option value="">Sort by</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Borrowed</option>
          </select>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-base-100 rounded-xl p-2 text-center">
            <Lottie
              animationData={ImgLottie}
              loop
              className="w-full max-w-md h-[30vh]"
            />

            <h2 className="text-2xl font-semibold text-base-content mt-4">
              No Books Found
            </h2>

            <p className="text-base-content/60 mt-2 max-w-md">
              We couldn’t find any books matching your search or filters. Try
              adjusting your criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setAvailability("");
                setSort("");
              }}
              className="btn btn-sm btn-out mt-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="btn btn-sm btn-outline"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`btn btn-sm ${
                  page === i + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="btn btn-sm btn-outline"
            >
              Next
            </button>
          </div>
        )}
      </Wraper>
    </div>
  );
};

export default AllBooks;
