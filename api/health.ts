import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Lightweight uptime probe.
 *
 * - Returns 200 + a small JSON payload so external monitors (UptimeRobot,
 *   Better Uptime, Pingdom, Vercel Monitor) can do a body match.
 * - Pinned with `Cache-Control: no-store` so a cached 200 cannot mask an
 *   outage between deploys.
 * - Does not touch any external service. The contact API has its own
 *   dependencies (Resend, Turnstile); checking those would couple uptime
 *   to vendor health and produce noisy false positives.
 */
export default function handler(_req: VercelRequest, res: VercelResponse): void {
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({
    status: 'ok',
    service: 'pinnacle-ai',
    timestamp: new Date().toISOString(),
  })
}
