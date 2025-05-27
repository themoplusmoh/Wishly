import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ListFilter, Search, Gift, Heart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import WishlistCard from '../components/wishlist/WishlistCard';
import ActivityFeed from '../components/activity/ActivityFeed';
import { Wishlist, Activity } from '../types';

// Mock data - would come from API in real implementation
const mockWishlists: Wishlist[] = [
  {
    id: '1',
    user_id: '123',
    title: 'Birthday Wishlist',
    description: 'Things I would love to get for my upcoming birthday!',
    category: 'birthday',
    is_public: true,
    created_at: '2023-05-15T10:00:00Z',
    updated_at: '2023-05-15T10:00:00Z',
    items_count: 5,
    total_price: 450,
    fulfilled_price: 150,
  },
  {
    id: '2',
    user_id: '123',
    title: 'Home Office Setup',
    description: 'Items I need for my new home office',
    category: 'project',
    is_public: true,
    created_at: '2023-04-20T10:00:00Z',
    updated_at: '2023-04-20T10:00:00Z',
    items_count: 8,
    total_price: 1200,
    fulfilled_price: 300,
  },
  {
    id: '3',
    user_id: '123',
    title: 'Christmas Ideas',
    description: 'Gift ideas for the holiday season',
    category: 'holiday',
    is_public: false,
    created_at: '2023-03-10T10:00:00Z',
    updated_at: '2023-03-10T10:00:00Z',
    items_count: 12,
    total_price: 800,
    fulfilled_price: 0,
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'contribution',
    user_id: '456',
    target_id: '1',
    message: 'contributed to your birthday wishlist',
    amount: 50,
    created_at: '2023-05-18T14:30:00Z',
    user: {
      username: 'john_smith',
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '2',
    type: 'fulfillment',
    user_id: '789',
    target_id: '1',
    message: 'purchased the headphones from your birthday wishlist',
    created_at: '2023-05-17T09:15:00Z',
    user: {
      username: 'sarah_j',
      avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '3',
    type: 'thanks',
    user_id: '123',
    target_id: '2',
    message: 'sent you a thank you note for the office chair',
    created_at: '2023-05-16T16:45:00Z',
    user: {
      username: 'alex_walker',
      avatar_url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
];

const Dashboard = () => {
  const { user } = useAuthStore();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, fetch data from API
    const fetchData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setWishlists(mockWishlists);
      setActivities(mockActivities);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  // Filter wishlists based on search term and filter
  const filteredWishlists = wishlists.filter((wishlist) => {
    const matchesSearch = wishlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (wishlist.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'public') return matchesSearch && wishlist.is_public;
    if (filter === 'private') return matchesSearch && !wishlist.is_public;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
          <p className="mt-2 text-lg">Manage your wishlists and see your recent activity</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Wishlists</h2>
              <Link to="/wishlists/new" className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                New Wishlist
              </Link>
            </div>
            
            {/* Search and filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search wishlists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex">
                <button
                  className={`flex items-center rounded-l-md px-4 py-2 text-sm font-medium ${
                    filter === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  All
                </button>
                <button
                  className={`flex items-center px-4 py-2 text-sm font-medium ${
                    filter === 'public' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFilter('public')}
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Public
                </button>
                <button
                  className={`flex items-center rounded-r-md px-4 py-2 text-sm font-medium ${
                    filter === 'private' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFilter('private')}
                >
                  <ListFilter className="mr-2 h-4 w-4" />
                  Private
                </button>
              </div>
            </div>
            
            {/* Wishlists grid */}
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="animate-pulse rounded-lg bg-white p-6 shadow-sm">
                    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="mt-4 h-4 w-1/2 rounded bg-gray-200"></div>
                    <div className="mt-6 h-2 w-full rounded bg-gray-200"></div>
                    <div className="mt-2 h-2 w-5/6 rounded bg-gray-200"></div>
                    <div className="mt-6 h-8 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            ) : filteredWishlists.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredWishlists.map((wishlist) => (
                  <WishlistCard key={wishlist.id} wishlist={wishlist} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">No wishlists found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm
                    ? `No results for "${searchTerm}"`
                    : "You haven't created any wishlists yet."}
                </p>
                <Link to="/wishlists/new" className="btn-primary mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Wishlist
                </Link>
              </div>
            )}
          </div>
          
          {/* Activity feed */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Recent Activity</h2>
            
            <ActivityFeed activities={activities} isLoading={isLoading} />
            
            {!isLoading && activities.length === 0 && (
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <p className="text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;