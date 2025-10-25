## 🚀 Quick Start

1. **Install dependencies:**
```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install
```

2. **Start services:**
```bash
# Start PostgreSQL
cd apps/backend
docker-compose up -d

# Back to root and start both apps
cd ../..
pnpm dev

# Backend will be at http://localhost:3000
# Frontend will be at http://localhost:3001
```