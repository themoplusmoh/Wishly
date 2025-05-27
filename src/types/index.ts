export interface User {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  items_count: number;
  total_price: number;
  fulfilled_price: number;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  product_url?: string;
  created_at: string;
  updated_at: string;
  is_fulfilled: boolean;
  fulfilled_amount: number;
  contributors_count: number;
}

export interface Contribution {
  id: string;
  user_id: string;
  item_id: string;
  amount: number;
  message?: string;
  is_anonymous: boolean;
  created_at: string;
}

export interface Activity {
  id: string;
  type: 'contribution' | 'fulfillment' | 'thanks';
  user_id: string;
  target_id: string; // item_id or wishlist_id
  message?: string;
  amount?: number;
  created_at: string;
  user: {
    username: string;
    avatar_url?: string;
  };
}

export type WishlistCategory = 
  | 'birthday'
  | 'wedding'
  | 'baby'
  | 'holiday'
  | 'graduation'
  | 'housewarming'
  | 'charity'
  | 'project'
  | 'other';

export interface WishlistCategoryInfo {
  id: WishlistCategory;
  name: string;
  icon: string;
}