import React from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../../public/Error.json'; // Add your Lottie JSON here
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="w-80 md:w-96">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className="text-3xl font-bold mt-6 mb-2">Oops! Something went wrong.</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
        The page you are looking for might be missing or unavailable.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
