import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

interface BookmarkCardProps {
  bookmarks: Bookmark[];
}

export function BookmarkCard({ bookmarks }: BookmarkCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : bookmarks.length - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev < bookmarks.length - 1 ? prev + 1 : 0));
  };
  
  if (bookmarks.length === 0) return null;
  
  const currentBookmark = bookmarks[currentIndex];

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center space-x-4 w-full max-w-2xl">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="flex-shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Card className="flex-1 mx-4">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-semibold">
                  {currentBookmark.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{currentBookmark.author}</h3>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{currentBookmark.username}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{currentBookmark.timestamp}</span>
                </div>
                
                <p className="text-foreground text-lg leading-relaxed mb-6">{currentBookmark.text}</p>
                
                {currentBookmark.hasImage && (
                  <div className="w-full h-64 rounded-lg mb-6 overflow-hidden">
                    {currentBookmark.imageUrl ? (
                      <img 
                        src={currentBookmark.imageUrl} 
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
                
                <div className="flex items-center space-x-8 text-muted-foreground">
                  <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                    <MessageCircle className="h-6 w-6" />
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                    <Repeat2 className="h-6 w-6" />
                    <span>{currentBookmark.retweets}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                    <Heart className="h-6 w-6" />
                    <span>{currentBookmark.likes}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {bookmarks.length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="flex-shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}