# Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Your Smart Contract

1. Deploy the smart contract from `/contracts/CarbonTracker.sol` to your preferred testnet
2. Update the contract address in `/src/app/components/Web3Provider.tsx`:
   ```typescript
   const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
   ```

### Step 3: Run the Application
```bash
npm run dev
```

### Step 4: Connect MetaMask
1. Install MetaMask browser extension
2. Switch to your testnet (Sepolia, Mumbai, etc.)
3. Get testnet tokens from a faucet
4. Click "Connect Wallet" in the app

## 🎯 Demo Flow for Judges

### 1-Minute Demo Script:

**[0:00-0:10] Introduction**
- "This is Carbon Verified - blockchain-powered carbon tracking for supply chains"
- Point to hero section with wallet connection

**[0:10-0:20] Supply Chain Visualization**
- Scroll to timeline section
- Hover over stages to show interactivity
- "Every stage is tracked: Farm → Roast → Transport → Cup"

**[0:20-0:30] Create a Batch**
- Show create batch form
- Enter sample data: "COFFEE-2026-DEMO" and "Ethiopia, Yirgacheffe"
- Click create (shows blockchain transaction simulation)

**[0:30-0:40] Add Carbon Data**
- Navigate to add carbon section
- Add entry for "Farm" stage with 2.3 kg CO₂
- Show toast notification

**[0:40-0:50] The WOW Moment**
- Scroll to carbon dashboard
- Animated counter showing 7.5 kg total
- Point out: "Complete transparency in one view"
- Show history timeline with all stages

**[0:50-1:00] QR Code System**
- Generate QR code for the batch
- "Consumers can scan this on product packaging"
- Show product lookup feature
- "All data verifiable on blockchain"

## 📊 Key Points to Emphasize

### For Non-Technical Judges:
1. **Simple**: Scan QR code → See carbon footprint
2. **Trustworthy**: Data stored on blockchain, can't be changed
3. **Transparent**: Anyone can verify the numbers
4. **Actionable**: Companies can identify where to reduce emissions

### For Technical Judges:
1. **Web3 Integration**: ethers.js connecting to smart contract
2. **Immutable Storage**: All data on blockchain
3. **Interactive UX**: Motion animations, cursor effects
4. **Modular Components**: Clean React architecture
5. **Production Ready**: Toast notifications, error handling, responsive design

## 🎨 Interactive Features to Showcase

1. **Cursor Following**: Move mouse to see animated glow effects
2. **Hover Animations**: Hover over supply chain stages
3. **Scroll Progress**: Watch the green progress bar at top
4. **Floating Action Button**: Click the + button in bottom right
5. **Form Validation**: Try submitting empty forms
6. **Toast Notifications**: Success/error messages appear beautifully

## 🔧 Troubleshooting

### MetaMask Not Connecting?
- Make sure you're on the correct network
- Refresh the page and try again
- Check console for errors

### Transactions Failing?
- Ensure you have testnet tokens
- Verify contract address is correct
- Check if contract is deployed and verified

### UI Not Loading?
- Clear browser cache
- Check if all dependencies installed
- Run `npm install` again

## 📱 Mobile Demo

The site is fully responsive! Open on mobile to show:
- Smooth touch interactions
- Optimized layout for small screens
- QR code scanning capability

## 💡 Talking Points

### Problem Being Solved:
"Consumers want sustainable products but can't verify claims. Greenwashing is rampant. We make carbon footprints transparent and verifiable using blockchain."

### Why Blockchain?
"Traditional databases can be manipulated. Blockchain provides immutable, publicly verifiable records that build trust."

### Real-World Impact:
"Coffee companies, fashion brands, food producers - any supply chain can use this to prove their sustainability claims."

### Business Model:
"Charge per batch registered. QR codes on packaging drive consumer engagement. Sell analytics to brands about carbon trends."

## 🎯 Success Metrics

A successful demo means judges can:
1. ✅ Understand the problem in 10 seconds
2. ✅ See a complete flow in 60 seconds  
3. ✅ Identify the blockchain value-add
4. ✅ Imagine real-world adoption

## 📞 Support

If you need help during the hackathon, check:
- README.md for detailed documentation
- /contracts/CarbonTracker.sol for smart contract reference
- Browser console for debug information

**Good luck! 🚀**
