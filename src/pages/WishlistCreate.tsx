import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { WishlistCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FormItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  product_url: string;
}

const categories: { id: WishlistCategory; name: string; icon: string }[] = [
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'wedding', name: 'Wedding', icon: '💍' },
  { id: 'baby', name: 'Baby', icon: '👶' },
  { id: 'holiday', name: 'Holiday', icon: '🎄' },
  { id: 'graduation', name: 'Graduation', icon: '🎓' },
  { id: 'housewarming', name: 'Housewarming', icon: '🏠' },
  { id: 'charity', name: 'Charity', icon: '💖' },
  { id: 'project', name: 'Project', icon: '💻' },
  { id: 'other', name: 'Other', icon: '🎁' },
];

const WishlistCreate = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<WishlistCategory>('birthday');
  const [isPublic, setIsPublic] = useState(true);
  const [items, setItems] = useState<FormItem[]>([
    {
      id: uuidv4(),
      name: '',
      description: '',
      price: '',
      image_url: '',
      product_url: '',
    },
  ]);

  // Validation state
  const [errors, setErrors] = useState<{
    title?: string;
    items?: string;
    general?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validation
    let formErrors: {
      title?: string;
      items?: string;
      general?: string;
    } = {};
    
    if (!title.trim()) {
      formErrors.title = 'Title is required';
    }
    
    // Check if at least one item has name and price
    const hasValidItem = items.some(
      (item) => item.name.trim() !== '' && item.price.trim() !== ''
    );
    
    if (!hasValidItem) {
      formErrors.items = 'At least one item with name and price is required';
    }
    
    // Check if any item has invalid price
    const hasInvalidPrice = items.some(
      (item) => item.price.trim() !== '' && (isNaN(Number(item.price)) || Number(item.price) <= 0)
    );
    
    if (hasInvalidPrice) {
      formErrors.items = 'All items must have valid prices (greater than 0)';
    }
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      // In a real implementation, save to API
      // For demo, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        general: 'An error occurred while creating the wishlist. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        name: '',
        description: '',
        price: '',
        image_url: '',
        product_url: '',
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof FormItem, value: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-white/80 hover:text-white"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold">Create New Wishlist</h1>
          <p className="mt-2 text-lg">Add items you'd like to receive as gifts</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.general && (
            <div className="rounded-md bg-error-50 p-4">
              <p className="text-sm text-error-700">{errors.general}</p>
            </div>
          )}
          
          {/* Wishlist details section */}
          <div className="card overflow-visible">
            <h2 className="text-xl font-semibold text-gray-900">Wishlist Details</h2>
            
            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Wishlist Title <span className="text-error-600">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`input mt-1 ${errors.title ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="e.g., Birthday Wishlist, Wedding Registry"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-error-600">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input mt-1"
                  placeholder="Tell people about your wishlist..."
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as WishlistCategory)}
                  className="input mt-1"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Visibility</label>
                <div className="mt-2 flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsPublic(true)}
                    className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                      isPublic
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPublic(false)}
                    className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                      !isPublic
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <EyeOff className="mr-2 h-4 w-4" />
                    Private
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {isPublic
                    ? 'Public wishlists can be seen and contributed to by anyone.'
                    : 'Private wishlists are only visible to people you share the link with.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Wishlist items section */}
          <div className="card overflow-visible">
            <h2 className="text-xl font-semibold text-gray-900">Wishlist Items</h2>
            
            {errors.items && (
              <div className="mt-4 rounded-md bg-error-50 p-4">
                <p className="text-sm text-error-700">{errors.items}</p>
              </div>
            )}
            
            <div className="mt-6 space-y-8">
              {items.map((item, index) => (
                <div key={item.id} className="border-t border-gray-200 pt-6 first:border-0 first:pt-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Item {index + 1}
                    </h3>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-error-600 hover:text-error-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`item-name-${item.id}`} className="block text-sm font-medium text-gray-700">
                        Item Name <span className="text-error-600">*</span>
                      </label>
                      <input
                        type="text"
                        id={`item-name-${item.id}`}
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="input mt-1"
                        placeholder="e.g., Headphones, Coffee Maker"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`item-price-${item.id}`} className="block text-sm font-medium text-gray-700">
                        Price <span className="text-error-600">*</span>
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          id={`item-price-${item.id}`}
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                          className="input pl-7"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor={`item-description-${item.id}`} className="block text-sm font-medium text-gray-700">
                        Description (Optional)
                      </label>
                      <input
                        type="text"
                        id={`item-description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="input mt-1"
                        placeholder="Briefly describe the item"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`item-image-${item.id}`} className="block text-sm font-medium text-gray-700">
                        Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        id={`item-image-${item.id}`}
                        value={item.image_url}
                        onChange={(e) => updateItem(item.id, 'image_url', e.target.value)}
                        className="input mt-1"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`item-url-${item.id}`} className="block text-sm font-medium text-gray-700">
                        Product URL (Optional)
                      </label>
                      <input
                        type="url"
                        id={`item-url-${item.id}`}
                        value={item.product_url}
                        onChange={(e) => updateItem(item.id, 'product_url', e.target.value)}
                        className="input mt-1"
                        placeholder="https://example.com/product"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addItem}
                className="flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Plus className="mr-2 h-5 w-5 text-gray-500" />
                Add Another Item
              </button>
            </div>
          </div>
          
          {/* Submit buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Creating...' : 'Create Wishlist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WishlistCreate;