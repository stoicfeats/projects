"""
Configuration settings for Twitter Auto Agent
"""

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    
    # Twitter API Configuration
    TWITTER_BEARER_TOKEN = os.getenv('TWITTER_BEARER_TOKEN')
    TWITTER_API_KEY = os.getenv('TWITTER_API_KEY')
    TWITTER_API_SECRET = os.getenv('TWITTER_API_SECRET')
    TWITTER_ACCESS_TOKEN = os.getenv('TWITTER_ACCESS_TOKEN')
    TWITTER_ACCESS_TOKEN_SECRET = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
    
    # TweetPik API Configuration
    TWEETPIK_API_KEY = os.getenv('TWEETPIK_API_KEY')
    
    # Agent Configuration
    POSTING_INTERVAL_HOURS = float(os.getenv('POSTING_INTERVAL_HOURS', '2.5'))
    MIN_POSTING_INTERVAL_HOURS = float(os.getenv('MIN_POSTING_INTERVAL_HOURS', '2'))
    MAX_POSTING_INTERVAL_HOURS = float(os.getenv('MAX_POSTING_INTERVAL_HOURS', '3'))
    
    # File Paths
    GALLERY_PATH = os.getenv('GALLERY_PATH', './gallery')
    LOGS_PATH = os.getenv('LOGS_PATH', './logs')
    DATABASE_PATH = os.getenv('DATABASE_PATH', './tweets.db')
    
    # Flask Configuration
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'your-secret-key-change-this')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    # Screenshot Configuration
    SCREENSHOT_FORMAT = os.getenv('SCREENSHOT_FORMAT', 'png')
    SCREENSHOT_THEME = os.getenv('SCREENSHOT_THEME', 'light')  # light, dark
    SCREENSHOT_QUALITY = os.getenv('SCREENSHOT_QUALITY', 'high')  # high, medium, low
    
    @classmethod
    def validate_config(cls) -> dict:
        """Validate configuration and return status"""
        issues = []
        
        # Check Twitter API credentials
        twitter_creds = [
            cls.TWITTER_BEARER_TOKEN,
            cls.TWITTER_API_KEY,
            cls.TWITTER_API_SECRET,
            cls.TWITTER_ACCESS_TOKEN,
            cls.TWITTER_ACCESS_TOKEN_SECRET
        ]
        
        if not all(twitter_creds) or any(cred and 'your_' in cred for cred in twitter_creds):
            issues.append("Twitter API credentials not properly configured")
        
        # Check TweetPik API key
        if not cls.TWEETPIK_API_KEY or 'your_' in cls.TWEETPIK_API_KEY:
            issues.append("TweetPik API key not configured (optional but recommended)")
        
        # Check posting intervals
        if cls.MIN_POSTING_INTERVAL_HOURS >= cls.MAX_POSTING_INTERVAL_HOURS:
            issues.append("MIN_POSTING_INTERVAL_HOURS must be less than MAX_POSTING_INTERVAL_HOURS")
        
        return {
            'valid': len(issues) == 0,
            'issues': issues,
            'twitter_configured': not any('Twitter' in issue for issue in issues),
            'tweetpik_configured': not any('TweetPik' in issue for issue in issues)
        }

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}