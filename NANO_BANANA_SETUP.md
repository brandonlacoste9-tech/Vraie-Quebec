# Nano Banana Setup Guide

## Issue
Nano Banana AI image generation requires an `AI_GATEWAY_API_KEY` environment variable.

## Solution

### Option 1: Use Vercel AI Gateway (Recommended)
1. Go to [Vercel AI Gateway](https://vercel.com/docs/ai-gateway)
2. Get your API key
3. Add to environment variables:
   ```
   AI_GATEWAY_API_KEY=your_key_here
   ```

### Option 2: Use Direct Google Gemini API
If you prefer to use Google Gemini directly, update `app/api/generate-image/route.ts`:

```typescript
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || "",
})
```

Then add to environment variables:
```
GOOGLE_GEMINI_API_KEY=your_key_here
```

## Testing
After setting up, test at `/creer` page. The API key check happens automatically on page load.

