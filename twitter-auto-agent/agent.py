#!/usr/bin/env python3
"""
Twitter Auto Agent - Main automation script
Runs continuously and posts tweets every 2-3 hours
"""

import schedule
import time
import random
import os
import logging
from datetime import datetime, timedelta
from dotenv import load_dotenv

from database import TweetDatabase
from twitter_client import TwitterClient
from tweetpik_client import TweetPikClient

load_dotenv()

class TwitterAutoAgent:
    def __init__(self):
        self.db = TweetDatabase()
        self.twitter = TwitterClient()
        self.tweetpik = TweetPikClient()
        self.setup_logging()
        self.setup_directories()
        
        # Configuration
        self.min_interval = float(os.getenv('MIN_POSTING_INTERVAL_HOURS', '2'))
        self.max_interval = float(os.getenv('MAX_POSTING_INTERVAL_HOURS', '3'))
        
    def setup_logging(self):
        """Setup comprehensive logging"""
        log_dir = os.getenv('LOGS_PATH', './logs')
        os.makedirs(log_dir, exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(f'{log_dir}/agent.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
        
    def setup_directories(self):
        """Create necessary directories"""
        directories = [
            os.getenv('GALLERY_PATH', './gallery'),
            os.getenv('LOGS_PATH', './logs')
        ]
        
        for directory in directories:
            os.makedirs(directory, exist_ok=True)
    
    def post_next_tweet(self):
        """Main method to post the next tweet and capture screenshot"""
        self.logger.info("Starting tweet posting cycle...")
        
        try:
            # Check if Twitter client is connected
            if not self.twitter.is_connected():
                self.logger.error("Twitter client not connected")
                self.db.log_action("post_tweet", "Twitter client not connected", False)
                return
            
            # Get next tweet to post
            next_thought = self.db.get_next_tweet_to_post()
            
            if not next_thought:
                self.logger.info("No pending tweets to post")
                self.db.log_action("post_tweet", "No pending tweets available", True)
                return
            
            # Post the tweet
            self.logger.info(f"Posting tweet: {next_thought['content'][:50]}...")
            tweet_result = self.twitter.post_tweet(next_thought['content'])
            
            if not tweet_result:
                self.logger.error("Failed to post tweet")
                self.db.log_action("post_tweet", f"Failed to post thought ID {next_thought['id']}", False)
                return
            
            # Record the posted tweet in database
            posted_tweet_id = self.db.mark_tweet_posted(
                next_thought['id'],
                tweet_result['tweet_id'],
                tweet_result['tweet_url'],
                tweet_result['content']
            )
            
            self.logger.info(f"Tweet posted successfully: {tweet_result['tweet_url']}")
            self.db.log_action("post_tweet", f"Posted tweet {tweet_result['tweet_id']}", True)
            
            # Wait a moment for tweet to be available
            time.sleep(10)
            
            # Capture screenshot
            self.capture_tweet_screenshot(tweet_result['tweet_url'], posted_tweet_id)
            
            # Schedule next post with random interval
            self.schedule_next_post()
            
        except Exception as e:
            self.logger.error(f"Error in post_next_tweet: {e}")
            self.db.log_action("post_tweet", f"Exception: {str(e)}", False)
    
    def capture_tweet_screenshot(self, tweet_url: str, posted_tweet_id: int):
        """Capture and save tweet screenshot"""
        try:
            self.logger.info(f"Capturing screenshot for: {tweet_url}")
            
            # Try TweetPik API first
            screenshot_path = self.tweetpik.capture_tweet_screenshot(tweet_url)
            
            # If API fails, try fallback method
            if not screenshot_path:
                self.logger.warning("TweetPik API failed, trying fallback method...")
                screenshot_path = self.tweetpik.capture_tweet_screenshot_fallback(tweet_url)
            
            if screenshot_path:
                # Update database with screenshot path
                self.db.update_screenshot_path(posted_tweet_id, screenshot_path)
                self.logger.info(f"Screenshot captured and saved: {screenshot_path}")
                self.db.log_action("capture_screenshot", f"Saved to {screenshot_path}", True)
            else:
                self.logger.error("Failed to capture screenshot with both methods")
                self.db.log_action("capture_screenshot", "Both API and fallback failed", False)
                
        except Exception as e:
            self.logger.error(f"Error capturing screenshot: {e}")
            self.db.log_action("capture_screenshot", f"Exception: {str(e)}", False)
    
    def schedule_next_post(self):
        """Schedule the next post with a random interval"""
        # Calculate random interval between min and max hours
        interval_hours = random.uniform(self.min_interval, self.max_interval)
        next_post_time = datetime.now() + timedelta(hours=interval_hours)
        
        self.logger.info(f"Next post scheduled for: {next_post_time.strftime('%Y-%m-%d %H:%M:%S')} "
                        f"(in {interval_hours:.1f} hours)")
        
        # Clear existing scheduled jobs and add new one
        schedule.clear()
        schedule.every(int(interval_hours * 60)).minutes.do(self.post_next_tweet)
    
    def start_agent(self):
        """Start the automation agent"""
        self.logger.info("🤖 Twitter Auto Agent starting...")
        
        # Initial checks
        if not self.twitter.test_connection():
            self.logger.error("❌ Twitter connection test failed. Check your credentials.")
            return
            
        # Log startup
        stats = self.db.get_stats()
        self.logger.info(f"📊 Current stats: {stats['pending_thoughts']} pending, "
                        f"{stats['posted_thoughts']} posted, "
                        f"{stats['screenshots_captured']} screenshots")
        
        # Schedule first post (immediate or with short delay)
        if stats['pending_thoughts'] > 0:
            self.logger.info("🚀 Posting first tweet in 30 seconds...")
            schedule.every(0.5).minutes.do(self.post_next_tweet)
        else:
            self.logger.info("📝 No pending tweets. Add some thoughts to get started!")
        
        # Start the scheduling loop
        self.logger.info("⏰ Agent is now running. Press Ctrl+C to stop.")
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
                
        except KeyboardInterrupt:
            self.logger.info("🛑 Agent stopped by user")
        except Exception as e:
            self.logger.error(f"❌ Agent crashed: {e}")
    
    def add_sample_thoughts(self):
        """Add some sample thoughts for testing"""
        sample_thoughts = [
            "Just built an amazing automation agent! 🤖 Sometimes the best solutions come from solving your own problems first.",
            "The future of content creation is definitely AI-assisted. We're not replacing creativity, we're amplifying it! ✨",
            "Pro tip: When building automation tools, always start with manual processes first. Understand the workflow before you automate it.",
            "There's something magical about having your thoughts automatically turn into beautiful content. Technology serving creativity! 🎨",
            "Building in public is scary but so rewarding. Every small project teaches you something new about both code and communication."
        ]
        
        for thought in sample_thoughts:
            self.db.add_thought(thought, tags=['automation', 'tech', 'ai'], priority=2)
        
        self.logger.info(f"Added {len(sample_thoughts)} sample thoughts to get you started!")

def main():
    """Main entry point"""
    agent = TwitterAutoAgent()
    
    # Add sample thoughts if database is empty
    stats = agent.db.get_stats()
    if stats['pending_thoughts'] == 0:
        print("📝 No thoughts found. Adding sample thoughts...")
        agent.add_sample_thoughts()
    
    # Start the agent
    agent.start_agent()

if __name__ == "__main__":
    main()