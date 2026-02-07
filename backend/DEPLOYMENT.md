# Deployment Guide

Complete guide for deploying the BeanBlock backend to production.

## Table of Contents
1. [Local Development](#local-development)
2. [Docker](#docker)
3. [Heroku](#heroku)
4. [Vercel](#vercel)
5. [AWS](#aws)
6. [DigitalOcean](#digitalocean)
7. [Environment Checklist](#environment-checklist)

---

## Local Development

### Setup

1. **Clone and install:**
```bash
npm install
cp .env.example .env
```

2. **Configure .env:**
```env
NODE_ENV=development
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PINATA_JWT=your_jwt_token
```

3. **Run development server:**
```bash
npm run dev
```

Server runs on `http://localhost:3000`

---

## Docker

### Build and Run

1. **Build image:**
```bash
docker build -t beanblock-backend:latest .
```

2. **Run container:**
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY \
  -e PINATA_JWT=your_jwt_token \
  -e CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3 \
  beanblock-backend:latest
```

### Docker Compose (Local)

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# Then start services
docker-compose up -d
```

This starts:
- Backend on port 3000
- MongoDB on port 27017

---

## Heroku

### Deploy

1. **Install Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login and create app:**
```bash
heroku login
heroku create beanblock-backend
```

3. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
heroku config:set PINATA_JWT=your_jwt_token
heroku config:set CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
heroku config:set JWT_SECRET=generate-strong-random-key
```

4. **Deploy:**
```bash
git push heroku main
```

5. **View logs:**
```bash
heroku logs --tail
```

### Procfile Setup

Create `Procfile` in root:
```
web: node dist/index.js
```

---

## Vercel

### Deploy

1. **Add `vercel.json` to root:**
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
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. **Install Vercel CLI:**
```bash
npm install -g vercel
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Set environment in Vercel dashboard:**
   - Go to Settings → Environment Variables
   - Add all variables from `.env`

### Using Git

Connect GitHub repo and Vercel will auto-deploy on push:
1. Import project from GitHub
2. Set environment variables
3. Deploy

---

## AWS

### Option 1: Elastic Beanstalk

1. **Install EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize:**
```bash
eb init -p node.js-18 beanblock-backend
```

3. **Create environment:**
```bash
eb create production-env
```

4. **Set environment variables:**
```bash
eb setenv \
  NODE_ENV=production \
  RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY \
  PINATA_JWT=your_jwt_token
```

5. **Deploy:**
```bash
eb deploy
```

### Option 2: EC2 + PM2

1. **SSH into instance:**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

2. **Install dependencies:**
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs
sudo npm install -g pm2
```

3. **Clone and setup:**
```bash
git clone your-repo
cd beanblock-backend
npm install
npm run build
```

4. **Create `.env` with credentials**

5. **Start with PM2:**
```bash
pm2 start dist/index.js --name "beanblock-backend"
pm2 startup
pm2 save
```

6. **Setup reverse proxy (nginx):**
```nginx
upstream backend {
  server localhost:3000;
}

server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## DigitalOcean

### App Platform

1. **Connect GitHub repo to DigitalOcean**

2. **Configure in `app.yaml`:**
```yaml
name: beanblock-backend
services:
  - name: api
    github:
      repo: your-username/beanblock-blockchain
      branch: main
    build_command: npm install && npm run build
    run_command: node dist/index.js
    http_port: 3000
    envs:
      - key: NODE_ENV
        value: production
      - key: RPC_URL
        scope: RUN_AND_BUILD_TIME
      - key: PINATA_JWT
        scope: RUN_TIME
```

3. **Push to GitHub:**
```bash
git push origin main
```

App Platform auto-deploys when you push.

### Manual VPS Deployment

Similar to AWS EC2 setup:

1. **Create droplet** (Node.js template)
2. **SSH and setup** as EC2 example above
3. **Add SSL with Let's Encrypt:**
```bash
sudo apt-get install certbot
sudo certbot certonly --nginx -d your-domain.com
```

---

## Environment Checklist

Before deploying to production:

### Blockchain
- [ ] RPC_URL is valid and accessible
- [ ] CONTRACT_ADDRESS is deployed on that network
- [ ] CHAIN_ID matches network
- [ ] PRIVATE_KEY is secure (optional)

### IPFS
- [ ] PINATA_JWT is valid and has upload permissions
- [ ] PINATA_API_KEY and PINATA_API_SECRET are set (optional)
- [ ] Rate limits won't be exceeded

### Security
- [ ] JWT_SECRET is strong random key
- [ ] CORS_ORIGIN matches frontend domain
- [ ] NODE_ENV is set to production
- [ ] No sensitive data in logs

### Performance
- [ ] Port is accessible (usually 3000 or 80/443)
- [ ] Logs are being written
- [ ] Uptime monitoring is configured
- [ ] Error alerts are enabled

### Testing
- [ ] Health check endpoint returns 200
- [ ] Can connect to blockchain
- [ ] Can upload to IPFS
- [ ] Can store documents
- [ ] Can retrieve documents

---

## Monitoring & Maintenance

### Logs
```bash
# Heroku
heroku logs --tail

# Docker
docker logs container-id

# AWS EB
eb logs -f

# Linux PM2
pm2 logs
```

### Health Checks
```bash
# Ping health endpoint
curl https://your-api.com/api/health

# Check blockchain connection
curl https://your-api.com/api/status
```

### Database Backups
If using MongoDB:
```bash
mongodump --uri mongodb+srv://user:pass@cluster.mongodb.net/beanblock
```

### Environment Variable Updates
```bash
# Heroku
heroku config:set RPC_URL=new_url

# Vercel
vercel env add RPC_URL

# AWS EB
eb setenv RPC_URL=new_url

# Docker
# Re-run with new environment variables
```

---

## Scaling

For high-traffic scenarios:

1. **Use CDN for IPFS:**
   - Requests go through CloudFlare
   - Caches IPFS responses

2. **Database scaling:**
   - Use MongoDB Atlas for managed database
   - Implement read replicas

3. **Load balancing:**
   - Deploy multiple instances
   - Use load balancer (Nginx, ELB, etc.)

4. **Caching:**
   - Implement Redis for hot data
   - Cache contract calls

---

## Troubleshooting

### Application won't start
1. Check logs for errors
2. Verify all required env vars are set
3. Test blockchain connection separately

### High memory usage
1. Check for memory leaks in logs
2. Reduce timeout values
3. Implement request pagination

### Blockchain connection issues
1. Verify RPC_URL is correct
2. Check network status
3. Try different RPC endpoint

### IPFS upload failures
1. Verify PINATA_JWT
2. Check file size
3. Test Pinata API directly

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Database backups automated
- [ ] Error monitoring enabled
- [ ] Rate limiting configured
- [ ] SSL certificate setup
- [ ] Auto-scaling configured
- [ ] Monitoring alerts active
- [ ] Disaster recovery plan
- [ ] Security audit completed
- [ ] Load testing done

---

**Last Updated:** January 2024
