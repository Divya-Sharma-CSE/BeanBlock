#!/bin/bash

# Carbon Verified - Quick Start Script
# This script helps you get started quickly

echo "🌱 Carbon Verified - Quick Start"
echo "================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎯 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Deploy smart contract (see /contracts/CarbonTracker.sol)"
echo "2. Update CONTRACT_ADDRESS in /src/app/components/Web3Provider.tsx"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Open http://localhost:5173 in your browser"
echo "5. Connect MetaMask and start testing!"
echo ""
echo "📚 Documentation:"
echo "- README.md - Complete documentation"
echo "- DEMO_GUIDE.md - Demo instructions"
echo "- JUDGES_CARD.md - Quick reference"
echo ""
echo "🚀 Good luck with your hackathon!"
