import { loadEnvLocal } from "./load-env-local";

loadEnvLocal();

async function main() {
  const cronSecret = process.env.CRON_SECRET;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  if (!cronSecret) {
    console.error("Missing CRON_SECRET in .env.local");
    process.exit(1);
  }

  const url = new URL(
    "/api/revalidate/episodes",
    baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`,
  );

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cronSecret}` },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Revalidation failed (${response.status}): ${body}`);
    process.exit(1);
  }

  console.log(`Episodes cache revalidated via ${url.origin}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
