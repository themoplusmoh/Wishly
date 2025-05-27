import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Heart, Edit, Gift, ExternalLink, Calendar, User, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Wishlist as WishlistType, WishlistItem } from '../types';

// Mock data - would come from API in real implementation
const mockWishlist: WishlistType = {
  id: '1',
  user_id: '123',
  title: 'Birthday Wishlist',
  description: 'Things I would love to get for my upcoming birthday! Thanks for checking out my wishlist. Feel free to contribute to any item or purchase it directly from the vendor link.',
  category: 'birthday',
  is_public: true,
  created_at: '2023-05-15T10:00:00Z',
  updated_at: '2023-05-15T10:00:00Z',
  items_count: 5,
  total_price: 450,
  fulfilled_price: 150,
};

const mockItems: WishlistItem[] = [
  {
    id: '1',
    wishlist_id: '1',
    name: 'Wireless Headphones',
    description: 'Sony WH-1000XM4 Noise Cancelling Headphones',
    price: 350,
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    product_url: 'https://example.com/headphones',
    created_at: '2023-05-15T10:00:00Z',
    updated_at: '2023-05-15T10:00:00Z',
    is_fulfilled: false,
    fulfilled_amount: 100,
    contributors_count: 2,
  },
  {
    id: '2',
    wishlist_id: '1',
    name: 'Smart Watch',
    description: 'Apple Watch Series 7',
    price: 400,
    image_url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    product_url: 'https://example.com/watch',
    created_at: '2023-05-15T10:00:00Z',
    updated_at: '2023-05-15T10:00:00Z',
    is_fulfilled: false,
    fulfilled_amount: 0,
    contributors_count: 0,
  },
  {
    id: '3',
    wishlist_id: '1',
    name: 'Coffee Maker',
    description: 'Breville Barista Express Espresso Machine',
    price: 700,
    image_url: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    product_url: 'https://example.com/coffee',
    created_at: '2023-05-15T10:00:00Z',
    updated_at: '2023-05-15T10:00:00Z',
    is_fulfilled: false,
    fulfilled_amount: 0,
    contributors_count: 0,
  },
  {
    id: '4',
    wishlist_id: '1',
    name: 'Kindle Paperwhite',
    description: 'Latest generation e-reader with adjustable warm light',
    price: 140,
    image_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    product_url: 'https://example.com/kindle',
    created_at: '2023-05-15T10:00:00Z',
    updated_at: '2023-05-15T10:00:00Z',
    is_fulfilled: true,
    fulfilled_amount: 140,
    contributors_count: 1,
  },
  {
    id: '5',
    wishlist_id: '1',
    name: 'Hiking Backpack',
    description: 'Osprey Atmos AG 65 Backpack',
    price: 300,
    image_url: 'https://images.pexels.com/photos/1178784/pexels-photo-1178784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    product_url: 'https://example.com/backpack',
    created_at: '2023-05-15T10:00:00Z',
    updated_at: '2023-05-15T10:00:00Z',
    is_fulfilled: false,
    fulfilled_amount: 0,
    contributors_count: 0,
  },
];

const WishlistPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [wishlist, setWishlist] = useState<WishlistType | null>(null);
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  useEffect(() => {
    // In a real implementation, fetch data from API
    const fetchData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setWishlist(mockWishlist);
      setItems(mockItems);
      setIsLoading(false);
    };
    
    fetchData();
  }, [id]);

  // Check if user is the owner of the wishlist
  const isOwner = user?.id === wishlist?.user_id;

  // Calculate overall fulfillment percentage
  const overallFulfillmentPercentage = wishlist?.total_price && wishlist.total_price > 0
    ? Math.min(Math.round((wishlist.fulfilled_price / wishlist.total_price) * 100), 100)
    : 0;

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleContribute = (item: WishlistItem) => {
    setSelectedItem(item);
    setIsContributeModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full border-b-2 border-primary-500 p-4">
          <div className="h-8 w-8"></div>
        </div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Wishlist Not Found</h1>
        <p className="mt-2 text-lg text-gray-600">
          The wishlist you're looking for doesn't exist or is private.
        </p>
        <Link to="/explore" className="btn-primary mt-6">
          Explore Other Wishlists
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Wishlist header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-2 flex items-center">
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                  {wishlist.category.charAt(0).toUpperCase() + wishlist.category.slice(1)}
                </span>
                <span className="ml-2 flex items-center text-sm text-white/80">
                  {wishlist.is_public ? (
                    <>
                      <Gift className="mr-1 h-4 w-4" /> Public Wishlist
                    </>
                  ) : (
                    <>
                      <Heart className="mr-1 h-4 w-4" /> Private Wishlist
                    </>
                  )}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{wishlist.title}</h1>
              <div className="mt-2 flex items-center text-sm text-white/80">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Created on {formatDate(wishlist.created_at)}</span>
                <span className="mx-2">•</span>
                <User className="mr-1 h-4 w-4" />
                <span>John Doe</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {isOwner && (
                <Link to={`/wishlists/${wishlist.id}/edit`} className="btn-outline border-white text-white hover:bg-white/10">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Wishlist
                </Link>
              )}
              <button className="btn-outline border-white text-white hover:bg-white/10">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </button>
            </div>
          </div>
          
          {wishlist.description && (
            <p className="mt-4 max-w-3xl text-white/90">{wishlist.description}</p>
          )}
          
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">
                Overall Fulfillment Progress
              </span>
              <span className="font-medium text-white">
                {overallFulfillmentPercentage}%
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
              <div 
                className="h-full rounded-full bg-white" 
                style={{ width: `${overallFulfillmentPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wishlist items */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Wishlist Items</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            // Calculate fulfillment percentage for this item
            const itemFulfillmentPercentage = Math.min(Math.round((item.fulfilled_amount / item.price) * 100), 100);
            
            return (
              <div key={item.id} className="card overflow-hidden">
                {item.image_url && (
                  <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {item.is_fulfilled && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="rounded-full bg-success-500 px-3 py-1 text-sm font-medium text-white">
                          Fulfilled!
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                )}
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">${item.price}</span>
                  {item.is_fulfilled ? (
                    <span className="text-sm font-medium text-success-600">Fulfilled</span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      ${item.fulfilled_amount} of ${item.price} funded
                    </span>
                  )}
                </div>
                
                {!item.is_fulfilled && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>{itemFulfillmentPercentage}% funded</span>
                      <span>{item.contributors_count} {item.contributors_count === 1 ? 'contributor' : 'contributors'}</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="h-full rounded-full bg-primary-500" 
                        style={{ width: `${itemFulfillmentPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {item.product_url && (
                    <a 
                      href={item.product_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-outline flex items-center justify-center"
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Buy
                    </a>
                  )}
                  
                  {!item.is_fulfilled && (
                    <button 
                      onClick={() => handleContribute(item)}
                      className="btn-primary flex items-center justify-center"
                    >
                      <Gift className="mr-1 h-4 w-4" />
                      Contribute
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {items.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">No items in this wishlist</h3>
            {isOwner && (
              <p className="mt-2 text-gray-500">
                Add some items to your wishlist to get started!
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Contribute Modal */}
      {isContributeModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Contribute to {selectedItem.name}</h3>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Contribution Amount
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  max={selectedItem.price - selectedItem.fulfilled_amount}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter amount"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Remaining amount needed: ${selectedItem.price - selectedItem.fulfilled_amount}
              </p>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Leave a Message (Optional)
              </label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Add a personal message..."
              ></textarea>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Make my contribution anonymous
                </span>
              </label>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsContributeModalOpen(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button className="btn-primary">
                Contribute ${selectedItem.price - selectedItem.fulfilled_amount}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;