#!/usr/bin/env python3
"""
Twitter Auto Agent - Combined runner
Runs both the web dashboard and the automation agent
"""

import threading
import time
import sys
import os
from multiprocessing import Process

def run_web_dashboard():
    """Run the Flask web dashboard"""
    from app import app
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)

def run_automation_agent():
    """Run the automation agent"""
    # Wait a bit for the web dashboard to start
    time.sleep(5)
    
    from agent import TwitterAutoAgent
    agent = TwitterAutoAgent()
    agent.start_agent()

def main():
    """Main runner that starts both components"""
    print("🚀 Starting Twitter Auto Agent...")
    print("📊 Web Dashboard: http://localhost:5000")
    print("🤖 Automation Agent: Starting in background...")
    print("📝 Add your thoughts via the web dashboard to get started!")
    print("---")
    
    try:
        # Start web dashboard in a separate process
        web_process = Process(target=run_web_dashboard)
        web_process.start()
        
        # Start automation agent in main process
        run_automation_agent()
        
    except KeyboardInterrupt:
        print("\n🛑 Shutting down Twitter Auto Agent...")
        web_process.terminate()
        web_process.join()
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()