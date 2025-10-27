import tweepy
import os
from typing import Optional, Dict
import logging
from dotenv import load_dotenv

load_dotenv()

class TwitterClient:
    def __init__(self):
        self.setup_logging()
        self.client = self._setup_client()
        
    def setup_logging(self):
        """Setup logging for Twitter operations"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('logs/twitter.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def _setup_client(self) -> Optional[tweepy.Client]:
        """Setup Twitter API client with credentials"""
        try:
            # Get credentials from environment variables
            bearer_token = os.getenv('TWITTER_BEARER_TOKEN')
            api_key = os.getenv('TWITTER_API_KEY')
            api_secret = os.getenv('TWITTER_API_SECRET')
            access_token = os.getenv('TWITTER_ACCESS_TOKEN')
            access_token_secret = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
            
            if not all([bearer_token, api_key, api_secret, access_token, access_token_secret]):
                self.logger.error("Missing Twitter API credentials in environment variables")
                return None
            
            # Create client with all credentials for posting
            client = tweepy.Client(
                bearer_token=bearer_token,
                consumer_key=api_key,
                consumer_secret=api_secret,
                access_token=access_token,
                access_token_secret=access_token_secret,
                wait_on_rate_limit=True
            )
            
            # Test the connection
            try:
                user = client.get_me()
                self.logger.info(f"Successfully connected to Twitter as @{user.data.username}")
                return client
            except Exception as e:
                self.logger.error(f"Failed to authenticate with Twitter: {e}")
                return None
                
        except Exception as e:
            self.logger.error(f"Error setting up Twitter client: {e}")
            return None
    
    def post_tweet(self, content: str) -> Optional[Dict]:
        """Post a tweet and return tweet information"""
        if not self.client:
            self.logger.error("Twitter client not available")
            return None
            
        try:
            # Ensure content fits Twitter's character limit
            if len(content) > 280:
                self.logger.warning(f"Tweet content too long ({len(content)} chars), truncating...")
                content = content[:277] + "..."
            
            # Post the tweet
            response = self.client.create_tweet(text=content)
            
            if response.data:
                tweet_id = response.data['id']
                tweet_url = f"https://twitter.com/i/web/status/{tweet_id}"
                
                self.logger.info(f"Successfully posted tweet: {tweet_url}")
                
                return {
                    'tweet_id': tweet_id,
                    'tweet_url': tweet_url,
                    'content': content,
                    'success': True
                }
            else:
                self.logger.error("Failed to post tweet - no response data")
                return None
                
        except tweepy.TooManyRequests:
            self.logger.error("Rate limit exceeded when posting tweet")
            return None
        except tweepy.Forbidden:
            self.logger.error("Forbidden - check your API permissions")
            return None
        except Exception as e:
            self.logger.error(f"Error posting tweet: {e}")
            return None
    
    def get_tweet_info(self, tweet_id: str) -> Optional[Dict]:
        """Get information about a specific tweet"""
        if not self.client:
            return None
            
        try:
            tweet = self.client.get_tweet(
                tweet_id, 
                tweet_fields=['created_at', 'author_id', 'public_metrics']
            )
            
            if tweet.data:
                return {
                    'id': tweet.data.id,
                    'text': tweet.data.text,
                    'created_at': tweet.data.created_at,
                    'author_id': tweet.data.author_id,
                    'public_metrics': tweet.data.public_metrics
                }
            
        except Exception as e:
            self.logger.error(f"Error getting tweet info: {e}")
            
        return None
    
    def is_connected(self) -> bool:
        """Check if the Twitter client is properly connected"""
        return self.client is not None
        
    def test_connection(self) -> bool:
        """Test the Twitter API connection"""
        if not self.client:
            return False
            
        try:
            user = self.client.get_me()
            return user.data is not None
        except:
            return False