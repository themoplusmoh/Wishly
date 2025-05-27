import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-center sm:px-6 lg:px-8">
      <h1 className="text-9xl font-bold text-primary-500">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="btn-primary flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;