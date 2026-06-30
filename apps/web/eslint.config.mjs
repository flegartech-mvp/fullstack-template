import { FlatCompat } from "@eslint/eslintrc";

// `next lint` is deprecated in Next 15; use the ESLint CLI with flat config.
// eslint-config-next still ships eslintrc-style presets, so we bridge them
// with FlatCompat.
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
];

export default config;
