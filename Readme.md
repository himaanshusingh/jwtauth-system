# JWT Auth System

A full-stack MERN application that demonstrates **JWT authentication** and **role-based access control (RBAC)**. Users register and log in to receive a token; protected routes and API endpoints enforce access by role (`user`, `manager`, `admin`).

## Features

- User registration and login with bcrypt-hashed passwords
- JWT sessions stored in `localStorage` and sent as `Bearer` tokens
- Protected React routes with role checks
- Role-specific areas: User, Manager, and Admin
- Dashboard showing which areas the current role can access
- MongoDB persistence via Mongoose
- Production build served from the Express backend (single deployable app)
- Toast notifications (Sonner) for auth feedback

## Tech Stack

| Layer    | Technologies                                      |
| -------- | ------------------------------------------------- |
| Frontend | React 19, React Router 7, Vite 6, Tailwind CSS 4  |
| Backend  | Node.js, Express 4, JWT, bcryptjs               |
| Database | MongoDB (Mongoose)                                |
| Tooling  | Concurrently (run frontend + backend in dev)      |

## Project Structure

```
jwtauth-system/
├── backend/
│   ├── app.js                 # Express server & production static hosting
│   └── src/
│       ├── config/db.js       # MongoDB connection
│       ├── middleware/auth.js # JWT verify & role authorization helpers
│       ├── models/User.js     # User schema & password hashing
│       └── routes/auth.js     # Auth API routes
├── frontend/
│   └── src/
│       ├── components/        # Navbar, ProtectedRoute
│       ├── contexts/          # AuthContext (login, register, session)
│       └── pages/             # Landing, Login, Register, Dashboard, role areas
├── package.json               # Root scripts (dev, build, start)
└── render.yaml                # Render.com deployment blueprint
```

## Roles & Access

| Role    | User Area | Manager Area | Admin Area |
| ------- | --------- | ------------ | ---------- |
| `user`  | Yes       | No           | No         |
| `manager` | Yes     | Yes          | No         |
| `admin` | Yes       | Yes          | Yes        |

During registration, a role can be selected for demo purposes. In a real production app, elevated roles would typically be assigned by an administrator rather than chosen at signup.

## API Endpoints

Base path: `/api/auth`

| Method | Path        | Auth     | Description                    |
| ------ | ----------- | -------- | ------------------------------ |
| POST   | `/register` | Public   | Create account, returns JWT    |
| POST   | `/login`    | Public   | Sign in, returns JWT           |
| GET    | `/me`       | Bearer   | Get current user profile       |

**Register / login body (register):**

```json
{
  "email": "user@example.com",
  "password": "secret123",
  "fullName": "Jane Doe",
  "role": "user"
}
```

**Login body:**

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Local Development

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd jwtauth-system
npm run install-all
```

### 2. Configure environment variables

Copy the sample env files and fill in your values:

```bash
cp backend/.env.sample backend/.env
```

**`backend/.env`**

| Variable     | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `PORT`       | API port (default `3000`)                                                   |
| `MONGO_URI`  | MongoDB connection string **without** a database name (see note below)      |
| `JWT_SECRET` | Secret key for signing JWTs (use a long random string)                      |
| `NODE_ENV`   | `development` for local dev; omit or set to `development`                 |

> **Note:** The app connects to `MONGO_URI/jwtauth-system`. Provide only the cluster host, e.g. `mongodb+srv://user:pass@cluster.mongodb.net`, not a path with a database name.

`frontend/.env.sample` includes `VITE_API_URL`, but the app uses relative `/api` URLs. In development, Vite proxies `/api` to the backend — no frontend `.env` is required for local setup.

### 3. Run the app

Start both servers:

```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

Or run them separately:

```bash
npm run dev:backend
npm run dev:frontend
```

## Available Scripts

| Script              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run install-all` | Install root, backend, and frontend dependencies |
| `npm run dev`       | Run backend (nodemon) and frontend (Vite) together |
| `npm run dev:backend` | Backend only                                   |
| `npm run dev:frontend` | Frontend only                                 |
| `npm run build`     | Install deps and build frontend to `frontend/dist` |
| `npm start`         | Start production server (backend serves API + static UI) |

## Production & Deployment (Render)

In production (`NODE_ENV=production`), Express serves the built React app from `frontend/dist` and handles client-side routing via a catch-all route.

### Render (recommended)

Use the included `render.yaml` blueprint, or create a **Web Service** manually:

| Setting        | Value                          |
| -------------- | ------------------------------ |
| Build Command  | `npm install && npm run build` |
| Start Command  | `npm start`                    |
| Root Directory | *(repository root)*            |

**Environment variables on Render:**

| Variable     | Value           |
| ------------ | --------------- |
| `NODE_ENV`   | `production`    |
| `MONGO_URI`  | Atlas connection string (no DB name suffix) |
| `JWT_SECRET` | Strong random secret |

In MongoDB Atlas, allow network access from Render (e.g. `0.0.0.0/0` for testing, or restrict to known IPs for production).

### Local production test

```bash
npm run build
# Set NODE_ENV=production and backend/.env vars, then:
npm start
```

Open [http://localhost:3000](http://localhost:3000) (or your configured `PORT`).

## Frontend Routes

| Path            | Access                          |
| --------------- | ------------------------------- |
| `/`             | Public — landing page           |
| `/login`        | Public                          |
| `/register`     | Public                          |
| `/dashboard`    | Authenticated                   |
| `/user`         | `user`, `manager`, `admin`      |
| `/manager`      | `manager`, `admin`              |
| `/admin`        | `admin` only                    |
| `/unauthorized` | Shown when role is not allowed  |

## Security Notes

- Passwords are hashed with bcrypt before storage.
- JWTs expire after 30 days (configured in `backend/src/routes/auth.js`).
- Never commit `.env` files or secrets to version control.
- Restrict self-assigned admin/manager roles before deploying to a public environment.

## License

This project is for educational and demonstration purposes.
