export type Review = {
  author: string
  rating: number
  text: string
  date: string
}

export type AppVersion = {
  hash: string
  shipped: string
  note: string
}

/** A feature worth calling out, with one line on why it matters. */
export type Feature = {
  name: string
  note: string
}

/**
 * A real screenshot. Put the file in `public/shots/<mini id>/` and point
 * `src` at `/shots/<mini id>/<file>`. Leave the list empty rather than
 * shipping a placeholder.
 */
export type Screenshot = {
  src: string
  alt: string
  caption: string
}

export type MiniApp = {
  id: string
  name: string
  initials: string
  description: string
  category: string
  repo: string
  repoUrl: string
  openUrl: string
  /** Approximate, derived from GitHub language bytes. */
  lines: number
  /** Repo size reported by GitHub, in KB. Includes history. */
  sizeKb: number
  /** ISO date of the latest public commit. */
  updatedAt: string
  updatesPerWeek: number
  /** One or two sentences on why the product is useful. */
  why: string
  /** The kinds of people who get the most out of it. */
  bestFor: string[]
  /** Novel or unusual features, not a full feature list. */
  features: Feature[]
  screenshots: Screenshot[]
  versions: AppVersion[]
  reviewsByHash: Record<string, Review[]>
}
