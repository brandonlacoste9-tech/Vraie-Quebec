# Google AdSense — Vrai Québec

## What’s already in the repo

| Piece | Location | Status |
|-------|----------|--------|
| Publisher script | `components/adsense-script.tsx` via `app/layout.tsx` | Wired |
| Account meta | `google-adsense-account` in root layout metadata | Wired |
| `ads.txt` | `public/ads.txt` | `pub-4276130467303652` |
| Manual units | `components/ad-unit.tsx` | Renders only when slot env vars are set |
| Placements | Home, Restaurants, Bars, Agenda, Venue | Banner / in-article / sidebar |
| Privacy disclosure | `app/legal/privacy` | AdSense + cookies section |

Default client: `ca-pub-4276130467303652`

---

## Why ads often don’t show

1. **Site not “Ready”** in AdSense → Sites (still “Getting ready” / needs review).
2. **Wrong domain** — metadata uses `https://vraiquebec.com`. AdSense, DNS, and Vercel must all use the **same** production host (with or without `www` consistently).
3. **Auto ads off** — script alone is not enough; turn on Auto ads for the site in the AdSense UI, **or** create display units and set slot IDs.
4. **No slot IDs** — manual `<AdUnit>` components stay hidden until `NEXT_PUBLIC_ADSENSE_SLOT_*` is set.
5. **Thin / SPA-only content** — crawlable pages with Privacy, Contact, and real copy help approval.
6. **Ad blockers / test mode** — check without blockers; production should not force `data-adtest`.

---

## Checklist (do this in order)

### A. AdSense account

1. [adsense.google.com](https://www.google.com/adsense) → **Sites** → add **exact** production domain (e.g. `vraiquebec.com`).
2. Wait until status is **Ready** (or fix any “Requires attention” items).
3. **Ads → Overview → Auto ads** → enable for the site (recommended first step).
4. Optionally **Ads → By ad unit → Display** → create 3 units:
   - Horizontal / in-feed (home, list pages)
   - In-article (venue)
   - Rectangle sidebar (venue)
5. Copy each **data-ad-slot** number into Vercel env (below).

### B. Vercel / env

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-4276130467303652
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE=1234567891
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=1234567892
```

Redeploy after changing `NEXT_PUBLIC_*` vars.

### C. `ads.txt`

Live URL must return:

```text
google.com, pub-4276130467303652, DIRECT, f08c47fec0942fa0
```

- Served at `https://YOUR_DOMAIN/ads.txt` (root, not a rewrite that 404s).
- If you use both apex and `www`, either redirect one host to the other or host `ads.txt` on both.

### D. Policy pages (already present)

- `/legal/privacy` — must mention AdSense / third-party ads (done).
- `/legal/terms`
- `/contact`

### E. Verify after deploy

1. View source → `google-adsense-account` meta + `adsbygoogle.js?client=ca-pub-…`.
2. Open `/ads.txt` → correct line.
3. DevTools → Network → `pagead2.googlesyndication.com` loads (no CSP block).
4. Console → no AdSense errors (empty inventory is normal on brand-new / low-traffic sites).
5. AdSense → **Sites** → site health / ads.txt status green.

---

## Domain note

Root layout `metadataBase` is `https://vraiquebec.com`.  
If production is only `*.vercel.app` or a different brand domain, update:

- `app/layout.tsx` → `metadataBase`
- AdSense site URL
- Any canonical / OG URLs

Mismatch between the domain AdSense approved and the domain users hit is a common reason ads never fill.

---

## Disable ads (staging)

```bash
NEXT_PUBLIC_ADSENSE_ENABLED=false
```

---

## Code map

- `lib/adsense.ts` — client ID, slots, flags  
- `components/adsense-script.tsx` — loader  
- `components/ad-unit.tsx` — `AdUnit`, `AdBanner`, `AdInArticle`, `AdSidebar`  
- `public/ads.txt` — authorized seller line  
