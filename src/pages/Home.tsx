import { Link } from 'react-router-dom';
import { Heart, Gift, Share2, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-700 py-20 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7319146/pexels-photo-7319146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="z-10 space-y-8">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Create, Share, and Fulfill Wishlists Together
              </h1>
              <p className="text-lg md:text-xl">
                The social wishlist platform that makes gifting meaningful and easy. Create wishlists, contribute to others, and celebrate together.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link to="/dashboard\" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn-outline border-white text-white hover:bg-white/10">
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="z-10 hidden animate-fade-in md:block">
              <img 
                src="https://images.pexels.com/photos/5709020/pexels-photo-5709020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="People celebrating with gifts" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">How Wishly Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Creating and fulfilling wishlists has never been easier
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Create Wishlists</h3>
              <p className="mt-2 text-gray-600">
                Create personalized wishlists for any occasion - birthdays, weddings, projects, or just because.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
                <Share2 className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Share With Friends</h3>
              <p className="mt-2 text-gray-600">
                Share your wishlists with friends and family through social media, email, or direct links.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
                <Gift className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Contribute & Gift</h3>
              <p className="mt-2 text-gray-600">
                Contribute any amount toward an item or purchase it directly from linked vendors.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
                <ShieldCheck className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Track Progress</h3>
              <p className="mt-2 text-gray-600">
                See real-time progress on item fulfillment and receive notifications for contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Loved by Users</h2>
            <p className="mt-4 text-lg text-gray-600">
              See what our community is saying about Wishly
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="User"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600">Wedding Planner</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "Wishly made our wedding registry so much easier! Our guests loved being able to contribute to our honeymoon fund together."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="card">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="User"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600">Tech Enthusiast</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "I use Wishly to track all the gadgets I want. It's perfect for letting my family know exactly what I'm looking for."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="card">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="User"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Aisha Patel</h4>
                  <p className="text-gray-600">Nonprofit Founder</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "We use Wishly for our nonprofit's needs. It's helped us raise funds for specific projects in a transparent way."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Start Sharing Your Wishes?</h2>
            <p className="mt-4 text-lg">
              Join thousands of users creating and fulfilling wishlists every day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {user ? (
                <Link to="/wishlists/new\" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Create Your First Wishlist
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                    Sign Up Now
                  </Link>
                  <Link to="/explore" className="btn-outline border-white text-white hover:bg-white/10">
                    Explore Wishlists
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;