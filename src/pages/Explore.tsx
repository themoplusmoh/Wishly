import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import WishlistCard from '../components/wishlist/WishlistCard';
import { Wishlist } from '../types';

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
    user_id: '456',
    title: 'Wedding Registry',
    description: 'Help us celebrate our special day with these gift ideas',
    category: 'wedding',
    is_public: true,
    created_at: '2023-04-10T10:00:00Z',
    updated_at: '2023-04-10T10:00:00Z',
    items_count: 12,
    total_price: 2500,
    fulfilled_price: 1200,
  },
  {
    id: '3',
    user_id: '789',
    title: 'Charity Fundraiser',
    description: 'Support our local animal shelter with these needed supplies',
    category: 'charity',
    is_public: true,
    created_at: '2023-05-05T10:00:00Z',
    updated_at: '2023-05-05T10:00:00Z',
    items_count: 8,
    total_price: 1000,
    fulfilled_price: 350,
  },
  {
    id: '4',
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
    id: '5',
    user_id: '456',
    title: 'Baby Shower Registry',
    description: 'Expecting a little one soon! Here are some things we need.',
    category: 'baby',
    is_public: true,
    created_at: '2023-03-15T10:00:00Z',
    updated_at: '2023-03-15T10:00:00Z',
    items_count: 15,
    total_price: 1800,
    fulfilled_price: 900,
  },
  {
    id: '6',
    user_id: '789',
    title: 'Graduation Gifts',
    description: 'Help me celebrate my college graduation!',
    category: 'graduation',
    is_public: true,
    created_at: '2023-05-01T10:00:00Z',
    updated_at: '2023-05-01T10:00:00Z',
    items_count: 6,
    total_price: 800,
    fulfilled_price: 200,
  },
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'birthday', name: 'Birthday' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'baby', name: 'Baby' },
  { id: 'graduation', name: 'Graduation' },
  { id: 'charity', name: 'Charity' },
  { id: 'project', name: 'Project' },
  { id: 'holiday', name: 'Holiday' },
  { id: 'other', name: 'Other' },
];

const Explore = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, fetch data from API
    const fetchData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setWishlists(mockWishlists);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  // Filter wishlists based on search term and category
  const filteredWishlists = wishlists.filter((wishlist) => {
    const matchesSearch = wishlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (wishlist.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || wishlist.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort wishlists
  const sortedWishlists = [...filteredWishlists].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    if (sortBy === 'most-funded') {
      const percentA = a.total_price > 0 ? (a.fulfilled_price / a.total_price) * 100 : 0;
      const percentB = b.total_price > 0 ? (b.fulfilled_price / b.total_price) * 100 : 0;
      return percentB - percentA;
    }
    if (sortBy === 'least-funded') {
      const percentA = a.total_price > 0 ? (a.fulfilled_price / a.total_price) * 100 : 0;
      const percentB = b.total_price > 0 ? (b.fulfilled_price / b.total_price) * 100 : 0;
      return percentA - percentB;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Explore Wishlists</h1>
          <p className="mt-2 text-lg">Discover public wishlists from the community</p>
          
          <div className="mt-6 max-w-3xl">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full rounded-md border-0 bg-white py-2 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm"
                placeholder="Search wishlists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="flex items-center text-lg font-medium text-gray-900">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h3>
              </div>
              
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-gray-700">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        name="category"
                        type="radio"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 text-sm font-medium text-gray-700">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-funded">Most Funded</option>
                  <option value="least-funded">Least Funded</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
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
            ) : sortedWishlists.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-500">
                  Showing {sortedWishlists.length} {sortedWishlists.length === 1 ? 'result' : 'results'}
                </div>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
                  {sortedWishlists.map((wishlist) => (
                    <WishlistCard key={wishlist.id} wishlist={wishlist} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">No wishlists found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm
                    ? `No results for "${searchTerm}"`
                    : "Try adjusting your filters to find more wishlists."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;