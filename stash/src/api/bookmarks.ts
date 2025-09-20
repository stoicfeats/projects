const API_BASE_URL = 'http://localhost:3001/api';

export interface Bookmark {
  id: string;
  text: string;
  author: string;
  username: string;
  timestamp: string;
  likes: number;
  retweets: number;
  hasImage: boolean;
  imageUrl?: string;
}

export const bookmarksApi = {
  async getBookmarks(): Promise<Bookmark[]> {
    const response = await fetch(`${API_BASE_URL}/bookmarks`);
    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }
    return response.json();
  },

  async uploadBookmarks(file: File): Promise<{ message: string; count: number }> {
    const formData = new FormData();
    formData.append('bookmarks', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload bookmarks');
    }

    return response.json();
  },
};
