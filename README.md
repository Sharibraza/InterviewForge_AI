# StriveX

Full-stack web application for AI-assisted interview preparation.

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Sass
- Axios

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- Auth: JWT + bcrypt
- Google GenAI SDK (@google/genai)

## Repository Structure

- `Frontend/` — React + Vite client
- `Backend/` — Express API server

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB (local or hosted)

### 1) Clone

```bash
git clone https://github.com/Sharibraza/InterviewForge_AI_F.git
cd InterviewForge_AI_F
```

### 2) Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` (example):

```env
PORT=3000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
GOOGLE_API_KEY=YOUR_GOOGLE_GENAI_API_KEY
```

Run the API server (uses nodemon):

```bash
npm run dev
```

The server starts on port `3000` by default (see `Backend/server.js`).

### 3) Frontend setup

In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Vite will print the local dev URL (commonly `http://localhost:5173`).

## Scripts

### Backend (`Backend/`)

- `npm run dev` — start the dev server (`server.js`) with nodemon

### Frontend (`Frontend/`)

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build

## Environment Variables

Backend reads environment variables via `dotenv`.

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default in code: 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `GOOGLE_API_KEY` | Google GenAI API key |

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-change`
3. Commit your changes
4. Open a pull request

## License

Add a license file (e.g., MIT) if you plan to open-source this project.
