# Windows: "UNKNOWN errno -4094" on layout.js

If you see errors like:
```text
Error: UNKNOWN: unknown error, open '...\\.next\\static\\chunks\\app\\[locale]\\layout.js'
errno: -4094
```

**What we did in the project:**
- **Default dev uses Turbopack** (`next dev --turbo`) so chunk paths are handled differently and this error is usually avoided.
- **Webpack disk cache is disabled in dev** so if you use `npm run dev:webpack`, fewer files are locked.

**If the error still appears:**

1. **Exclude the project folder from Windows Defender**
   - Windows Security → Virus & threat protection → Manage settings → Exclusions → Add exclusion → Folder
   - Add: `E:\UAE project\gtcfx-frontend-v2` (or your project path)

2. **Use Turbopack** (default): `npm run dev`  
   If something doesn’t work with Turbopack, use: `npm run dev:webpack`

3. **Run from WSL** (Windows Subsystem for Linux) so the app runs on a Linux filesystem and avoids this Windows file lock.
