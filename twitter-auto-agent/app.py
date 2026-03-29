#!/usr/bin/env python3
"""
Twitter Auto Agent - Web Dashboard
Flask application for managing thoughts and viewing tweet gallery
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for, send_from_directory
import os
import json
from datetime import datetime
from dotenv import load_dotenv

from database import TweetDatabase
from twitter_client import TwitterClient

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'your-secret-key-change-this')

# Initialize database
db = TweetDatabase()
twitter_client = TwitterClient()

@app.route('/')
def dashboard():
    """Main dashboard showing stats and recent activity"""
    stats = db.get_stats()
    recent_thoughts = db.get_all_thoughts()[:10]  # Last 10 thoughts
    recent_tweets = db.get_posted_tweets_with_screenshots()[:5]  # Last 5 posted tweets
    
    return render_template('dashboard.html', 
                         stats=stats, 
                         recent_thoughts=recent_thoughts,
                         recent_tweets=recent_tweets,
                         twitter_connected=twitter_client.is_connected())

@app.route('/thoughts')
def thoughts():
    """View and manage all thoughts"""
    status_filter = request.args.get('status', 'all')
    
    if status_filter == 'all':
        thoughts = db.get_all_thoughts()
    else:
        thoughts = db.get_all_thoughts(status=status_filter)
    
    return render_template('thoughts.html', thoughts=thoughts, current_filter=status_filter)

@app.route('/add-thought', methods=['GET', 'POST'])
def add_thought():
    """Add a new thought/tweet idea"""
    if request.method == 'POST':
        content = request.form.get('content', '').strip()
        tags_str = request.form.get('tags', '').strip()
        priority = int(request.form.get('priority', 1))
        notes = request.form.get('notes', '').strip()
        
        if content:
            # Parse tags
            tags = [tag.strip() for tag in tags_str.split(',') if tag.strip()] if tags_str else []
            
            # Add to database
            thought_id = db.add_thought(content, tags, priority, notes)
            
            if request.headers.get('Content-Type') == 'application/json':
                return jsonify({'success': True, 'thought_id': thought_id})
            else:
                return redirect(url_for('thoughts'))
        else:
            if request.headers.get('Content-Type') == 'application/json':
                return jsonify({'success': False, 'error': 'Content is required'})
    
    return render_template('add_thought.html')

@app.route('/gallery')
def gallery():
    """View gallery of tweet screenshots"""
    tweets = db.get_posted_tweets_with_screenshots()
    return render_template('gallery.html', tweets=tweets)

@app.route('/gallery/<path:filename>')
def gallery_image(filename):
    """Serve gallery images"""
    gallery_path = os.getenv('GALLERY_PATH', './gallery')
    return send_from_directory(gallery_path, filename)

@app.route('/api/thoughts', methods=['GET', 'POST'])
def api_thoughts():
    """API endpoint for thoughts management"""
    if request.method == 'POST':
        data = request.get_json()
        
        content = data.get('content', '').strip()
        tags = data.get('tags', [])
        priority = data.get('priority', 1)
        notes = data.get('notes', '')
        
        if content:
            thought_id = db.add_thought(content, tags, priority, notes)
            return jsonify({'success': True, 'thought_id': thought_id})
        else:
            return jsonify({'success': False, 'error': 'Content is required'}), 400
    
    # GET request
    status_filter = request.args.get('status')
    thoughts = db.get_all_thoughts(status_filter) if status_filter else db.get_all_thoughts()
    
    return jsonify({'thoughts': thoughts})

@app.route('/api/stats')
def api_stats():
    """API endpoint for statistics"""
    stats = db.get_stats()
    return jsonify(stats)

@app.route('/api/post-now', methods=['POST'])
def api_post_now():
    """API endpoint to manually trigger a tweet post"""
    try:
        # Import agent functionality
        from agent import TwitterAutoAgent
        agent = TwitterAutoAgent()
        
        # Post next tweet
        agent.post_next_tweet()
        
        return jsonify({'success': True, 'message': 'Tweet posting initiated'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/test-connection')
def api_test_connection():
    """Test Twitter API connection"""
    connected = twitter_client.test_connection()
    return jsonify({'connected': connected})

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    print("🚀 Starting Twitter Auto Agent Dashboard...")
    print(f"📊 Dashboard will be available at: http://localhost:5000")
    
    # Create logs directory
    os.makedirs('./logs', exist_ok=True)
    
    # Run Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    )