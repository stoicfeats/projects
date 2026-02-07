# Twitter Auto Agent

An intelligent agent that automatically posts your thoughts to Twitter and captures beautiful screenshots.

## Features

- 🧠 **Thought Storage**: Store your tweet ideas in a simple database
- 🤖 **Auto Posting**: Posts tweets every 2-3 hours automatically  
- 📸 **Screenshot Capture**: Uses TweetPik API to capture beautiful tweet images
- 🖼️ **Gallery**: Web-based gallery to view all your tweet screenshots
- 🎛️ **Dashboard**: Simple web interface to manage your thoughts and view statistics

## Setup

1. Install dependencies: `pip install -r requirements.txt`
2. Configure your Twitter API credentials in `.env`
3. Configure your TweetPik API key in `.env`
4. Run the web dashboard: `python app.py`
5. Start the automation agent: `python agent.py`

## How It Works

1. Add your thoughts/ideas through the web dashboard
2. The agent picks them up and posts them to Twitter on schedule
3. After posting, it captures a screenshot using TweetPik
4. Screenshots are saved to the gallery for you to view and share

## Configuration

- **Posting Interval**: 2-3 hours (configurable)
- **Storage**: SQLite database (no setup required)
- **Screenshots**: Saved to `gallery/` directory
- **Logs**: Available in `logs/` directory