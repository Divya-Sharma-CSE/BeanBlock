# Frontend Integration Guide

This guide explains how to integrate the BeanBlock backend API with your React frontend.

## Frontend Configuration

### 1. Update API Base URL

In your frontend code, configure the API endpoint:

```typescript
// src/config/api.ts
export const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const endpoints = {
  // Health
  HEALTH: `${API_BASE_URL}/health`,
  STATUS: `${API_BASE_URL}/status`,

  // Documents
  STORE_DOCUMENT: `${API_BASE_URL}/documents/store`,
  GET_DOCUMENT: (productId: number, docType: number) =>
    `${API_BASE_URL}/documents/${productId}/${docType}`,

  // Carbon
  SET_CARBON: `${API_BASE_URL}/documents/carbon/set`,
  GET_CARBON: (productId: number) =>
    `${API_BASE_URL}/documents/carbon/${productId}`,
  PRODUCT_STATUS: (productId: number) =>
    `${API_BASE_URL}/documents/status/${productId}`,
  PRODUCT_SUMMARY: (productId: number) =>
    `${API_BASE_URL}/documents/summary/${productId}`,

  // IPFS
  UPLOAD_FILE: `${API_BASE_URL}/ipfs/upload`,
  UPLOAD_JSON: `${API_BASE_URL}/ipfs/upload-json`,
  GET_IPFS: `${API_BASE_URL}/ipfs/get`,
  GET_IPFS_URL: `${API_BASE_URL}/ipfs/url`,
  PIN_CONTENT: `${API_BASE_URL}/ipfs/pin`,
  UNPIN_CONTENT: `${API_BASE_URL}/ipfs/unpin`,
};
```

### 2. Create API Service Layer

```typescript
// src/services/api.ts
import { endpoints } from '../config/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
}

export const apiService = {
  // Documents
  async storeDocument(
    productId: number,
    docType: number,
    cid: string
  ): Promise<ApiResponse> {
    const response = await fetch(endpoints.STORE_DOCUMENT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, docType, cid }),
    });
    return response.json();
  },

  async getDocument(
    productId: number,
    docType: number
  ): Promise<ApiResponse> {
    const response = await fetch(
      endpoints.GET_DOCUMENT(productId, docType)
    );
    return response.json();
  },

  // Carbon
  async setCarbonEmission(
    productId: number,
    totalEmissions: number,
    unit: string = 'kgCO2e'
  ): Promise<ApiResponse> {
    const response = await fetch(endpoints.SET_CARBON, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, totalEmissions, unit }),
    });
    return response.json();
  },

  async getCarbonEmission(productId: number): Promise<ApiResponse> {
    const response = await fetch(
      endpoints.GET_CARBON(productId)
    );
    return response.json();
  },

  // IPFS
  async uploadFile(file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(endpoints.UPLOAD_FILE, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  async uploadJSON(data: any, filename: string): Promise<ApiResponse> {
    const response = await fetch(endpoints.UPLOAD_JSON, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, filename }),
    });
    return response.json();
  },
};
```

### 3. Environment Configuration

Create `.env` file in your frontend root:

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

For production, use your deployed backend URL:

```env
REACT_APP_API_URL=https://your-backend-api.com/api
```

### 4. Use in React Components

```tsx
// src/components/DocumentUploadForm.tsx
import { useState } from 'react';
import { apiService } from '../services/api';
import { useWeb3 } from './Web3Provider';

export const DocumentUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { account } = useWeb3();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !account) return;

    setLoading(true);
    try {
      // Upload to IPFS
      const uploadRes = await apiService.uploadFile(file);
      if (!uploadRes.success) {
        throw new Error(uploadRes.error?.message || 'Upload failed');
      }

      const { cid } = uploadRes.data;

      // Store on blockchain
      const storeRes = await apiService.storeDocument(1, 0, cid);
      if (!storeRes.success) {
        throw new Error(storeRes.error?.message || 'Store failed');
      }

      console.log('Document stored:', storeRes.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button disabled={loading || !file}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};
```

## Hybrid Workflow (Backend + Smart Contracts)

### Upload Flow
1. **Frontend**: User selects file
2. **Backend**: Upload to IPFS → Returns CID
3. **Frontend**: Call smart contract with CID
4. **Smart Contract**: Store CID on blockchain

```typescript
const uploadAndStore = async (file: File, productId: number) => {
  // Step 1: Upload to IPFS via backend
  const uploadRes = await apiService.uploadFile(file);
  const { cid } = uploadRes.data;

  // Step 2: Store on blockchain via smart contract
  const { contract } = useWeb3();
  const tx = await contract.storeDocument(productId, 0, cid);
  await tx.wait();
};
```

### Query Flow
1. **Frontend**: User requests document
2. **Backend API**: Queries blockchain for CID
3. **Backend**: Retrieves from IPFS using CID
4. **Frontend**: Displays document

```typescript
const getDocument = async (productId: number) => {
  // Get from backend (which queries blockchain + IPFS)
  const res = await apiService.getDocument(productId, 0);
  return res.data;
};
```

## CORS Configuration

The backend is configured for development CORS. For production, update `backend/.env`:

```env
CORS_ORIGIN=https://your-frontend-domain.com
```

## Error Handling

All API calls return standard responses:

```typescript
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    details?: any;
  };
}
```

Handle errors consistently:

```typescript
try {
  const res = await apiService.uploadFile(file);
  if (!res.success) {
    throw new Error(res.error?.message || 'Unknown error');
  }
  console.log(res.data);
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

## Development Workflow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev`
3. Frontend will hit `http://localhost:3000/api`
4. Check browser console for API calls
5. Check backend logs for detailed info

## Production Deployment

### Frontend
Deploy to Vercel, Netlify, or similar with:
```env
REACT_APP_API_URL=https://your-backend-api.com/api
```

### Backend
Deploy to Vercel, Heroku, AWS, or Docker.  
Use the same environment variables as development.

## API Rate Limiting (Future)

When implementing rate limiting, handle 429 responses:

```typescript
if (response.status === 429) {
  // Wait and retry
  await new Promise(r => setTimeout(r, 1000));
  return retry();
}
```

## Caching

Cache IPFS results client-side:

```typescript
const cacheKey = `ipfs_${cid}`;
const cached = localStorage.getItem(cacheKey);
if (cached) return JSON.parse(cached);

const data = await apiService.getFromIPFS(cid);
localStorage.setItem(cacheKey, JSON.stringify(data));
return data;
```

## Monitoring

Monitor API usage and errors:

```typescript
// Log all API calls
const apiService = {
  async request(endpoint: string, options: RequestInit) {
    console.time(`API: ${endpoint}`);
    try {
      const response = await fetch(endpoint, options);
      console.log(`${endpoint}: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error(`${endpoint}: ${error}`);
      throw error;
    } finally {
      console.timeEnd(`API: ${endpoint}`);
    }
  },
};
```

## Troubleshooting

### CORS Errors
- Check backend CORS_ORIGIN matches your frontend URL
- Ensure backend is running on configured port

### 404 Not Found
- Verify endpoint matches API_DOCS.md
- Check product/batch IDs exist

### IPFS Upload Fails
- Verify PINATA_JWT is set in backend
- Check file size is under 50MB

### Blockchain Events
- Verify RPC_URL in backend
- Check contract address is deployed

---

For more backend details, see `backend/README.md` and `backend/API_DOCS.md`
