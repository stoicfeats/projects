import { useState, useEffect } from "react";
import { ViewToggle } from "./ViewToggle";
import { BookmarkGrid } from "./BookmarkGrid";
import { BookmarkGallery } from "./BookmarkGallery";
import { BookmarkCard } from "./BookmarkCard";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "@/api/bookmarks";
import { getLocalBookmarks } from "@/data/localBookmarks";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "grid" | "gallery" | "card";

export function BookmarkViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    try {
      setLoading(true);
      const data = getLocalBookmarks();
      setBookmarks(data);
      toast({
        title: "Success",
        description: `Loaded ${data.length} bookmarks from local data`,
      });
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      toast({
        title: "Error",
        description: "Failed to load bookmarks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // For now, just reload the local data
      // In the future, you could implement file parsing here
      toast({
        title: "Info",
        description: "File upload not implemented yet. Using local data.",
      });
      loadBookmarks();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload bookmarks",
        variant: "destructive",
      });
    }
  };

  const renderView = () => {
    switch (viewMode) {
      case "grid":
        return <BookmarkGrid bookmarks={bookmarks} />;
      case "gallery":
        return <BookmarkGallery bookmarks={bookmarks} />;
      case "card":
        return <BookmarkCard bookmarks={bookmarks} />;
      default:
        return <BookmarkGrid bookmarks={bookmarks} />;
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Your Bookmarks</h2>
            <p className="text-muted-foreground flex items-center mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {bookmarks.length} saved tweets (local data)
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="shadow-sm"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload JSON
              </Button>
            </div>
            <ViewToggle value={viewMode} onValueChange={setViewMode} />
          </div>
        </div>
      </div>
      
      <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading bookmarks...</div>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-muted-foreground mb-4">No bookmarks found</div>
            <div className="text-sm text-muted-foreground">Upload a JSON file to get started</div>
          </div>
        ) : (
          renderView()
        )}
      </div>
    </div>
  );
}