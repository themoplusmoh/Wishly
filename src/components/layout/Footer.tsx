import { Link } from 'react-router-dom';
import { Heart, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img src="/wishly-icon.svg" alt="Wishly" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-primary-600">Wishly</span>
            </Link>
            <p className="text-sm text-gray-600">
              The social wishlist platform that makes gifting meaningful and easy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/explore" className="text-gray-600 hover:text-gray-900">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/wishlists/new" className="text-gray-600 hover:text-gray-900">
                  Create Wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Subscribe</h3>
            <p className="mt-4 text-sm text-gray-600">
              Get the latest news and updates from Wishly.
            </p>
            <form className="mt-4">
              <div className="flex max-w-md">
                <input
                  type="email"
                  name="email"
                  id="email-address"
                  placeholder="Enter your email"
                  className="input min-w-0 flex-1"
                  required
                />
                <button type="submit" className="btn-primary ml-3 flex-shrink-0">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Wishly. All rights reserved. Made with{' '}
            <Heart className="inline h-4 w-4 text-accent-500" /> by Wishly Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;