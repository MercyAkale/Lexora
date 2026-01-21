<!-- Icon Placeholder -->

To complete PWA setup, add these icons to the `public/` directory:

- **favicon.ico** (32x32 or 64x64) - Browser tab icon
- **apple-touch-icon.png** (180x180) - iOS home screen icon
- **icon-192.png** (192x192) - Android home screen icon
- **icon-512.png** (512x512) - Splash screen / app drawer icon

### Generation Tips

Using online tools like:
- [favicon-generator.org](https://www.favicon-generator.org/)
- [pwa-asset-generator](https://github.com/onderceylan/pwa-asset-generator)

Or create programmatically:
```bash
npm install -g pwa-asset-generator
pwa-asset-generator logo.png ./public/icon --type png --splash-only --quality 100
```

### Requirements

- Dimensions as specified above
- PNG format (except favicon.ico)
- Transparent background recommended for maskable icon (512px)
- Follows brand colors (indigo/teal theme)

Once added, manifest.json and index.html links are already configured.
