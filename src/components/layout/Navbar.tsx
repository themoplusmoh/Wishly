import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Gift, Heart, User, LogOut, Search, PlusCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/wishly-icon.svg" alt="Wishly" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-primary-600">Wishly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/explore" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                Explore
              </Link>
              {user && (
                <>
                  <Link to="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link to="/wishlists/new" className="btn-primary">
                    <PlusCircle className="mr-1 h-4 w-4" />
                    New Wishlist
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop Profile Menu */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <button className="rounded-md p-2 text-gray-700 hover:bg-gray-100">
                  <Search className="h-5 w-5" />
                </button>
                <div className="relative">
                  <Link to="/profile" className="flex items-center rounded-full bg-gray-100 p-2">
                    <User className="h-5 w-5 text-gray-700" />
                  </Link>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6\" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6\" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/explore"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Explore
              </div>
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Heart className="mr-2 h-5 w-5" />
                    My Wishlists
                  </div>
                </Link>
                <Link
                  to="/wishlists/new"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    New Wishlist
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-5 w-5" />
                    Log out
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;