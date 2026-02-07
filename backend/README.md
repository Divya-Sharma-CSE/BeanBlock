# BeanBlock Backend API

Complete Node.js/Express backend API for the BeanBlock blockchain-based carbon tracking system.

## Features

- ✅ **Smart Contract Integration**: Direct interaction with TradeDocuments smart contract
- ✅ **IPFS/Pinata Integration**: File upload and retrieval with immutable storage
- ✅ **Document Management**: Store and retrieve supply chain documents
- ✅ **Carbon Tracking**: Record and query carbon emission data
- ✅ **Type-Safe**: Built with TypeScript for production reliability
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **Input Validation**: Express-validator middleware for all endpoints
- ✅ **CORS Support**: Configured for frontend integration
- ✅ **Health Checks**: Built-in health and status endpoints

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Blockchain testnet RPC URL (Sepolia, Mumbai, or similar)
- Pinata API credentials (for IPFS)

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables (see Configuration section)
# Edit .env with your settings
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Server runs on http://localhost:3000
```

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## Configuration

Create a `.env` file in the backend root directory:

```env
# Environment
NODE_ENV=production
PORT=3000

# URLs
API_URL=https://your-api-domain.com
CLIENT_URL=https://your-frontend-domain.com

# Blockchain
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
CHAIN_ID=11155111
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
PRIVATE_KEY=optional_for_write_operations

# IPFS/Pinata
PINATA_API_KEY=your_key
PINATA_API_SECRET=your_secret
PINATA_JWT=your_jwt_token

# Security
JWT_SECRET=strong-random-key-here
JWT_EXPIRATION=7d

# Logging
LOG_LEVEL=info
```

### Getting API Credentials

**Pinata IPFS:**
1. Sign up at https://www.pinata.cloud/
2. Create API key for `PINATA_API_KEY` and `PINATA_API_SECRET`
3. Generate JWT token for `PINATA_JWT`

**Infura RPC:**
1. Sign up at https://www.infura.io/
2. Create project and get Sepolia endpoint
3. Use as `RPC_URL`

## API Documentation

### Health & Status

**GET /api/health**
- Basic health check
- No authentication required

**GET /api/status**
- Detailed status including blockchain connection
- Returns network info and chain ID

### Document Management

**POST /api/documents/store**
Store document on blockchain
```json
{
  "productId": 1,
  "docType": 0,
  "cid": "QmXxxx..."
}
```

**GET /api/documents/:productId/:docType**
Retrieve document from blockchain

**POST /api/documents/carbon/set**
Record carbon emission
```json
{
  "productId": 1,
  "totalEmissions": 5000,
  "unit": "kgCO2e"
}
```

**GET /api/documents/carbon/:productId**
Get carbon emission data

**GET /api/documents/status/:productId**
Check if product is complete

**GET /api/documents/summary/:productId**
Get complete product summary

### IPFS Integration

**POST /api/ipfs/upload**
Upload file to IPFS (multipart/form-data)
```bash
curl -X POST http://localhost:3000/api/ipfs/upload \
  -F "file=@document.pdf"
```

**POST /api/ipfs/upload-json**
Upload JSON data to IPFS
```json
{
  "data": { "key": "value" },
  "filename": "data.json"
}
```

**GET /api/ipfs/get?cid=QmXxxx...**
Retrieve content from IPFS

**GET /api/ipfs/url?cid=QmXxxx...**
Get IPFS gateway URL

**POST /api/ipfs/pin**
Pin content to Pinata
```json
{
  "ipfsHash": "QmXxxx..."
}
```

## Project Structure

```
src/
├── config/          # Configuration (env, logger)
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── routes/         # API routes
├── services/       # Business logic
│   ├── contractService.ts
│   └── ipfsService.ts
├── utils/          # Helper functions
├── app.ts          # Express app setup
└── index.ts        # Entry point
```

## Error Handling

All endpoints follow consistent error response format:

**Success Response:**
```json
{
  "success": true,
  "data": {},
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "details": "Additional info (dev only)"
  },
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## Development & Testing

### Logging

Logs are written to:
- Console (development)
- `logs/all.log` (all levels)
- `logs/error.log` (errors only)

### Testing Workflow

1. Start backend: `npm run dev`
2. Test health: `curl http://localhost:3000/api/health`
3. Check blockchain: `curl http://localhost:3000/api/status`
4. Upload to IPFS: Use `/api/ipfs/upload`
5. Store on chain: Use `/api/documents/store`

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Build and run:
```bash
npm run build
docker build -t beanblock-backend .
docker run -p 3000:3000 --env-file .env beanblock-backend
```

### Vercel

Add `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```

Deploy: `vercel`

### Heroku

```bash
npm run build
git push heroku main
```

## Environment Best Practices

- **Never** commit `.env` files to git
- Use `.env.example` as template
- Rotate `PINATA_JWT` regularly
- Use different RPC endpoints for different environments
- Keep `PRIVATE_KEY` secure and use only for admin operations
- Enable rate limiting in production

## Troubleshooting

**Contract initialization fails:**
- Check `RPC_URL` is correct and accessible
- Verify `CONTRACT_ADDRESS` is deployed on that network
- Check network/chain ID mismatch

**IPFS upload fails:**
- Verify `PINATA_JWT` is valid
- Check file size isn't exceeded
- Ensure Pinata API is accessible

**Blockchain transaction fails:**
- Check account has testnet ETH for gas
- Verify `PRIVATE_KEY` is valid
- Check contract has required permissions

## License

MIT

## Support

For issues and questions:
1. Check logs: `logs/error.log`
2. Review configuration in `.env`
3. Test endpoints with curl or Postman
4. Check blockchain explorer for transaction status
