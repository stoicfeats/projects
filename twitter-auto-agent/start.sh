#!/bin/bash

# Twitter Auto Agent Startup Script

echo "🚀 Starting Twitter Auto Agent..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Running setup..."
    python setup.py
    echo ""
    echo "📝 Please edit the .env file with your API credentials, then run this script again."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Run setup check
echo "🔧 Running setup check..."
python setup.py

# Create necessary directories
mkdir -p logs gallery

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  python run.py        # Run both dashboard and agent"
echo "  python app.py        # Run only web dashboard"
echo "  python agent.py      # Run only automation agent"
echo ""
echo "📊 Dashboard will be available at: http://localhost:5000"
echo ""

# Ask user which mode to run
read -p "Start the full system now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting Twitter Auto Agent..."
    python run.py
else
    echo "👍 Setup complete! Run 'python run.py' when ready."
fi