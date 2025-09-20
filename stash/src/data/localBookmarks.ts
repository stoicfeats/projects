import { Bookmark } from '@/api/bookmarks';

// Import the sample JSON data
import twitterBookmarksData from './sample-bookmarks.json';

// Transform Twitter bookmark data to our interface
function transformBookmark(tweet: any, index: number): Bookmark {
  return {
    id: tweet.id_str || tweet.id || `bookmark-${index}`,
    text: tweet.full_text || tweet.text || '',
    author: tweet.user?.name || 'Unknown',
    username: tweet.user?.screen_name ? `@${tweet.user.screen_name}` : '@unknown',
    timestamp: formatTimestamp(tweet.created_at),
    likes: tweet.favorite_count || 0,
    retweets: tweet.retweet_count || 0,
    hasImage: hasImageContent(tweet),
    imageUrl: getImageUrl(tweet)
  };
}

function formatTimestamp(timestamp: string): string {
  if (!timestamp) return 'Unknown';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'now';
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}w`;
}

function hasImageContent(tweet: any): boolean {
  return !!(
    tweet.entities?.media || 
    tweet.extended_entities?.media || 
    tweet.attachments?.media_keys ||
    tweet.media
  );
}

function getImageUrl(tweet: any): string | undefined {
  const media = tweet.entities?.media || 
               tweet.extended_entities?.media || 
               tweet.media;
  
  if (media && media.length > 0) {
    return media[0].media_url_https || media[0].url;
  }
  
  return undefined;
}

// Get the first 50 bookmarks
export const localBookmarks: Bookmark[] = twitterBookmarksData
  .slice(0, 50)
  .map((tweet, index) => transformBookmark(tweet, index));

export const getLocalBookmarks = (): Bookmark[] => {
  return localBookmarks;
};
