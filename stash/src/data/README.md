# Data Directory

This directory contains the bookmark data for the Stash app.

## Files

- `sample-bookmarks.json` - Sample Twitter bookmark data for development and testing
- `localBookmarks.ts` - Data service that transforms and loads bookmark data

## Using Your Own Data

To use your own Twitter bookmarks:

1. Export your bookmarks from Twitter as JSON
2. Replace `sample-bookmarks.json` with your exported file
3. Update the import in `localBookmarks.ts` if needed
4. The app will automatically load and display your bookmarks

## Data Format

The JSON file should contain an array of Twitter bookmark objects with the following structure:

```json
[
  {
    "id_str": "tweet_id",
    "text": "Tweet content",
    "user": {
      "name": "Display Name",
      "screen_name": "username"
    },
    "created_at": "2024-01-15T10:30:00.000Z",
    "favorite_count": 42,
    "retweet_count": 12,
    "entities": {
      "media": [
        {
          "media_url_https": "image_url",
          "type": "photo"
        }
      ]
    }
  }
]
```

## Security Note

**Never commit your real Twitter data to version control!** 

The `.gitignore` file is configured to exclude `twitter_bookmarks.json` to prevent accidentally committing personal data.
