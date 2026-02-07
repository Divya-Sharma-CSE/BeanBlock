#!/bin/bash

# BeanBlock Backend Setup Script
# This script sets up the backend with all necessary dependencies

echo "🚀 BeanBlock Backend Setup"
echo "========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")" || exit

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  Please edit .env with your configuration:"
    echo "   - RPC_URL (Infura, Alchemy, etc.)"
    echo "   - PINATA_JWT (for IPFS uploads)"
    echo "   - CONTRACT_ADDRESS (deployed contract)"
    echo ""
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your credentials"
echo "2. Run: npm run dev"
echo "3. Backend will start on http://localhost:3000"
echo ""
echo "📚 For more info, see README.md"
