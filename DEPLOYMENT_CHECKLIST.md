# Deployment Checklist

## 🚀 Pre-Demo Deployment Steps

### Step 1: Smart Contract Deployment ✅

1. **Choose your testnet**:
   - [ ] Sepolia (Ethereum) - Recommended for ETH ecosystem
   - [ ] Mumbai (Polygon) - Recommended for low gas fees
   - [ ] Other testnet of your choice

2. **Get testnet tokens**:
   - Sepolia: https://sepoliafaucet.com/
   - Mumbai: https://faucet.polygon.technology/

3. **Deploy contract**:
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Copy contract address** from deployment output

5. **Verify on block explorer** (optional but impressive):
   ```bash
   npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
   ```

### Step 2: Frontend Configuration ✅

1. **Update contract address** in `/src/app/components/Web3Provider.tsx`:
   ```typescript
   const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS";
   ```

2. **Update contract ABI** in `/src/app/components/Web3Provider.tsx`:
   - Copy ABI from `artifacts/contracts/CarbonTracker.sol/CarbonTracker.json`
   - Replace CONTRACT_ABI array

3. **Test connection**:
   - [ ] Can connect MetaMask
   - [ ] Can create batch (check transaction on block explorer)
   - [ ] Can add carbon entry
   - [ ] Data persists after page refresh

### Step 3: Deploy Frontend ✅

**Option A: Vercel (Recommended - Easiest)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, get deployment URL
```

**Option B: Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

**Option C: GitHub Pages**
1. Push code to GitHub
2. Enable GitHub Pages in repo settings
3. Set source to `gh-pages` branch
4. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Step 4: Testing Checklist ✅

**Before the demo, test these flows:**

#### Flow 1: First-Time User
- [ ] Open site in incognito window
- [ ] Hero section loads properly
- [ ] Cursor effects work
- [ ] Scroll is smooth
- [ ] All animations play

#### Flow 2: Wallet Connection
- [ ] Click "Connect Wallet"
- [ ] MetaMask popup appears
- [ ] Connection success toast shows
- [ ] Address displays correctly
- [ ] Can disconnect

#### Flow 3: Create Batch
- [ ] Navigate to Create Batch section
- [ ] Fill form with test data
- [ ] Submit form
- [ ] MetaMask transaction popup appears
- [ ] Confirm transaction
- [ ] Success toast shows
- [ ] Can verify on block explorer

#### Flow 4: Add Carbon
- [ ] Navigate to Add Carbon section
- [ ] Enter batch ID from previous step
- [ ] Select stage and enter carbon amount
- [ ] Submit form
- [ ] Transaction confirms
- [ ] Success toast shows

#### Flow 5: View Dashboard
- [ ] Scroll to Dashboard section
- [ ] Counter animates from 0 to total
- [ ] History shows all entries
- [ ] Insights cards display
- [ ] All data is correct

#### Flow 6: QR Code
- [ ] Navigate to QR Code section
- [ ] Generate QR for batch
- [ ] QR code displays
- [ ] Download QR code works
- [ ] Lookup batch by ID works
- [ ] Results display correctly

#### Flow 7: Mobile
- [ ] Open on mobile device
- [ ] All sections are responsive
- [ ] Forms are usable
- [ ] Buttons are tappable
- [ ] No horizontal scroll

### Step 5: Performance Optimization ✅

1. **Check load time**:
   - [ ] Page loads in < 3 seconds on fast connection
   - [ ] Images are optimized
   - [ ] No console errors

2. **Test on different browsers**:
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Mobile Safari
   - [ ] Mobile Chrome

3. **Lighthouse audit**:
   - [ ] Performance score > 80
   - [ ] Accessibility score > 90
   - [ ] Best Practices score > 90
   - [ ] SEO score > 80

### Step 6: Demo Preparation ✅

1. **Prepare demo data**:
   - [ ] Have test batch IDs ready ("COFFEE-2026-DEMO")
   - [ ] Have test carbon amounts ready (2.3, 1.7, 3.1, 0.4)
   - [ ] Test origin: "Ethiopia, Yirgacheffe"

2. **Prepare MetaMask**:
   - [ ] Create new demo wallet
   - [ ] Get testnet tokens (keep extra)
   - [ ] Save seed phrase securely
   - [ ] Test transactions work

3. **Prepare backup plan**:
   - [ ] Screenshot of each screen
   - [ ] Video recording of full flow
   - [ ] Second device with site loaded
   - [ ] Mobile hotspot as backup internet

4. **Practice demo**:
   - [ ] Time yourself (should be < 60 seconds)
   - [ ] Practice talking points
   - [ ] Anticipate questions
   - [ ] Know fallback if transaction fails

### Step 7: Day-of Checklist ✅

**2 Hours Before:**
- [ ] Site is live and accessible
- [ ] All features work
- [ ] MetaMask has tokens
- [ ] Laptop is charged
- [ ] Backup device ready

**30 Minutes Before:**
- [ ] Open site in fresh browser
- [ ] Connect wallet
- [ ] Test one complete flow
- [ ] Close unnecessary tabs
- [ ] Disable notifications

**Right Before Demo:**
- [ ] Refresh page
- [ ] Check internet connection
- [ ] Volume is appropriate (if demo has sound)
- [ ] Screen brightness is good
- [ ] Zoom level is 100%

### Step 8: Troubleshooting Guide ✅

**Problem: MetaMask won't connect**
- Solution: Refresh page, try again
- Backup: Show screenshots of connected state

**Problem: Transaction fails**
- Solution: Check gas, check token balance, try again
- Backup: Show video of working transaction

**Problem: Site won't load**
- Solution: Use backup device
- Backup: Show local build on laptop

**Problem: Animations lag**
- Solution: Reduce browser zoom to 90%
- Backup: Explain flow without animations

**Problem: Internet down**
- Solution: Use mobile hotspot
- Backup: Show pre-recorded video demo

## 📋 Final Pre-Demo Checklist

**Technical:**
- [ ] Contract deployed and verified
- [ ] Frontend deployed and accessible
- [ ] All features tested and working
- [ ] MetaMask funded with testnet tokens
- [ ] Backup plans in place

**Content:**
- [ ] Understand the pitch (< 30 seconds)
- [ ] Know the demo flow (< 60 seconds)
- [ ] Can answer technical questions
- [ ] Can answer business questions
- [ ] Know your differentiators

**Logistics:**
- [ ] Laptop charged
- [ ] Backup device ready
- [ ] Internet connection stable
- [ ] Demo environment clean (no distracting tabs)
- [ ] Confident and ready! 💪

## 🎯 Success Criteria

You're ready to demo when:
✅ Can complete full flow in under 60 seconds
✅ Contract is deployed and verified on block explorer
✅ Frontend is live on public URL
✅ All interactive features work smoothly
✅ Can answer "Why blockchain?" clearly
✅ Have backup plans for technical failures
✅ Confident in your pitch and value proposition

## 📞 Emergency Contacts

**Discord/Slack**: [Your hackathon channel]
**Mentor**: [Mentor contact if applicable]
**Team**: [Team member contacts]

## 🚀 Deployment URLs

**Frontend**: _________________________________

**Contract (Sepolia)**: _________________________________

**Contract (Mumbai)**: _________________________________

**Block Explorer**: _________________________________

**GitHub Repo**: _________________________________

**Video Demo**: _________________________________

---

**You've got this! The hard work is done. Now go show the world what you've built! 🌱🚀**

**Last reminder**: The Carbon Dashboard (WOW screen) is your star feature. Make sure to highlight it!

**Good luck! 🍀**
