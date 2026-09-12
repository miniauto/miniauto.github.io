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

export type Shot = {
  title: string
  bars: number[]
}

export type MiniApp = {
  id: string
  name: string
  initials: string
  description: string
  category: string
  repo: string
  repoUrl: string
  lines: number
  sizeKb: number
  lastUpdate: string
  updatesPerWeek: number
  shots: Shot[]
  versions: AppVersion[]
  reviewsByHash: Record<string, Review[]>
}
