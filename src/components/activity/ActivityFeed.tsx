import { Loader2 } from 'lucide-react';
import type { Activity } from '../../types';

interface ActivityFeedProps {
  activities: Activity[];
  isLoading: boolean;
}

const ActivityFeed = ({ activities, isLoading }: ActivityFeedProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        No recent activity
      </div>
    );
  }

  // Format date relative to now (e.g., "2 days ago", "5 minutes ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contribution':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <span className="text-sm">💰</span>
          </div>
        );
      case 'fulfillment':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-100 text-success-600">
            <span className="text-sm">🎁</span>
          </div>
        );
      case 'thanks':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-100 text-accent-600">
            <span className="text-sm">❤️</span>
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <span className="text-sm">🔔</span>
          </div>
        );
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>{getActivityIcon(activity.type)}</div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user.username}</span>{' '}
                      {activity.message}
                      {activity.amount && (
                        <span className="ml-1 font-medium text-primary-600">
                          ${activity.amount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-gray-500">
                    <time dateTime={activity.created_at}>
                      {formatRelativeTime(activity.created_at)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;