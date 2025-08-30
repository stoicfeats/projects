# Twitter Auto Agent - Setup Guide

## 🎯 What This Does

This agent automatically:
1. **Stores your thoughts** in a simple database
2. **Posts tweets every 2-3 hours** from your thought collection
3. **Captures beautiful screenshots** of your tweets using TweetPik
4. **Organizes everything** in a web dashboard and gallery

## 🚀 Quick Start

### 1. Run Setup
```bash
chmod +x start.sh
./start.sh
```

### 2. Configure API Credentials

Edit the `.env` file with your credentials:

#### Twitter API Setup:
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app (or use existing)
3. Generate API keys with **Read and Write** permissions
4. Copy credentials to `.env` file

#### TweetPik API Setup (Optional but Recommended):
1. Visit [TweetPik](https://tweethunter.io/tweetpik)
2. Sign up for an account
3. Get your API key from the dashboard
4. Add to `.env` file

### 3. Start the System
```bash
python run.py
```

## 📊 Using the Dashboard

1. **Dashboard**: View stats and recent activity at http://localhost:5000
2. **Add Thoughts**: Use the web interface to dump all your ideas
3. **View Gallery**: See beautiful screenshots of all your posted tweets
4. **Monitor**: Check logs and statistics

## 🤖 How the Agent Works

1. **Storage**: Your thoughts are stored in SQLite database with priority levels
2. **Scheduling**: Agent picks highest priority thoughts and posts every 2-3 hours
3. **Screenshots**: After posting, it automatically captures a screenshot via TweetPik
4. **Gallery**: All screenshots are organized in a beautiful web gallery

## 🔧 Configuration Options

Edit `.env` to customize:

```env
# Posting frequency (in hours)
MIN_POSTING_INTERVAL_HOURS=2
MAX_POSTING_INTERVAL_HOURS=3

# File paths
GALLERY_PATH=./gallery
LOGS_PATH=./logs

# Screenshot settings
SCREENSHOT_THEME=light  # light or dark
SCREENSHOT_FORMAT=png
```

## 📱 Usage Tips

### Adding Thoughts
- **Priority 1**: Evergreen content, can wait
- **Priority 2**: Good content, post when ready  
- **Priority 3**: Time-sensitive, post ASAP

### Content Ideas
- Share insights from your work
- Ask thought-provoking questions
- Comment on industry trends
- Share personal experiences
- Provide helpful tips

### Best Practices
- Keep a good mix of content types
- Use relevant hashtags (1-3 per tweet)
- Add notes for context you want to remember
- Review the gallery to see what performs well

## 🐳 Docker Deployment

For production deployment:

```bash
# Build and run with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🔍 Troubleshooting

### Common Issues

**"Twitter client not connected"**
- Check your Twitter API credentials in `.env`
- Ensure your app has Read and Write permissions
- Verify tokens haven't expired

**"TweetPik screenshots failing"**
- Check your TweetPik API key
- Try the fallback web scraping method
- Ensure you have Chrome installed for Selenium

**"No thoughts to post"**
- Add some thoughts via the web dashboard
- Check that thoughts have 'pending' status
- Run the sample data generator

### Log Files
- **Agent logs**: `logs/agent.log`
- **Twitter logs**: `logs/twitter.log`
- **Web dashboard**: Console output

### Database
- Location: `tweets.db`
- Browse with: SQLite browser or CLI
- Backup regularly for safety

## 📞 Need Help?

1. Check the logs in `logs/` directory
2. Verify your `.env` configuration
3. Test connection via the dashboard
4. Run `python setup.py` to validate setup

## 🌟 Advanced Features

- **Manual posting**: Use "Post Now" button for immediate tweets
- **Filtering**: View thoughts by status (pending, posted, archived)
- **Statistics**: Track your posting and engagement metrics
- **Gallery**: Beautiful organization of all your tweet screenshots
- **API endpoints**: Programmatic access to add thoughts and trigger posts

Happy tweeting! 🐦✨