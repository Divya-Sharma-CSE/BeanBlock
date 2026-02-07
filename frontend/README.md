# Carbon Verified - Web3 Supply Chain Carbon Tracking

A blockchain-powered carbon footprint tracking system for supply chain transparency. Built with React, TypeScript, Tailwind CSS, and ethers.js.

## 🌟 Features

### ✅ Implemented Features

1. **Web3 Wallet Integration**
   - Connect MetaMask wallet
   - Interact with smart contracts on testnet
   - Real-time connection status

2. **Create Coffee Batches**
   - Register new product batches on blockchain
   - Assign unique batch IDs
   - Track origin locations

3. **Add Carbon Entries**
   - Record emissions for each supply chain stage
   - Stages: Farm → Roast → Transport → Cup
   - Immutable blockchain storage

4. **Interactive Timeline Visualization**
   - Visual journey from farm to cup
   - Hover effects and animations
   - Carbon footprint per stage

5. **Carbon Dashboard (WOW Screen)**
   - Animated counter showing total footprint
   - Detailed history of all stages
   - Key insights and benchmarking
   - Verification certificates

6. **QR Code System**
   - Generate QR codes for any batch
   - Product lookup by batch ID
   - Download QR codes for packaging
   - Direct link to carbon dashboard

7. **Interactive UI/UX**
   - Cursor-following glow effects
   - Smooth scroll animations
   - Responsive design
   - Toast notifications

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Web3**: ethers.js v6
- **QR Codes**: qrcode library
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MetaMask browser extension
- Smart contract deployed on testnet (e.g., Sepolia, Mumbai)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

1. Update contract address in `/src/app/components/Web3Provider.tsx`:
   ```typescript
   const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
   ```

2. Update contract ABI with your deployed contract's ABI

3. Ensure MetaMask is connected to the correct testnet

## 📝 Smart Contract Interface

The frontend expects a smart contract with these functions:

```solidity
function createBatch(string memory batchId, string memory origin) public returns (uint256)

function addCarbonEntry(uint256 batchId, string memory stage, uint256 carbonAmount, string memory timestamp) public

function getBatchFootprint(uint256 batchId) public view returns (uint256)

function getBatchHistory(uint256 batchId) public view returns (tuple(string stage, uint256 carbon, string timestamp)[])
```

## 🎯 Demo Flow

1. **Connect Wallet** - Click "Connect Wallet" in hero section
2. **Create Batch** - Register a new coffee batch with ID and origin
3. **Add Carbon Data** - Record emissions for each supply chain stage
4. **View Dashboard** - See the "WOW" screen with total verified footprint
5. **Generate QR** - Create a QR code linking to the batch's carbon data
6. **Lookup Product** - Search any batch ID to view its footprint

## 🌍 Use Cases

- **Coffee Producers**: Track and showcase sustainable practices
- **Retailers**: Provide transparency to eco-conscious consumers  
- **Consumers**: Scan QR codes to verify product carbon footprint
- **Regulators**: Access immutable emission records

## 🎨 Design Principles

- **Clarity**: Information understandable in under 60 seconds
- **Interactivity**: Engaging cursor effects and animations
- **Responsiveness**: Works on desktop and mobile
- **Visual Hierarchy**: Clear flow from hero to action to results

## 📊 Key Metrics Displayed

- Total carbon footprint per product
- Breakdown by supply chain stage
- Comparison to industry benchmarks
- Reduction opportunities
- Blockchain verification status

## 🔐 Security Notes

- All data stored immutably on blockchain
- No centralized database
- Publicly verifiable transactions
- Wallet signatures for all modifications

## 🤝 Contributing

This is a demo project for a blockchain hackathon. Feel free to fork and extend!

## 📄 License

MIT License - Build freely!

---

**Built for**: Web3/Blockchain Supply Chain Hackathon  
**Track**: Real-world problems in sustainability  
**Problem Statement**: Verifiable Carbon Footprint per Product  
**Date**: February 2026
