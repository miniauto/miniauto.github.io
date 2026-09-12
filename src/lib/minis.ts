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

export function nextHash(seed: string): string {
  let n = 0
  for (let i = 0; i < seed.length; i++) n = (n * 33 + seed.charCodeAt(i)) % 16777215
  return (n + 7919).toString(16).padStart(6, '0').slice(0, 6)
}

export function rankMinis(apps: MiniApp[]): MiniApp[] {
  return [...apps].sort((a, b) => {
    const aScore = average(liveReviews(a)) ?? -1
    const bScore = average(liveReviews(b)) ?? -1
    if (bScore !== aScore) return bScore - aScore
    return liveReviews(b).length - liveReviews(a).length
  })
}
