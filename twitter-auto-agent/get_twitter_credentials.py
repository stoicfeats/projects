#!/usr/bin/env python3
"""
Helper script to guide users through getting Twitter API credentials
"""

def print_step(step_num, title, description):
    """Print a formatted step"""
    print(f"\n{'='*60}")
    print(f"STEP {step_num}: {title}")
    print('='*60)
    print(description)

def main():
    """Guide user through Twitter API setup"""
    
    print("🐦 Twitter API Credentials Setup Guide")
    print("="*60)
    print("This guide will help you get the API credentials needed for the Twitter Auto Agent.")
    
    print_step(1, "Create Twitter Developer Account", 
        """
1. Go to: https://developer.twitter.com/en/portal/dashboard
2. Sign in with your Twitter account
3. Apply for a developer account if you haven't already
4. Complete the application form (usually approved instantly for basic use)
        """)
    
    print_step(2, "Create a New App",
        """
1. Click "Create App" in the developer dashboard
2. Give your app a name (e.g., "My Twitter Auto Agent")  
3. Add a description of what your app does
4. Complete the required fields
        """)
    
    print_step(3, "Generate API Keys",
        """
1. Go to your app's "Keys and Tokens" tab
2. Generate the following:
   - API Key and Secret (Consumer Keys)
   - Bearer Token
   - Access Token and Secret

⚠️  IMPORTANT: Set your app permissions to "Read and Write" 
   (in the app Settings tab) BEFORE generating Access Tokens!
        """)
    
    print_step(4, "Add Credentials to .env File",
        """
Copy the generated credentials to your .env file:

TWITTER_BEARER_TOKEN=your_bearer_token_here
TWITTER_API_KEY=your_api_key_here  
TWITTER_API_SECRET=your_api_secret_here
TWITTER_ACCESS_TOKEN=your_access_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret_here
        """)
    
    print_step(5, "Test Connection",
        """
After updating .env, test your connection:

python -c "from twitter_client import TwitterClient; print('✅ Connected!' if TwitterClient().test_connection() else '❌ Connection failed')"
        """)
    
    print("\n🎉 That's it! Once your credentials are configured:")
    print("   python run.py  # Start the full system")
    print("   http://localhost:5000  # Access your dashboard")
    
    print("\n📋 Need TweetPik API too?")
    print("   1. Visit: https://tweethunter.io/tweetpik")
    print("   2. Sign up and get your API key")
    print("   3. Add TWEETPIK_API_KEY to your .env file")
    print("   (TweetPik is optional - the system has a fallback method)")

if __name__ == "__main__":
    main()