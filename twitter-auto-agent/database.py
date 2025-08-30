import sqlite3
import datetime
from typing import List, Dict, Optional
import json

class TweetDatabase:
    def __init__(self, db_path: str = "tweets.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize the database with required tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Table for storing tweet thoughts/ideas
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tweet_thoughts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                tags TEXT,  -- JSON array of tags
                priority INTEGER DEFAULT 1,  -- 1=low, 2=medium, 3=high
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                scheduled_for TIMESTAMP,
                status TEXT DEFAULT 'pending',  -- pending, posted, archived
                notes TEXT
            )
        ''')
        
        # Table for storing posted tweets
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS posted_tweets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                thought_id INTEGER,
                tweet_id TEXT,
                tweet_url TEXT,
                content TEXT,
                posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                screenshot_path TEXT,
                engagement_stats TEXT,  -- JSON for likes, retweets, etc
                FOREIGN KEY (thought_id) REFERENCES tweet_thoughts (id)
            )
        ''')
        
        # Table for storing agent activity logs
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS agent_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action TEXT,
                details TEXT,
                success BOOLEAN,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def add_thought(self, content: str, tags: List[str] = None, priority: int = 1, notes: str = "") -> int:
        """Add a new tweet thought to the database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        tags_json = json.dumps(tags) if tags else "[]"
        
        cursor.execute('''
            INSERT INTO tweet_thoughts (content, tags, priority, notes)
            VALUES (?, ?, ?, ?)
        ''', (content, tags_json, priority, notes))
        
        thought_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return thought_id
    
    def get_next_tweet_to_post(self) -> Optional[Dict]:
        """Get the next tweet that should be posted"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get pending tweets, prioritized by priority then creation date
        cursor.execute('''
            SELECT id, content, tags, priority, created_at, notes
            FROM tweet_thoughts 
            WHERE status = 'pending'
            ORDER BY priority DESC, created_at ASC
            LIMIT 1
        ''')
        
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return {
                'id': result[0],
                'content': result[1],
                'tags': json.loads(result[2]) if result[2] else [],
                'priority': result[3],
                'created_at': result[4],
                'notes': result[5]
            }
        return None
    
    def mark_tweet_posted(self, thought_id: int, tweet_id: str, tweet_url: str, content: str) -> int:
        """Mark a thought as posted and record the tweet details"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Update thought status
        cursor.execute('''
            UPDATE tweet_thoughts 
            SET status = 'posted' 
            WHERE id = ?
        ''', (thought_id,))
        
        # Record the posted tweet
        cursor.execute('''
            INSERT INTO posted_tweets (thought_id, tweet_id, tweet_url, content)
            VALUES (?, ?, ?, ?)
        ''', (thought_id, tweet_id, tweet_url, content))
        
        posted_tweet_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return posted_tweet_id
    
    def update_screenshot_path(self, posted_tweet_id: int, screenshot_path: str):
        """Update the screenshot path for a posted tweet"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE posted_tweets 
            SET screenshot_path = ? 
            WHERE id = ?
        ''', (screenshot_path, posted_tweet_id))
        
        conn.commit()
        conn.close()
    
    def get_all_thoughts(self, status: str = None) -> List[Dict]:
        """Get all thoughts, optionally filtered by status"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if status:
            cursor.execute('''
                SELECT id, content, tags, priority, created_at, status, notes
                FROM tweet_thoughts 
                WHERE status = ?
                ORDER BY created_at DESC
            ''', (status,))
        else:
            cursor.execute('''
                SELECT id, content, tags, priority, created_at, status, notes
                FROM tweet_thoughts 
                ORDER BY created_at DESC
            ''')
        
        results = cursor.fetchall()
        conn.close()
        
        thoughts = []
        for result in results:
            thoughts.append({
                'id': result[0],
                'content': result[1],
                'tags': json.loads(result[2]) if result[2] else [],
                'priority': result[3],
                'created_at': result[4],
                'status': result[5],
                'notes': result[6]
            })
        
        return thoughts
    
    def get_posted_tweets_with_screenshots(self) -> List[Dict]:
        """Get all posted tweets with their screenshots for the gallery"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT pt.id, pt.tweet_id, pt.tweet_url, pt.content, pt.posted_at, 
                   pt.screenshot_path, tt.tags, tt.priority
            FROM posted_tweets pt
            JOIN tweet_thoughts tt ON pt.thought_id = tt.id
            WHERE pt.screenshot_path IS NOT NULL
            ORDER BY pt.posted_at DESC
        ''')
        
        results = cursor.fetchall()
        conn.close()
        
        tweets = []
        for result in results:
            tweets.append({
                'id': result[0],
                'tweet_id': result[1],
                'tweet_url': result[2],
                'content': result[3],
                'posted_at': result[4],
                'screenshot_path': result[5],
                'tags': json.loads(result[6]) if result[6] else [],
                'priority': result[7]
            })
        
        return tweets
    
    def log_action(self, action: str, details: str, success: bool = True):
        """Log agent actions for debugging and monitoring"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO agent_logs (action, details, success)
            VALUES (?, ?, ?)
        ''', (action, details, success))
        
        conn.commit()
        conn.close()
    
    def get_stats(self) -> Dict:
        """Get overall statistics"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Count thoughts by status
        cursor.execute('SELECT status, COUNT(*) FROM tweet_thoughts GROUP BY status')
        status_counts = dict(cursor.fetchall())
        
        # Count total posted tweets
        cursor.execute('SELECT COUNT(*) FROM posted_tweets')
        total_posted = cursor.fetchone()[0]
        
        # Count screenshots captured
        cursor.execute('SELECT COUNT(*) FROM posted_tweets WHERE screenshot_path IS NOT NULL')
        screenshots_captured = cursor.fetchone()[0]
        
        conn.close()
        
        return {
            'pending_thoughts': status_counts.get('pending', 0),
            'posted_thoughts': status_counts.get('posted', 0),
            'archived_thoughts': status_counts.get('archived', 0),
            'total_posted': total_posted,
            'screenshots_captured': screenshots_captured
        }