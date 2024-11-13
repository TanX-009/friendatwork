# ENV

## Backend

`backend/.env`
```env
MONGO_URI=<mongodb url here>
JWT_SECRET=<secret here>
PORT=<default port here>
```

### To generate JWT_SECRET
```bash
openssl rand -hex 64
```

## Frontend

`frontend/.env.local`
```env
NEXT_PUBLIC_API_URL="http://localhost:<backend port here>/api"
```
