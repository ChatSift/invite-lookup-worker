import { CloudflareWorkerKV } from 'types-cloudflare-worker';

declare global {
  const INVITES: CloudflareWorkerKV;
}
