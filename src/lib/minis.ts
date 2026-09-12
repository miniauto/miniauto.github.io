import type { MiniApp, Review } from '../types'

export function liveVersion(app: MiniApp) {
  return app.versions[app.versions.length - 1]
}

export function reviewsOn(app: MiniApp, hash: string): Review[] {
  return app.reviewsByHash[hash] ?? []
}

export function liveReviews(app: MiniApp): Review[] {
  return reviewsOn(app, liveVersion(app).hash)
}

export function lineageReviews(app: MiniApp): Review[] {
  return app.versions.flatMap((version) => reviewsOn(app, version.hash))
}

export function reviewsThrough(app: MiniApp, hash: string): Review[] {
  const index = app.versions.findIndex((version) => version.hash === hash)
  if (index < 0) return []
  return app.versions
    .slice(0, index + 1)
    .flatMap((version) => reviewsOn(app, version.hash))
}

export function average(reviews: Review[]): number | null {
  if (reviews.length === 0) return null
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
}

export function scoreLabel(reviews: Review[]): string {
  const value = average(reviews)
  return value == null ? '—' : value.toFixed(1)
}

export function starTotal(reviews: Review[]): number {
  return reviews.reduce((sum, review) => sum + review.rating, 0)
}

export function versionNumber(app: MiniApp, hash: string): number {
  return app.versions.findIndex((version) => version.hash === hash) + 1
}

export function formatCount(value: number): string {
  return value.toLocaleString('en-US')
}

export function formatSize(kb: number): string {
  if (!kb) return '—'
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${formatCount(kb)} KB`
}

export function formatDate(iso: string): string {
  if (!iso) return '—'
  const date = new Date(`${iso}T00:00:00Z`)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function monthsSince(iso: string, now = new Date()): number {
  if (!iso) return 0
  const then = new Date(`${iso}T00:00:00Z`)
  const days = (now.getTime() - then.getTime()) / 86_400_000
  return Math.floor(days / 30)
}

export function freshnessLabel(iso: string, now = new Date()): string {
  const months = monthsSince(iso, now)
  if (months <= 0) return 'This month'
  if (months === 1) return 'Last month'
  if (months < 12) return `${months} months ago`
  const years = Math.floor(months / 12)
  return years === 1 ? 'Over a year ago' : `Over ${years} years ago`
}

export function nextHash(seed: string): string {
  let n = 0
  for (let i = 0; i < seed.length; i++) n = (n * 33 + seed.charCodeAt(i)) % 16777215
  return (n + 7919).toString(16).padStart(6, '0').slice(0, 6)
}

export function anyReviews(apps: MiniApp[]): boolean {
  return apps.some((app) => lineageReviews(app).length > 0)
}

export function rankMinis(apps: MiniApp[]): MiniApp[] {
  return [...apps].sort((a, b) => {
    const aScore = average(liveReviews(a)) ?? -1
    const bScore = average(liveReviews(b)) ?? -1
    if (bScore !== aScore) return bScore - aScore

    const aCount = liveReviews(a).length
    const bCount = liveReviews(b).length
    if (bCount !== aCount) return bCount - aCount

    return b.updatedAt.localeCompare(a.updatedAt)
  })
}
