import requests
import os
from typing import Optional
import logging
from dotenv import load_dotenv
from urllib.parse import urlparse
import time

load_dotenv()

class TweetPikClient:
    def __init__(self):
        self.api_key = os.getenv('TWEETPIK_API_KEY')
        self.base_url = "https://tweethunter.io/api/tweetpik"
        self.setup_logging()
        
    def setup_logging(self):
        """Setup logging for TweetPik operations"""
        self.logger = logging.getLogger(__name__)
    
    def capture_tweet_screenshot(self, tweet_url: str, save_path: str = None) -> Optional[str]:
        """
        Capture a screenshot of a tweet using TweetPik API
        
        Args:
            tweet_url: The Twitter/X URL of the tweet
            save_path: Optional path to save the screenshot
            
        Returns:
            Path to the saved screenshot or None if failed
        """
        if not self.api_key:
            self.logger.error("TweetPik API key not found in environment variables")
            return None
            
        try:
            # Extract tweet ID from URL
            tweet_id = self._extract_tweet_id(tweet_url)
            if not tweet_id:
                self.logger.error(f"Could not extract tweet ID from URL: {tweet_url}")
                return None
            
            # Prepare API request
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                'url': tweet_url,
                'format': 'png',
                'theme': 'light',
                'hide_thread': False,
                'hide_metrics': False
            }
            
            # Make API request to generate screenshot
            response = requests.post(
                f"{self.base_url}/screenshot",
                json=payload,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                screenshot_data = response.json()
                image_url = screenshot_data.get('image_url')
                
                if image_url:
                    # Download the image
                    return self._download_image(image_url, tweet_id, save_path)
                else:
                    self.logger.error("No image URL in TweetPik response")
                    return None
            else:
                self.logger.error(f"TweetPik API error: {response.status_code} - {response.text}")
                return None
                
        except requests.RequestException as e:
            self.logger.error(f"Network error with TweetPik API: {e}")
            return None
        except Exception as e:
            self.logger.error(f"Error capturing tweet screenshot: {e}")
            return None
    
    def capture_tweet_screenshot_fallback(self, tweet_url: str, save_path: str = None) -> Optional[str]:
        """
        Fallback method using web scraping if API fails
        This uses a simple approach to screenshot tweets
        """
        try:
            from selenium import webdriver
            from selenium.webdriver.chrome.options import Options
            from selenium.webdriver.common.by import By
            from selenium.webdriver.support.ui import WebDriverWait
            from selenium.webdriver.support import expected_conditions as EC
            from webdriver_manager.chrome import ChromeDriverManager
            from PIL import Image
            import io
            
            # Extract tweet ID for filename
            tweet_id = self._extract_tweet_id(tweet_url)
            if not tweet_id:
                return None
            
            # Setup Chrome options
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--window-size=1200,800")
            
            # Initialize driver
            driver = webdriver.Chrome(
                service=webdriver.chrome.service.Service(ChromeDriverManager().install()),
                options=chrome_options
            )
            
            try:
                # Navigate to TweetPik
                driver.get("https://tweethunter.io/tweetpik")
                
                # Wait for page to load and find the URL input
                url_input = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='url'], input[placeholder*='tweet'], input[placeholder*='URL']"))
                )
                
                # Enter the tweet URL
                url_input.clear()
                url_input.send_keys(tweet_url)
                
                # Find and click the screenshot button
                screenshot_btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit'], button:contains('Screenshot'), .btn-primary")
                screenshot_btn.click()
                
                # Wait for screenshot to be generated
                time.sleep(5)
                
                # Look for the generated image
                img_element = WebDriverWait(driver, 15).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "img[src*='screenshot'], .screenshot-result img, .generated-image"))
                )
                
                # Get the screenshot image URL
                img_src = img_element.get_attribute('src')
                
                if img_src:
                    return self._download_image(img_src, tweet_id, save_path)
                
            finally:
                driver.quit()
                
        except Exception as e:
            self.logger.error(f"Fallback screenshot method failed: {e}")
            return None
    
    def _extract_tweet_id(self, tweet_url: str) -> Optional[str]:
        """Extract tweet ID from Twitter URL"""
        try:
            # Handle both twitter.com and x.com URLs
            if 'status/' in tweet_url:
                tweet_id = tweet_url.split('status/')[-1].split('?')[0].split('/')[0]
                return tweet_id
            return None
        except:
            return None
    
    def _download_image(self, image_url: str, tweet_id: str, save_path: str = None) -> Optional[str]:
        """Download image from URL and save to specified path"""
        try:
            # Create gallery directory if it doesn't exist
            gallery_dir = save_path or os.getenv('GALLERY_PATH', './gallery')
            os.makedirs(gallery_dir, exist_ok=True)
            
            # Generate filename
            filename = f"tweet_{tweet_id}_{int(time.time())}.png"
            file_path = os.path.join(gallery_dir, filename)
            
            # Download the image
            img_response = requests.get(image_url, timeout=30)
            img_response.raise_for_status()
            
            # Save the image
            with open(file_path, 'wb') as f:
                f.write(img_response.content)
            
            self.logger.info(f"Screenshot saved: {file_path}")
            return file_path
            
        except Exception as e:
            self.logger.error(f"Error downloading screenshot: {e}")
            return None