# Deployment Guide

LEXORA is a Vite + React SPA with static build output. Deploy to any static hosting platform.

## Build Output

```bash
npm run build
```

Outputs to `dist/` directory with:
- Minified, code-split JavaScript bundles
- Optimized CSS
- Compressed assets
- HTML entry point

## Platform-Specific Guides

### Vercel (Recommended)

1. **Connect repository**:
   - Push to GitHub
   - Import project in [Vercel Dashboard](https://vercel.com)

2. **Configure build**:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**:
   ```
   VITE_APP_ENV=production
   VITE_PUBLIC_BASE_URL=https://your-domain.com
   VITE_API_BASE_URL=https://api.your-domain.com
   VITE_SENTRY_DSN=https://...
   ```

4. **Deploy**: Automatically on push to `main`

### Netlify

1. **Connect repository** via [Netlify Dashboard](https://app.netlify.com)

2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment variables**: Same as Vercel

4. **netlify.toml** (optional):
   ```toml
   [build]
   command = "npm run build"
   publish = "dist"

   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

### GitHub Pages

1. **Update `vite.config.js`**:
   ```js
   export default {
     base: '/Lexora/', // if repo is not user/org site
     // ... rest of config
   }
   ```

2. **Create `.github/workflows/deploy.yml`**:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

### Self-Hosted (Docker)

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`nginx.conf`:
```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

## Pre-Deployment Checklist

- [ ] All tests pass: `npm run test`
- [ ] Lint passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] `.env` file is production-ready
- [ ] `VITE_PUBLIC_BASE_URL` is set correctly
- [ ] API endpoints configured if needed
- [ ] Sentry DSN added (if using error tracking)
- [ ] Analytics ID configured (if applicable)

## Monitoring

### Error Tracking (Future)

Integrate Sentry via `src/config/env.js`:
```js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: env.sentryDsn,
  environment: env.appEnv,
});
```

### Analytics (Future)

Set `VITE_ANALYTICS_ID` in environment and integrate with Google Analytics or similar.

---

For questions, open an issue or contact **deploy@lexora.app**
