import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

interface BookmarkGridProps {
  bookmarks: Bookmark[];
}

export function BookmarkGrid({ bookmarks }: BookmarkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id} className="hover:shadow-lg transition-all duration-200 bg-card/80 backdrop-blur-sm border-border/50 hover:border-border hover:bg-card/90">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {bookmark.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{bookmark.author}</p>
                <p className="text-xs text-muted-foreground">{bookmark.username} · {bookmark.timestamp}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm mb-3 leading-relaxed">{bookmark.text}</p>
            
            {bookmark.hasImage && (
              <div className="w-full h-32 rounded-lg mb-3 overflow-hidden">
                {bookmark.imageUrl ? (
                  <img 
                    src={bookmark.imageUrl} 
                    alt="Tweet content"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Image</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex items-center space-x-1">
                  <Repeat2 className="h-4 w-4" />
                  <span className="text-xs">{bookmark.retweets}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{bookmark.likes}</span>
                </div>
              </div>
              <Share className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}