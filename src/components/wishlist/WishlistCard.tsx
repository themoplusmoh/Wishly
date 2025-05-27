import { Link } from 'react-router-dom';
import { Calendar, Eye, EyeOff, ExternalLink, Gift } from 'lucide-react';
import type { Wishlist } from '../../types';

interface WishlistCardProps {
  wishlist: Wishlist;
}

const WishlistCard = ({ wishlist }: WishlistCardProps) => {
  const {
    id,
    title,
    description,
    category,
    is_public,
    created_at,
    items_count,
    total_price,
    fulfilled_price,
  } = wishlist;

  // Calculate fulfillment percentage
  const fulfillmentPercentage = total_price > 0 
    ? Math.min(Math.round((fulfilled_price / total_price) * 100), 100)
    : 0;

  // Format date
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Get category icon
  const getCategoryIcon = () => {
    switch (category) {
      case 'birthday':
        return '🎂';
      case 'wedding':
        return '💍';
      case 'holiday':
        return '🎄';
      case 'project':
        return '💻';
      case 'baby':
        return '👶';
      case 'graduation':
        return '🎓';
      case 'housewarming':
        return '🏠';
      case 'charity':
        return '💖';
      default:
        return '🎁';
    }
  };

  return (
    <div className="card group overflow-hidden transition-all hover:shadow-medium">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center">
            <span className="mr-2 text-xl">{getCategoryIcon()}</span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <span className="ml-2 flex items-center text-xs text-gray-500">
              {is_public ? (
                <>
                  <Eye className="mr-1 h-3 w-3" /> Public
                </>
              ) : (
                <>
                  <EyeOff className="mr-1 h-3 w-3" /> Private
                </>
              )}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <Calendar className="mr-1 h-3 w-3" />
        <span>Created {formattedDate}</span>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            Fulfillment Progress
          </span>
          <span className="font-medium text-gray-700">
            {fulfillmentPercentage}%
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full rounded-full bg-primary-500" 
            style={{ width: `${fulfillmentPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <Gift className="mr-1 inline-block h-4 w-4" />
          {items_count} {items_count === 1 ? 'item' : 'items'}
        </div>
        <Link 
          to={`/wishlists/${id}`}
          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View Wishlist
          <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default WishlistCard;