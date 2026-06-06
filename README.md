# The Social 99 — MERN Stack

A pixel-accurate clone of thesocial99.com built with the MERN stack.

```
social/
├── frontend/   React + Vite + Tailwind CSS v4
└── backend/    Express + MongoDB (Mongoose)
```

## Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`)

## Setup

```bash
# install dependencies for both apps
npm run install:all

# seed the database with the blog posts
npm run seed
```

## Running

Open two terminals (or use the root scripts):

```bash
npm run backend    # http://localhost:5001
npm run frontend   # http://localhost:5173
```

## Backend API

Base URL: `http://localhost:5001/api`

| Method | Endpoint            | Description                       |
|--------|---------------------|-----------------------------------|
| POST   | `/contact`          | Submit a contact / book-a-call    |
| GET    | `/contact`          | List all contact submissions      |
| POST   | `/subscribe`        | Subscribe to the newsletter       |
| GET    | `/subscribe`        | List all subscribers              |
| GET    | `/blogs`            | List all blog posts               |
| GET    | `/blogs/:slug`      | Get a single blog post            |
| POST   | `/blogs`            | Create a blog post                |

### Environment

`backend/.env`
```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/social99
CLIENT_URL=http://localhost:5173
```

`frontend/.env`
```
VITE_API_URL=http://localhost:5001/api
```
