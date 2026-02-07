# Backend File Reference

Complete reference of all backend files and their purposes.

## Configuration Files

### `package.json`
- Dependencies: express, ethers, axios, winston, cors, helmet, multer
- Scripts: dev, build, start, test, lint
- Node version: 18+

### `tsconfig.json`
- TypeScript configuration for ES2020 target
- Strict mode enabled
- Source maps for debugging

### `.env.example`
- Template for all required environment variables
- Copy to `.env` and fill in your values
- Never commit `.env` to git

### `.gitignore`
- Excludes node_modules, dist, logs, .env
- IDE files (.vscode, .idea)
- Build artifacts

## Deployment Files

### `Dockerfile`
- Multi-stage Docker build
- Alpine-based Node.js 18 image
- Optimized for production

### `docker-compose.yml`
- Local development environment
- Includes backend + MongoDB
- Volume mounts for live reload

### `setup.sh` / `setup.bat`
- Automated setup scripts for Unix/Windows
- Installs dependencies
- Creates .env file

## Documentation Files

### `README.md`
- Quick start guide
- Feature overview
- Installation instructions
- Configuration guide
- API summary
- Troubleshooting

### `API_DOCS.md`
- Complete API documentation
- All 20+ endpoints documented
- Request/response examples
- Error codes
- Testing examples

### `FRONTEND_INTEGRATION.md`
- How to use backend from React frontend
- API service layer pattern
- Code examples
- Environment setup for frontend
- Error handling patterns

### `DEPLOYMENT.md`
- Deployment guides for 5+ platforms:
  - Local Development
  - Docker
  - Heroku
  - Vercel
  - AWS (EC2, Beanstalk)
  - DigitalOcean
- Environment checklist
- Monitoring and maintenance
- Scaling strategies

## Source Code

### Config Files (`src/config/`)

#### `env.ts`
- Loads environment variables using dotenv
- Validates required variables
- Exports configuration object
- Config validation function

#### `logger.ts`
- Winston logger configuration
- Console and file transports
- Color-coded output
- Error and info logs

### Services (`src/services/`)

#### `contractService.ts`
- Smart contract interaction layer
- ethers.js v6 integration
- Functions:
  - `initializeContract()` - Setup contract instance
  - `storeDocument()` - Store doc on blockchain
  - `getDocument()` - Retrieve from blockchain
  - `setCarbonEmission()` - Record carbon data
  - `getCarbonEmission()` - Get carbon data
  - `isProductComplete()` - Check completion
  - `getProvider()` - Get ethers provider

#### `ipfsService.ts`
- IPFS/Pinata integration
- Functions:
  - `uploadToIPFS()` - Upload file
  - `uploadJSONToIPFS()` - Upload JSON
  - `getFromIPFS()` - Retrieve content
  - `pinByHash()` - Pin content
  - `unpinContent()` - Unpin content
  - `getIPFSUrl()` - Generate gateway URL

### Controllers (`src/controllers/`)

#### `documentController.ts`
- Route handlers for document endpoints
- Exports:
  - `storeDocumentOnChain()`
  - `getDocumentFromChain()`
  - `setCarbonEmissionOnChain()`
  - `getCarbonEmissionData()`
  - `checkProductComplete()`
  - `getProductSummary()`

#### `ipfsController.ts`
- Route handlers for IPFS endpoints
- Exports:
  - `uploadFile()`
  - `uploadJSON()`
  - `getFromIPFS()`
  - `getIPFSUrl()`
  - `pinContent()`
  - `unpinContent()`

### Routes (`src/routes/`)

#### `documentRoutes.ts`
- Document management endpoints
- Routes:
  - `POST /documents/store`
  - `GET /documents/:productId/:docType`
  - `POST /documents/carbon/set`
  - `GET /documents/carbon/:productId`
  - `GET /documents/status/:productId`
  - `GET /documents/summary/:productId`

#### `ipfsRoutes.ts`
- IPFS operation endpoints
- Routes:
  - `POST /ipfs/upload`
  - `POST /ipfs/upload-json`
  - `GET /ipfs/get`
  - `GET /ipfs/url`
  - `POST /ipfs/pin`
  - `POST /ipfs/unpin`

#### `healthRoutes.ts`
- Health check endpoints
- Routes:
  - `GET /api/health` - Basic health
  - `GET /api/status` - Full status with blockchain

### Middleware (`src/middleware/`)

#### `errorHandler.ts`
- Global error handling
- Request logging
- 404 handler
- Async route wrapper

#### `validation.ts`
- Input validation rules
- express-validator integration
- Validators for:
  - Document uploads
  - Carbon emissions
  - File uploads
  - Product queries
  - Batch creation
  - Carbon entries

### Utilities (`src/utils/`)

#### `helpers.ts`
- Response formatting functions
- Data conversion utilities
- Validation helpers
- Pagination helpers
- Address formatting

### Main Application Files

#### `app.ts`
- Express app setup
- Middleware configuration:
  - Helmet (security)
  - CORS
  - Compression
  - Body parser
  - Request logging
- Route registration
- Error handling middleware
- 404 handler

#### `index.ts`
- Application entry point
- Initializes contract service
- Validates configuration
- Starts Express server
- Handles process signals
- Error handling

## File Organization

```
backend/
├── src/
│   ├── config/           # Configuration
│   │   ├── env.ts
│   │   └── logger.ts
│   ├── services/         # Business logic
│   │   ├── contractService.ts
│   │   └── ipfsService.ts
│   ├── controllers/      # Route handlers
│   │   ├── documentController.ts
│   │   └── ipfsController.ts
│   ├── routes/          # API routes
│   │   ├── documentRoutes.ts
│   │   ├── ipfsRoutes.ts
│   │   └── healthRoutes.ts
│   ├── middleware/      # Express middleware
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── utils/           # Helper functions
│   │   └── helpers.ts
│   ├── app.ts           # Express setup
│   └── index.ts         # Entry point
├── .env.example         # Env template
├── .gitignore
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
├── setup.sh / setup.bat # Setup scripts
├── README.md
├── API_DOCS.md
├── FRONTEND_INTEGRATION.md
└── DEPLOYMENT.md
```

## Dependencies Summary

### Production
- **express** - Web framework
- **ethers** - Blockchain interaction
- **axios** - HTTP client
- **cors** - Cross-origin support
- **helmet** - Security headers
- **winston** - Logging
- **express-validator** - Input validation
- **compression** - Response compression
- **multer** - File uploads
- **form-data** - Multipart requests
- **dotenv** - Environment variables

### Development
- **typescript** - Type safety
- **tsx** - TypeScript runner
- **vitest** - Testing framework
- **eslint** - Code linting

## Architecture Patterns

### Layered Architecture
1. **Routes** - HTTP endpoints
2. **Controllers** - Request handlers
3. **Services** - Business logic
4. **Utilities** - Helper functions
5. **Middleware** - Cross-cutting concerns

### Error Handling
- Global error handler middleware
- Async route wrapper
- Try-catch in services
- Standard error responses

### Configuration Management
- Environment variables via dotenv
- Configuration validation on startup
- Logging configuration
- CORS configuration

### Type Safety
- Full TypeScript implementation
- Interfaces for all data
- Type-safe database queries
- Type-safe API responses

---

For more information, see individual file documentation in the source code comments.
