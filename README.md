# SkillSwap: Student Skills Exchange Platform

SkillSwap is a peer-to-peer mobile app where students exchange skills instead of money.

## Tech Stack

- `mobile/` - React Native (Expo, Android-first)
- `backend/` - Node.js + Express + MongoDB (Mongoose) + Socket.IO
- Deployment target: Render (backend)

## Project Structure

- `mobile/src/screens/` app screens
- `mobile/src/context/AuthContext.tsx` login/session handling
- `backend/src/models/` MongoDB models
- `backend/src/routes/` REST API routes
- `render.yaml` Render blueprint

## Local Setup

### 1) Backend (MongoDB)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Local backend URL: `http://localhost:4000`

### 2) Mobile App (Android)

```bash
cd mobile
cp .env.example .env
npm install
npm run start
```

API URL is set in `mobile/.env`:

```env
EXPO_PUBLIC_API_URL=https://skillswapp-xz6d.onrender.com
```

For local backend testing, switch it to:

```env
EXPO_PUBLIC_API_URL=http://localhost:4000
```

If testing on a physical Android device with local backend, use your LAN IP instead of localhost.

## Deploy Backend on Render

1. Push this repo to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select your repo (Render will read `render.yaml`).
4. In Render service env vars, set:

- `MONGODB_URI`
- `JWT_SECRET`

5. Deploy.

### Render commands (already configured)

- Build: `npm install && npm run build`
- Start: `npm start`
- Health check: `/health`

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `PATCH /api/users/me`
- `GET /api/skills`
- `GET /api/matches`
- `GET /api/chats`
- `POST /api/chats/start`
- `GET /api/chats/:chatId/messages`
- `POST /api/chats/:chatId/messages`
- `GET /api/sessions`
- `POST /api/sessions`
- `PATCH /api/sessions/:id`
- `POST /api/ratings`

## Important Security Note

The MongoDB connection string and JWT secret should only be stored in `.env` and Render dashboard secrets, not committed publicly.
