/**
 * Base URL of the backend REST API.
 *
 * The `NEXT_PUBLIC_` prefix is required so Next.js inlines the value into
 * client bundles — plain variables such as `BASE_URL` are `undefined` in the
 * browser, which produces `Failed to parse URL from undefined/...` errors.
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");
