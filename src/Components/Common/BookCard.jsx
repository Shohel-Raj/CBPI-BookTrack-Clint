import { Link } from "react-router";

const BookCard = ({ book }) => {
  const {
    _id,
    title,
    author,
    category,
    coverPage,
    availableCopies,
  } = book;

  return (
    <div className="group flex flex-col h-full rounded-2xl bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      
      {/* Book Cover */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={coverPage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-primary text-white">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col grow p-5">
        <h3 className="text-lg font-semibold text-base-content line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          by <span className="font-medium">{author}</span>
        </p>

        <p
          className={`mt-3 text-sm font-medium ${
            availableCopies > 0
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {availableCopies > 0
            ? `${availableCopies} copies available`
            : "Not available"}
        </p>

        {/* Spacer */}
        <div className="grow"></div>

        {/* View Details Button */}
        <Link
          to={`/book-details/${_id}`}
          className="mt-5 w-full  btn text-center btn-out"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
