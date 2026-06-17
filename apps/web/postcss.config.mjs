/**
 * PostCSS config for Tailwind CSS v4.
 *
 * Without registering the @tailwindcss/postcss plugin, Next.js processes
 * `@import "tailwindcss"` as base theme/preflight only and never generates the
 * utility classes, so the app builds successfully but renders unstyled.
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
