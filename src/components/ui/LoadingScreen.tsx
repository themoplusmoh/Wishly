import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
      <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingScreen;