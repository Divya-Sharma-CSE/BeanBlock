# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, no authentication is required. JWT infrastructure is in place for future implementation.

## Response Format

All responses follow a standard format:

### Success Response (2xx)
```json
{
  "success": true,
  "data": {},
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "details": "Additional context (development only)"
  },
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## Endpoints

### Health & Status

#### Check API Health
```
GET /health
```
**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-20T10:30:00.000Z",
    "uptime": 3600
  }
}
```

#### Check API Status (with blockchain)
```
GET /status
```
**Response:**
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "timestamp": "2024-01-20T10:30:00.000Z",
    "uptime": 3600,
    "blockchain": {
      "connected": true,
      "network": "sepolia",
      "chainId": 11155111
    }
  }
}
```

---

### Document Management

#### Store Document on Blockchain
```
POST /documents/store
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": 1,
  "docType": 0,
  "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Parameters:**
- `productId` (number): Unique product identifier
- `docType` (number): Document type (0-3)
  - 0 = RetailReceipt
  - 1 = ProcessingInvoice
  - 2 = FarmCertificate
  - 3 = BillOfLading
- `cid` (string): IPFS Content Identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": 1,
    "docType": 0,
    "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "transactionHash": "0x1234567890abcdef..."
  }
}
```

---

#### Get Document from Blockchain
```
GET /documents/:productId/:docType
```

**Path Parameters:**
- `productId` (number): Product identifier
- `docType` (number): Document type (0-3)

**Response:**
```json
{
  "success": true,
  "data": {
    "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "uploadedBy": "0x1234567890abcdef1234567890abcdef12345678",
    "timestamp": 1705750200
  }
}
```

---

### Carbon Emission Management

#### Record Carbon Emission
```
POST /documents/carbon/set
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": 1,
  "totalEmissions": 5000,
  "unit": "kgCO2e"
}
```

**Parameters:**
- `productId` (number): Product identifier
- `totalEmissions` (number): Amount in specified unit
- `unit` (string): Unit of measurement (default: "kgCO2e")

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": 1,
    "totalEmissions": 5000,
    "unit": "kgCO2e",
    "transactionHash": "0x1234567890abcdef..."
  }
}
```

---

#### Get Carbon Emission Data
```
GET /documents/carbon/:productId
```

**Path Parameters:**
- `productId` (number): Product identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEmissions": 5000,
    "unit": "kgCO2e",
    "reportedBy": "0x1234567890abcdef1234567890abcdef12345678",
    "timestamp": 1705750200
  }
}
```

---

#### Check Product Completion Status
```
GET /documents/status/:productId
```

**Path Parameters:**
- `productId` (number): Product identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": 1,
    "isComplete": true
  }
}
```

---

#### Get Product Summary
```
GET /documents/summary/:productId
```

**Path Parameters:**
- `productId` (number): Product identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": 1,
    "carbonData": {
      "totalEmissions": 5000,
      "unit": "kgCO2e",
      "reportedBy": "0x...",
      "timestamp": 1705750200
    },
    "isComplete": true
  }
}
```

---

### IPFS File Management

#### Upload File to IPFS
```
POST /ipfs/upload
Content-Type: multipart/form-data
```

**Form Parameters:**
- `file` (file): File to upload

**Response:**
```json
{
  "success": true,
  "data": {
    "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "url": "https://gateway.pinata.cloud/ipfs/QmXxxx...",
    "filename": "document.pdf",
    "size": 102400
  }
}
```

**Example with curl:**
```bash
curl -X POST http://localhost:3000/api/ipfs/upload \
  -F "file=@document.pdf"
```

---

#### Upload JSON to IPFS
```
POST /ipfs/upload-json
Content-Type: application/json
```

**Request Body:**
```json
{
  "data": {
    "productId": 1,
    "stage": "Farm",
    "carbon": 1000
  },
  "filename": "metadata.json"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "url": "https://gateway.pinata.cloud/ipfs/QmXxxx...",
    "filename": "metadata.json"
  }
}
```

---

#### Get Content from IPFS
```
GET /ipfs/get?cid=QmXxxx...
```

**Query Parameters:**
- `cid` (string): IPFS Content Identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "data": {}
  }
}
```

---

#### Get IPFS Gateway URL
```
GET /ipfs/url?cid=QmXxxx...
```

**Query Parameters:**
- `cid` (string): IPFS Content Identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "url": "https://gateway.pinata.cloud/ipfs/QmXxxx..."
  }
}
```

---

#### Pin Content to Pinata
```
POST /ipfs/pin
Content-Type: application/json
```

**Request Body:**
```json
{
  "ipfsHash": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ipfsHash": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "message": "Content pinned successfully"
  }
}
```

---

#### Unpin Content from Pinata
```
POST /ipfs/unpin
Content-Type: application/json
```

**Request Body:**
```json
{
  "ipfsHash": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ipfsHash": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "message": "Content unpinned successfully"
  }
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |
| 503 | Service Unavailable - Blockchain unreachable |

## Rate Limiting

Currently not enforced. Consider implementing for production:
- 100 requests per minute per IP
- 1000 requests per hour per IP

## Testing

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Upload File
```bash
curl -X POST http://localhost:3000/api/ipfs/upload \
  -F "file=@path/to/file.pdf"
```

### Store Document
```bash
curl -X POST http://localhost:3000/api/documents/store \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "docType": 0,
    "cid": "QmXxxx..."
  }'
```

### Get Document
```bash
curl http://localhost:3000/api/documents/1/0
```

## Pagination

Not yet implemented. Future versions may include pagination for list endpoints.

## Webhooks

Not yet implemented. Can be added for blockchain event notifications.

## Rate Limiting

Not yet implemented. Recommended for production deployment.

## API Versioning

Currently at v1 (implicit). Future versions may be available at `/api/v2/...`

---

**Last Updated:** January 2024  
**API Version:** 1.0.0
