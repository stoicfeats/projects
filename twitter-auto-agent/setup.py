#!/usr/bin/env python3
"""
Setup script for Twitter Auto Agent
Handles initial configuration and setup
"""

import os
import shutil
from dotenv import load_dotenv

def setup_environment():
    """Setup environment file"""
    if not os.path.exists('.env'):
        print("📝 Creating .env file from template...")
        shutil.copy('.env.example', '.env')
        print("✅ Created .env file. Please edit it with your API credentials.")
        return False
    else:
        print("✅ .env file already exists")
        return True

def setup_directories():
    """Create necessary directories"""
    directories = ['logs', 'gallery', 'templates']
    
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"📁 Created {directory}/ directory")
        else:
            print(f"✅ {directory}/ directory exists")

def check_dependencies():
    """Check if required dependencies are installed"""
    required_packages = [
        'tweepy', 'flask', 'requests', 'python-dotenv', 
        'schedule', 'beautifulsoup4', 'selenium', 'Pillow'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package} is installed")
        except ImportError:
            missing_packages.append(package)
            print(f"❌ {package} is missing")
    
    if missing_packages:
        print(f"\n📦 Install missing packages with: pip install {' '.join(missing_packages)}")
        return False
    
    return True

def validate_env_file():
    """Validate environment file has required variables"""
    load_dotenv()
    
    required_vars = [
        'TWITTER_BEARER_TOKEN',
        'TWITTER_API_KEY', 
        'TWITTER_API_SECRET',
        'TWITTER_ACCESS_TOKEN',
        'TWITTER_ACCESS_TOKEN_SECRET'
    ]
    
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var) or os.getenv(var) == f'your_{var.lower()}_here':
            missing_vars.append(var)
    
    if missing_vars:
        print(f"\n⚠️  Please configure these environment variables in .env:")
        for var in missing_vars:
            print(f"   - {var}")
        return False
    
    print("✅ All required environment variables are configured")
    return True

def main():
    """Main setup function"""
    print("🔧 Setting up Twitter Auto Agent...")
    print("=" * 50)
    
    # Setup directories
    setup_directories()
    print()
    
    # Setup environment
    env_exists = setup_environment()
    print()
    
    # Check dependencies
    deps_ok = check_dependencies()
    print()
    
    # Validate environment if file exists
    env_ok = validate_env_file() if env_exists else False
    print()
    
    # Final status
    if deps_ok and env_ok:
        print("🎉 Setup complete! You can now run the agent:")
        print("   python run.py        # Run both dashboard and agent")
        print("   python app.py        # Run only the web dashboard")
        print("   python agent.py      # Run only the automation agent")
        print()
        print("📊 Dashboard: http://localhost:5000")
    else:
        print("⚠️  Setup incomplete. Please address the issues above before running.")
        if not deps_ok:
            print("   Run: pip install -r requirements.txt")
        if not env_ok:
            print("   Edit: .env file with your API credentials")

if __name__ == "__main__":
    main()