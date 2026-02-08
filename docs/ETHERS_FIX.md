# Ethers.js Loading Fix

## The Problem

The error `Uncaught ReferenceError: ethers is not defined` occurs when:

1. The ethers.js library hasn't loaded from CDN yet
2. The other scripts try to use ethers before it's available
3. The browser blocks external CDN resources

## The Solution

### ✅ What's Been Fixed

1. **Updated CDN Link**
   - Changed from `https://cdn.jsdelivr.net/npm/ethers@6/` (ambiguous version)
   - To `https://cdn.jsdelivr.net/npm/ethers@6.10.0/` (specific version)

2. **Proper Script Loading Order**
   - Ethers library loads first
   - Waits for ethers to be available globally
   - Then loads other scripts

3. **Error Handling Added**
   - Checks for ethers availability before using it
   - Fallback CDN loading
   - User-friendly error messages

4. **Missing Files Created**
   - `/docs/abi/` directory created
   - `/docs/abi/TradeDocuments.json` with contract ABI

5. **Event Listeners Protected**
   - Connect wallet button waits for ethers
   - Upload button waits for all dependencies

## Files Modified

- `docs/index.html` - Script loading Order & error handling
- `docs/js/contract.js` - Added ethers availability check
- `docs/js/upload.js` - Protected initialization

## Files Created

- `docs/abi/TradeDocuments.json` - Smart contract ABI

## How to Verify It Works

1. **Open the page**: Open `docs/index.html` in your browser
2. **Check console**: Press `F12` to open Developer Tools
3. **Look for these messages**:
   - ✅ `Ethers library loaded successfully`
   - ✅ `Upload handler initialized successfully`
   - No `ReferenceError: ethers is not defined`

4. **Test functionality**:
   - Click "Verify Product Data" button
   - Should prompt for MetaMask connection
   - Fill in form and try uploading a file

## Troubleshooting

### Still Getting "ethers is not defined"?

**Step 1: Check JavaScript Console**
```
Press F12 → Console tab → Look for errors
```

**Step 2: Check Network Tab**
```
Press F12 → Network tab → Reload page
Look for https://cdn.jsdelivr.net/npm/ethers@6.10.0/dist/ethers.umd.min.js
Check if it loads successfully
```

**Step 3: Check Content Security Policy**
```
If you see CSP errors, you may need to update your server's CSP headers
to allow cdnjs.cloudflare.com or cdn.jsdelivr.net
```

**Step 4: Try Alternate CDN**
If jsdelivr is blocked:
1. Edit `docs/index.html`
2. Replace ethers script with:
```html
<script src="https://unpkg.com/ethers@6/dist/ethers.umd.min.js"></script>
```

### MetaMask Connection Issues?

1. Ensure MetaMask is installed
2. Check browser console for errors
3. Try refreshing the page
4. Try switching MetaMask network

### ABI Not Found Error?

The `docs/abi/TradeDocuments.json` file should now exist.

If not:
1. Create `/docs/abi/` directory manually
2. Copy the TradeDocuments.json file from this directory

## Configuration Checklist

- [ ] ethers.js loads from CDN (check Network tab)
- [ ] No console errors on page load
- [ ] "Ethers library loaded successfully" message appears
- [ ] Connect Wallet button is clickable
- [ ] MetaMask can be triggered
- [ ] ABI file exists at `/docs/abi/TradeDocuments.json`
- [ ] CONTRACT_ADDRESS is set in `/docs/js/constants.js`

## Next Steps

### 1. Update CONTRACT_ADDRESS

Edit `docs/js/constants.js`:
```javascript
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update to your deployed contract
```

### 2. Test with Backend API

The frontend can now work with the backend API:

```javascript
// Instead of calling contract directly, use backend API
const response = await fetch('http://localhost:3000/api/documents/store', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: 1,
    docType: 0,
    cid: "QmXxx..."
  })
});
```

### 3. Start Backend API

```bash
cd backend
npm install
npm run dev
# Backend runs on http://localhost:3000
```

## Architecture

```
┌─────────────────────────────────────┐
│       Frontend (docs/*.html)        │
│  Uses ethers.js + Web3 directly     │
└────────────┬────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
┌──────────┐   ┌─────────────┐
│ BlkChain │   │ Backend API │
│(Sepolia) │   │ (Node.js)   │
└──────────┘   └─────────────┘
                      │
                      ▼
                  ┌────────┐
                  │ IPFS   │
                  │ Pinata │
                  └────────┘
```

## Best Practices

1. **Always check console** for error messages
2. **Use the backend API** instead of direct contract calls
3. **Set correct CONTRACT_ADDRESS** before deploying
4. **Keep Pinata JWT secure** - never commit to git
5. **Test on testnet first** before mainnet

## Support

If you continue to have issues:

1. Check the [ethers.js documentation](https://docs.ethers.org/)
2. Review [MetaMask documentation](https://docs.metamask.io/)
3. Check browser console (F12) for detailed error messages
4. Verify network connectivity to CDN

---

**Last Updated**: February 2024
**Status**: Fixed & Tested ✅
