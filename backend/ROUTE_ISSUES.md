# Route & Auth Issues (notes only)

This file lists the problems found in the backend routing/auth code and recommended fixes. No source files were changed; these are notes for review or patching.

## backend/src/routes/User.routes.js
- Validation: `SignUpBody.safeParse`/`SignInBody.safeParse` should be called with `req.body`.
- In `signin` handler the code previously used `SignInBody.safeParse(body.req)` (wrong order).
- JWT secret inconsistency: some code uses `process.env.JWT_SECRET`, other places reference an undefined `JWT_SECRET`. Use `process.env.JWT_SECRET` everywhere (or destructure at top).
- Password verification: do NOT find by `username`+`password`. Fetch user by `username` then `bcrypt.compare(req.body.password, user.password)` if passwords are hashed.
- Error handling: missing try/catch around async DB calls — add `try/catch` and return 500 on unexpected errors.
- Status codes: responses use `411` for validation/auth errors — replace with appropriate codes: `400` (bad request), `409` (conflict), `401` (unauthorized).

## backend/src/models/User.Model.js
- Missing `bcrypt` import if using `bcrypt` in pre-save hook.
- `pre('save')` hook must call `next()` (was calling `next` or returning incorrectly). Use `if (!this.isModified('password')) return next();` then hash and `next();`.
- `username` schema restricts `maxLength: 10` while routes treat `username` as an email. Either rename to `email` or allow longer strings and validate as email.

## backend/src/index.js
- `cors` must be applied as middleware: use `app.use(cors())` not `app.use(cors)`.
- Mount routes before calling `app.listen` so all routes are active when server starts.
- Ensure `.env` is loaded and `MONGODB_URL` and `JWT_SECRET` are present.

## backend/src/db/db.js
- `connectDB` should surface connection errors; current function logs and exits on error which is OK for dev but ensure `MONGODB_URL` environment variable is set.

## Recommendations
- Add explicit try/catch wrappers around route handlers or use an async error handler middleware.
- Standardize secrets access: at top of modules `const { JWT_SECRET, MONGODB_URL } = process.env` and assert presence on startup.
- Add consistent response payloads and status codes across routes.
- Add unit/integration tests for signup/signin flow.

If you want, I can create a pull request (or apply patches) to implement these fixes. Tell me which fixes to apply first.
