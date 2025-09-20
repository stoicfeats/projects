import { Heart, MessageCircle, Repeat2 } from "lucide-react";

interface Bookmark {
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

interface BookmarkGalleryProps {
  bookmarks: Bookmark[];
}

export function BookmarkGallery({ bookmarks }: BookmarkGalleryProps) {
  return (
    <div className="space-y-6">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold">
                {bookmark.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-foreground">{bookmark.author}</h3>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-sm">{bookmark.username}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-sm">{bookmark.timestamp}</span>
              </div>
              
              <p className="text-foreground mb-4 leading-relaxed">{bookmark.text}</p>
              
              {bookmark.hasImage && (
                <div className="w-full max-w-md h-48 rounded-lg mb-4 overflow-hidden">
                  {bookmark.imageUrl ? (
                    <img 
                      src={bookmark.imageUrl} 
                      alt="Tweet content"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Image Content</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center space-x-6 text-muted-foreground">
                <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                  <Repeat2 className="h-5 w-5" />
                  <span className="text-sm">{bookmark.retweets}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{bookmark.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}