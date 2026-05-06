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

For a physical phone (recommended):

```bash
cd mobile
npm run start:phone
```

Then open Expo Go on your phone and scan the QR code.

API URL is set in `mobile/.env`:

```env
EXPO_PUBLIC_API_URL=https://skillswapp-xz6d.onrender.com
```

For local backend testing, switch it to:

```env
EXPO_PUBLIC_API_URL=http://localhost:4000
```

If testing on a physical Android device with local backend, use your LAN IP instead of localhost.

### Mobile Red Screen / Startup Fix

If mobile fails with red screen or startup issues:

1. Confirm `mobile/.env` has:
```env
EXPO_PUBLIC_API_URL=https://skillswapp-xz6d.onrender.com
```
2. Start with clean cache:
```bash
cd mobile
npm run start:clear
```
3. If backend is waking on Render, wait 30-60 seconds and retry login.

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

### If Render says "runtime not ready" or exits on startup

1. Open your Render service: `skillswapp-backend`.
2. Go to **Environment** and confirm these keys exist:
- `MONGODB_URI` (your MongoDB Atlas connection string)
- `JWT_SECRET` (long random string; if using this repo's `render.yaml`, Render can auto-generate it on new blueprint setup)
3. Save changes and click **Manual Deploy** -> **Deploy latest commit**.
4. Wait for logs to show startup success, then test:
- `https://skillswapp-xz6d.onrender.com/health`
5. If this URL responds with JSON, your mobile app should connect.

Important for existing/manual Render services:
- `render.yaml` `generateValue: true` only auto-creates secrets when a Blueprint manages the service.
- If your service was created manually (not Blueprint-synced), you must add `JWT_SECRET` yourself in the Render dashboard.

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
