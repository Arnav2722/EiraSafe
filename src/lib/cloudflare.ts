// src/lib/cloudflare.ts (or src/config/cloudflare.ts)

/**
 * Cloudflare Turnstile Client-Side Configuration
 *
 * This file centralizes the client-side configuration for Cloudflare services,
 * specifically for Turnstile CAPTCHA.
 *
 * To use this:
 * 1. Go to your Cloudflare dashboard (cloudflare.com).
 * 2. Navigate to 'Turnstile' on the left sidebar.
 * 3. Add a new site, choosing 'Managed' or 'Non-interactive' mode.
 * 4. Copy the 'Site Key' (public key) provided by Cloudflare.
 * 5. Add this key to your project's .env file, making sure to prefix it
 * with `VITE_` if you are using Vite (e.g., `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`).
 * For other bundlers (Webpack, Parcel, etc.), the prefix might differ
 * (e.g., `REACT_APP_` for Create React App, or no prefix if handled differently).
 * 6. Make sure your `.env` file is in your project root and your build tool
 * is configured to load environment variables.
 *
 * DO NOT expose your Secret Key (server-side key) in any client-side code.
 * The Secret Key should only be used on your backend for verification.
 */

// Retrieve the site key from environment variables.
// Using `import.meta.env` for Vite projects.
// Adjust the environment variable name and access method based on your build tool.
const cloudflareTurnstileSiteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;

if (!cloudflareTurnstileSiteKey) {
console.error(
    "Cloudflare Turnstile Site Key (VITE_CLOUDFLARE_TURNSTILE_SITE_KEY) is not set.",
    "Please add it to your .env file. Turnstile will not work without it."
);
}

export const CLOUDFLARE_TURNSTILE_SITE_KEY = cloudflareTurnstileSiteKey;

// You can add other Cloudflare-related client-side configs here if needed.
// Example:
// export const CLOUDFLARE_ANALYTICS_TOKEN = import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN;