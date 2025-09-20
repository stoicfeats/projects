import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Download, Link } from "lucide-react";

export function ExportPanel() {
  const [twitterUrl, setTwitterUrl] = useState("");

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Export Bookmarks</h2>
          <p className="text-muted-foreground">Connect your Twitter account or provide a URL to export your bookmarks.</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Twitter className="h-5 w-5 text-blue-400" />
              Connect with Twitter
            </CardTitle>
            <CardDescription>
              Authorize Stash to access your Twitter bookmarks directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              <Twitter className="h-4 w-4 mr-2" />
              Connect Twitter Account
            </Button>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Import from URL
            </CardTitle>
            <CardDescription>
              Paste a Twitter bookmark export URL to import your saved tweets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="twitter-url" className="text-sm font-medium">
                Twitter Bookmark URL
              </label>
              <Input
                id="twitter-url"
                placeholder="https://twitter.com/i/bookmarks"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
              />
            </div>
            <Button 
              className="w-full" 
              variant="outline"
              disabled={!twitterUrl.trim()}
            >
              <Download className="h-4 w-4 mr-2" />
              Import Bookmarks
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>
              Choose how you want to export your bookmarks once imported.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export as JSON
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export as HTML
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}