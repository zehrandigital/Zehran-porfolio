'use client'

import { useQuery } from '@tanstack/react-query'
import { siteData, type SiteData } from '@/lib/site-data'

async function fetchSiteData(): Promise<SiteData> {
  const res = await fetch('/api/site-data')
  if (!res.ok) throw new Error(`Failed to load site data (${res.status})`)
  return res.json()
}

/**
 * Fetches all site content through /api/site-data via React Query.
 * `initialData` paints the static defaults instantly (zero loading state,
 * and keeps `data` non-undefined for TypeScript). Pairing it with
 * `initialDataUpdatedAt: 0` marks that data as already infinitely stale, so
 * — unlike plain initialData — it never blocks the real background fetch;
 * the query always still requests /api/site-data and swaps in whatever's
 * actually in the database (edited via /admin) as soon as it lands.
 */
export function useSiteData() {
  return useQuery({
    queryKey: ['site-data'],
    queryFn: fetchSiteData,
    initialData: siteData,
    initialDataUpdatedAt: 0,
  })
}
