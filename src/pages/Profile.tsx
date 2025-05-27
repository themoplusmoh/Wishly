import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, User, Mail, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
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

const Profile = () => {
  const { user, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('johndoe');
  const [fullName, setFullName] = useState('John Doe');
  const [bio, setBio] = useState('I love technology, hiking, and reading!');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    // In a real implementation, save to API
    // For demo, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsEditing(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-white">
                <User className="h-12 w-12" />
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-600 shadow-md hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            <h1 className="text-3xl font-bold">{isEditing ? 'Edit Profile' : fullName}</h1>
            <div className="mt-2 flex items-center justify-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            {!isEditing && (
              <p className="mt-4 max-w-md">{bio}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isEditing ? (
          <div className="mx-auto max-w-2xl">
            <div className="card">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Edit Profile</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="input"
                    ></textarea>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>
                  <div className="mt-1 flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <button className="ml-4 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Change
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-outline"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 card">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      value={user?.email}
                      disabled
                      className="input bg-gray-50"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Password</h3>
                  <button className="mt-1 text-sm font-medium text-primary-600 hover:text-primary-500">
                    Change password
                  </button>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={logout}
                    className="flex items-center text-error-600 hover:text-error-700"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Wishlists</h2>
              <Link to="/wishlists/new" className="btn-primary">
                Create New Wishlist
              </Link>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockWishlists.map((wishlist) => (
                <WishlistCard key={wishlist.id} wishlist={wishlist} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;