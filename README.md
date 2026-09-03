# my-api

Ready-to-use Node.js + Express API structure with a clean folder layout, centralized error handling, and example CRUD routes.

## Structure

```
my-api/
├── config/            # (empty) for DB connection, env config, etc.
├── controllers/       # business logic
│   └── userController.js
├── middleware/
│   ├── asyncHandler.js    # wraps async routes, forwards errors automatically
│   └── errorMiddleware.js # 404 handler + central error handler
├── routes/
│   ├── index.js       # combines all route modules under /api
│   └── userRoutes.js
├── app.js             # express app + middleware setup
├── server.js          # entry point, starts the server
├── .env
├── .env.example
└── package.json
```

## Setup

```bash
npm install
npm run dev     # development, auto-restart via nodemon
npm start       # production
```

Server runs on `http://localhost:3000` by default (see `.env`).

## Example endpoints

| Method | Endpoint          | Description       |
|--------|-------------------|--------------------|
| GET    | /api/users        | List all users     |
| GET    | /api/users/:id    | Get one user       |
| POST   | /api/users        | Create a user      |
| PUT    | /api/users/:id    | Update a user      |
| DELETE | /api/users/:id    | Delete a user      |

Data is stored in-memory in `userController.js` — swap it for a real database (Mongoose, Prisma, etc.) when ready.

## Adding a new resource

1. Create `controllers/xController.js` with your handler functions (wrap each in `asyncHandler`).
2. Create `routes/xRoutes.js` mapping HTTP methods to those handlers.
3. Register it in `routes/index.js`: `router.use("/x", xRoutes)`.

## Error handling

Throw an `ApiError(statusCode, message)` (from `middleware/errorMiddleware.js`) anywhere inside an `asyncHandler`-wrapped function, and it will automatically be caught and formatted as a JSON error response.
