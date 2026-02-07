# Application Flow Diagram

## 🔄 Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER ARRIVES                             │
│                              ↓                                    │
│                    ┌─────────────────┐                           │
│                    │   Hero Section   │                           │
│                    │  - Connect Wallet │                          │
│                    │  - View Stats     │                          │
│                    └─────────────────┘                           │
│                              ↓                                    │
│                    ┌─────────────────┐                           │
│                    │    Timeline      │                           │
│                    │  Farm → Roast    │                           │
│                    │  Transport → Cup │                           │
│                    └─────────────────┘                           │
│                              ↓                                    │
│         ┌────────────────────┴────────────────────┐              │
│         ↓                                          ↓              │
│  ┌─────────────┐                          ┌─────────────┐        │
│  │Create Batch │                          │ Add Carbon  │        │
│  │  - Batch ID  │                          │  - Stage     │        │
│  │  - Origin    │                          │  - Amount    │        │
│  └─────────────┘                          └─────────────┘        │
│         ↓                                          ↓              │
│         └────────────────────┬────────────────────┘              │
│                              ↓                                    │
│                    ┌─────────────────┐                           │
│                    │   Dashboard      │                           │
│                    │ ★ WOW SCREEN ★   │                           │
│                    │  - Total CO₂     │                           │
│                    │  - History       │                           │
│                    │  - Insights      │                           │
│                    └─────────────────┘                           │
│                              ↓                                    │
│                    ┌─────────────────┐                           │
│                    │   QR Code        │                           │
│                    │  - Generate      │                           │
│                    │  - Lookup        │                           │
│                    └─────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Technical Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                          │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    Component Layer                          │  │
│  │  - Hero, Timeline, Forms, Dashboard, QR                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              ↕                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    Web3Provider                             │  │
│  │  - Wallet Management                                        │  │
│  │  - Contract Interaction                                     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              ↕                                    │
│  ┌───────────���────────────────────────────────────────────────┐  │
│  │                    ethers.js                                │  │
│  │  - Connect to MetaMask                                      │  │
│  │  - Sign Transactions                                        │  │
│  │  - Read/Write Contract                                      │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                              ↕
┌──────────────────────────────────────────────────────────────────┐
│                      BLOCKCHAIN LAYER                             │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                  Smart Contract                             │  │
│  │  - CarbonTracker.sol                                        │  │
│  │  - createBatch()                                            │  │
│  │  - addCarbonEntry()                                         │  │
│  │  - getBatchFootprint()                                      │  │
│  │  - getBatchHistory()                                        │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              ↕                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              Testnet (Sepolia/Mumbai)                       │  │
│  │  - Immutable Storage                                        │  │
│  │  - Public Verification                                      │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### Creating a Batch
```
User Input (Form)
      ↓
Form Validation
      ↓
Web3Provider.contract.createBatch()
      ↓
ethers.js → MetaMask → User Signature
      ↓
Transaction → Blockchain
      ↓
Event Emitted → Frontend Listens
      ↓
Success Toast → UI Update
```

### Adding Carbon Entry
```
User Input (Stage + Amount)
      ↓
Form Validation
      ↓
Web3Provider.contract.addCarbonEntry()
      ↓
ethers.js → MetaMask → User Signature
      ↓
Transaction → Blockchain → Update totalCarbon
      ↓
Event Emitted → Frontend Listens
      ↓
Success Toast → Dashboard Updates
```

### Viewing Dashboard
```
User Scrolls to Dashboard
      ↓
Component Mounts
      ↓
Web3Provider.contract.getBatchHistory()
      ↓
ethers.js → Read from Blockchain
      ↓
Data Retrieved → Processed
      ↓
Animated Display → Counter, Charts, Insights
```

### Generating QR Code
```
User Enters Batch ID
      ↓
Generate URL (with batch parameter)
      ↓
qrcode Library → Create QR Image
      ↓
Display QR Code → Download Option
      ↓
Consumer Scans → Redirects to Dashboard
```

## 🎨 Component Interaction

```
App.tsx
├── Web3Provider (Context)
│   └── Provides: account, contract, connectWallet()
│
├── CursorFollower (Visual Effect)
│   └── Mouse position tracking
│
├── Navbar
│   └── Navigation + Scroll Progress
│
├── FloatingActionButton
│   └── Quick scroll to sections
│
├── Hero
│   └── Uses: Web3Provider.connectWallet()
│
├── SupplyChainTimeline
│   └── Static visualization with hover effects
│
├── CreateBatch
│   └── Uses: Web3Provider.contract.createBatch()
│
├── AddCarbonEntry
│   └── Uses: Web3Provider.contract.addCarbonEntry()
│
├── CarbonDashboard ★
│   └── Uses: Web3Provider.contract.getBatch*()
│
├── QRCodeSection
│   └── Uses: qrcode library + lookup function
│
└── Footer
    └── Links and info
```

## 🔐 Security Flow

```
1. User Action (e.g., Create Batch)
         ↓
2. Frontend Validation
         ↓
3. Web3Provider Checks Connection
         ↓
4. ethers.js Prepares Transaction
         ↓
5. MetaMask Popup (User Review)
         ↓
6. User Signs with Private Key (in MetaMask)
         ↓
7. Signed Transaction → Blockchain
         ↓
8. Blockchain Validates & Executes
         ↓
9. Transaction Hash Returned
         ↓
10. Frontend Confirms Success
```

**Key Security Points:**
- ✅ Private keys never leave MetaMask
- ✅ User approves every transaction
- ✅ Smart contract enforces rules
- ✅ Data is immutable once written
- ✅ Public verification of all data

## 🎯 State Management

```
┌─────────────────────────────────────┐
│      React Context (Web3Provider)    │
│                                      │
│  State:                              │
│  - account: string | null            │
│  - contract: Contract | null         │
│  - provider: Provider | null         │
│                                      │
│  Methods:                            │
│  - connectWallet()                   │
│  - disconnectWallet()                │
│                                      │
│  Consumed by:                        │
│  - Hero                              │
│  - CreateBatch                       │
│  - AddCarbonEntry                    │
│  - CarbonDashboard                   │
│                                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Component Local State           │
│                                      │
│  - Form inputs (batchId, origin)     │
│  - Loading states                    │
│  - Hover states                      │
│  - Modal visibility                  │
│  - QR code data                      │
│                                      │
└─────────────────────────────────────┘
```

## 🌟 Animation Pipeline

```
Page Load
    ↓
LoadingScreen (0-1 second)
    ↓
Hero Fade In
    ↓
User Scrolls
    ↓
IntersectionObserver Triggers
    ↓
Section Animates In (whileInView)
    ↓
User Hovers
    ↓
Element Scales/Rotates (whileHover)
    ↓
Form Submit
    ↓
Loading Animation
    ↓
Success → Confetti/Toast
```

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
├── Single column layout
├── Larger touch targets
├── Simplified navigation
└── Stacked cards

Tablet (768px - 1024px)
├── Two column layout
├── Expanded navigation
├── Side-by-side forms
└── Grid layouts

Desktop (> 1024px)
├── Full navigation
├── Multi-column grids
├── Hover effects active
└── Maximum visual polish
```

## 🚀 Deployment Pipeline

```
Development
    ↓
npm run build
    ↓
Build Artifacts (dist/)
    ↓
Deploy to Hosting
├── Vercel
├── Netlify
└── GitHub Pages
    ↓
Live URL
    ↓
Connect to Testnet Contract
    ↓
Production Ready! 🎉
```

---

This visual guide helps understand how all pieces fit together!
