# API Documentation

LEXORA is currently a **static frontend application** with client-side state management. This document outlines the API architecture for future backend integration and current environment-based configuration.

## Current Architecture

**Frontend-only** with:
- **Zustand** for state management
- **React Router** for client-side routing
- **LocalStorage** for user preferences (dark mode, progress)
- **Mock data** for lessons and exercises

## Future Backend Integration

### Overview

When a backend is added, it will expose a REST or GraphQL API for:

- User authentication & profiles
- Lesson progress tracking
- AI tutor interactions
- Custom word lists
- Performance analytics

### Configuration

API endpoints are configured via environment variables:

```env
# .env.production
VITE_API_BASE_URL=https://api.lexora.app
VITE_AUTH_ENDPOINT=/auth
VITE_LESSONS_ENDPOINT=/lessons
```

Access in your code:

```jsx
import env from '../config/env';

const fetchLessons = async () => {
  const res = await fetch(`${env.apiBaseUrl}/lessons`);
  return res.json();
};
```

## Client-Side Storage

### LocalStorage Keys

```js
// Dark mode preference
localStorage.getItem('darkMode')

// User progress (future)
localStorage.getItem('userProgress')
```

### IndexedDB (Future)

For offline support and large datasets:

```js
// Example: Store lesson cache
const db = await openDB('lexora');
await db.put('lessons', lessonData, lessonId);
```

## Authentication (Future)

When implemented:

```
POST /auth/login
POST /auth/register
POST /auth/logout
GET /auth/me (current user)
POST /auth/refresh (token refresh)
```

### Token Storage

Store JWT in **httpOnly cookie** or secure storage (not localStorage).

```js
// Fetch with token
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};
```

## Error Handling

All API responses will follow a standard format:

```json
{
  "success": true,
  "data": { /* response */ },
  "error": null
}
```

Or on error:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Invalid credentials"
  }
}
```

Handle via centralized error logger:

```jsx
import { logError } from '../utils/errorLogger';

try {
  const res = await fetch(`${env.apiBaseUrl}/lessons`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  logError(err, { endpoint: '/lessons' });
}
```

## Rate Limiting (Future)

Anticipated headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1234567890
```

## Versioning

API versions will be prefixed:

```
GET /api/v1/lessons
POST /api/v1/auth/login
```

## Data Models (Future)

### Lesson

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "language": "es|fr|de|it|ar",
  "level": "beginner|intermediate|advanced",
  "duration": "number (minutes)",
  "content": [{ "type": "vocab|grammar|exercise" }]
}
```

### User Progress

```json
{
  "userId": "string",
  "lessonId": "string",
  "completedAt": "ISO8601 date",
  "score": "number (0-100)",
  "attempts": "number"
}
```

## Testing

Use mock API responses in tests:

```js
import { vi } from 'vitest';

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ lessons: [] }),
});
```

## Rate Limiting Best Practices

- Implement **request debouncing** on client
- Add **exponential backoff** for retries
- Cache responses where appropriate

## Contact

For backend API questions: **api@lexora.app**

---

See [DEPLOYMENT.md](./DEPLOYMENT.md) for environment setup and [CONTRIBUTING.md](./CONTRIBUTING.md) for frontend integration patterns.
