import { useState } from 'react'
import { STARTERS } from './data/minis'
import {
  formatCount,
  lineageReviews,
  liveReviews,
  liveVersion,
  nextHash,
  rankMinis,
  reviewsOn,
  reviewsThrough,
  scoreLabel,
  starTotal,
  versionNumber,
} from './lib/minis'
import type { AppVersion, MiniApp, Review, Shot } from './types'

export default function App() {
  const [apps, setApps] = useState<MiniApp[]>(STARTERS)
  const [openId, setOpenId] = useState<string | null>('click-plumbing')
  const [selectedHash, setSelectedHash] = useState('a3f9c1')
  const [draft, setDraft] = useState('')
  const [rating, setRating] = useState(5)
  const [justWiped, setJustWiped] = useState(false)

  const ranked = rankMinis(apps)
  const openApp = apps.find((app) => app.id === openId) ?? null
  const reviewedCount = apps.filter((app) => liveReviews(app).length > 0).length

  function toggleRow(id: string) {
    const app = apps.find((item) => item.id === id)
    if (openId === id) {
      setOpenId(null)
      return
    }
    setOpenId(id)
    setSelectedHash(app ? liveVersion(app).hash : selectedHash)
    setJustWiped(false)
    setDraft('')
  }

  function shipChange() {
    if (!openApp) return
    const live = liveVersion(openApp)
    const hash = nextHash(live.hash + String(openApp.versions.length))
    setApps((current) =>
      current.map((app) => {
        if (app.id !== openApp.id) return app
        return {
          ...app,
          versions: [...app.versions, { hash, shipped: 'Just now', note: 'Untitled change' }],
          reviewsByHash: { ...app.reviewsByHash, [hash]: [] },
        }
      }),
    )
    setSelectedHash(hash)
    setJustWiped(true)
    setDraft('')
  }

  function addReview() {
    if (!openApp) return
    const live = liveVersion(openApp)
    const text = draft.trim()
    if (!text || selectedHash !== live.hash) return
    const next: Review = { author: 'You', rating, text, date: 'Just now' }
    setApps((current) =>
      current.map((app) => {
        if (app.id !== openApp.id) return app
        const hash = liveVersion(app).hash
        return {
          ...app,
          reviewsByHash: {
            ...app.reviewsByHash,
            [hash]: [next, ...(app.reviewsByHash[hash] ?? [])],
          },
        }
      }),
    )
    setDraft('')
    setJustWiped(false)
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">AUTO MINI</p>
          <h1>A leaderboard of little apps</h1>
        </div>
        <p className="domain">automini.org</p>
      </header>

      <p className="lede">
        Click a row to open it. The board ranks the live hash. The dropdown is
        where you open the tool, check the GitHub pulse, and read reviews for
        that exact build.
      </p>

      <div className="stats">
        <Stat value={String(apps.length)} label="Listed minis" />
        <Stat value={String(reviewedCount)} label="With live reviews" />
      </div>

      <div className="board">
        <div className="board-head">
          <span className="rank-col">#</span>
          <span>Mini</span>
          <span className="rating-col">Rating</span>
        </div>
        {ranked.map((app, index) => (
          <BoardRow
            key={app.id}
            rank={index + 1}
            app={app}
            open={openId === app.id}
            viewingHash={openId === app.id ? selectedHash : liveVersion(app).hash}
            draft={draft}
            rating={rating}
            justWiped={justWiped && openId === app.id}
            onToggle={() => toggleRow(app.id)}
            onSelectHash={setSelectedHash}
            onDraft={setDraft}
            onRating={setRating}
            onShip={shipChange}
            onReview={addReview}
          />
        ))}
      </div>

      <p className="footnote">
        Version one uses sample minis on this page. Reviews stay in your
        browser until we add Supabase.
      </p>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function StackedScore({ live, lineage }: { live: string; lineage: string }) {
  return (
    <div className="stacked-score">
      <span className="live-score">{live}</span>
      <span className="lineage-score">{lineage}</span>
    </div>
  )
}

function AppMark({ initials }: { initials: string }) {
  return <div className="mark">{initials}</div>
}

function BoardRow({
  rank,
  app,
  open,
  viewingHash,
  draft,
  rating,
  justWiped,
  onToggle,
  onSelectHash,
  onDraft,
  onRating,
  onShip,
  onReview,
}: {
  rank: number
  app: MiniApp
  open: boolean
  viewingHash: string
  draft: string
  rating: number
  justWiped: boolean
  onToggle: () => void
  onSelectHash: (hash: string) => void
  onDraft: (value: string) => void
  onRating: (value: number) => void
  onShip: () => void
  onReview: () => void
}) {
  return (
    <article className={open ? 'row open' : 'row'}>
      <button type="button" className="row-toggle" onClick={onToggle}>
        <span className={open ? 'rank on' : 'rank'}>{rank}</span>
        <AppMark initials={app.initials} />
        <span className="row-copy">
          <strong>{app.name}</strong>
          <span>{app.description}</span>
        </span>
        <StackedScore
          live={scoreLabel(liveReviews(app))}
          lineage={scoreLabel(lineageReviews(app))}
        />
      </button>
      {open ? (
        <RowDropdown
          app={app}
          live={liveVersion(app)}
          viewingHash={viewingHash}
          draft={draft}
          rating={rating}
          justWiped={justWiped}
          onSelectHash={onSelectHash}
          onDraft={onDraft}
          onRating={onRating}
          onShip={onShip}
          onReview={onReview}
        />
      ) : null}
    </article>
  )
}

function RowDropdown({
  app,
  live,
  viewingHash,
  draft,
  rating,
  justWiped,
  onSelectHash,
  onDraft,
  onRating,
  onShip,
  onReview,
}: {
  app: MiniApp
  live: AppVersion
  viewingHash: string
  draft: string
  rating: number
  justWiped: boolean
  onSelectHash: (hash: string) => void
  onDraft: (value: string) => void
  onRating: (value: number) => void
  onShip: () => void
  onReview: () => void
}) {
  const viewing = app.versions.find((version) => version.hash === viewingHash) ?? live
  const viewingLive = viewing.hash === live.hash
  const viewingReviews = reviewsOn(app, viewing.hash)
  const viewingLineage = reviewsThrough(app, viewing.hash)

  return (
    <div className="dropdown">
      <div className="actions">
        <a className="btn primary" href={app.repoUrl} target="_blank" rel="noreferrer">
          Open
        </a>
        <a className="repo-link" href={app.repoUrl} target="_blank" rel="noreferrer">
          {app.repo}
        </a>
        <span className="pill">{app.category}</span>
        <code>{live.hash}</code>
      </div>

      <div className="pulse">
        <Stat value={formatCount(app.lines)} label="Lines of code" />
        <Stat value={`${app.sizeKb} KB`} label="All files" />
        <Stat value={app.lastUpdate} label="Last update" />
        <Stat value={app.updatesPerWeek.toFixed(1)} label="Updates / week · last 3 weeks" />
      </div>
      <p className="caption">
        GitHub pulse · {app.repo} · last 3 weeks for the weekly average
      </p>

      <p className="caption">From the app</p>
      <div className="shots">
        {app.shots.map((shot) => (
          <ShotFrame key={shot.title} shot={shot} />
        ))}
      </div>

      <div className="version-blurb">
        <strong>{viewing.note}</strong>
        <p>
          {viewingLive ? 'Live build' : `Retired v${versionNumber(app, viewing.hash)}`} ·
          shipped {viewing.shipped} · {scoreLabel(viewingReviews)} from {viewingReviews.length}
        </p>
        <p className="lineage">
          Lineage {scoreLabel(viewingLineage)} from {viewingLineage.length} ·{' '}
          {starTotal(viewingLineage)} stars in total
        </p>
      </div>

      {justWiped ? (
        <p className="notice">
          Live reviews reset. {app.name} has a new fingerprint. Older versions
          kept their stars.
        </p>
      ) : null}

      {app.versions.length > 1 ? (
        <section>
          <h2>Versions</h2>
          <table>
            <thead>
              <tr>
                <th>Ver</th>
                <th>Changed</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {[...app.versions].reverse().map((version) => {
                const own = reviewsOn(app, version.hash)
                const through = reviewsThrough(app, version.hash)
                const isLive = version.hash === live.hash
                const isViewing = version.hash === viewing.hash
                return (
                  <tr key={version.hash}>
                    <td>
                      <button
                        type="button"
                        className={isViewing ? 'btn primary compact' : 'btn ghost compact'}
                        onClick={() => onSelectHash(version.hash)}
                      >
                        {isLive
                          ? `v${versionNumber(app, version.hash)} live`
                          : `v${versionNumber(app, version.hash)}`}
                      </button>
                    </td>
                    <td>
                      {version.note} · {version.shipped}
                    </td>
                    <td>
                      <StackedScore live={scoreLabel(own)} lineage={scoreLabel(through)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      ) : null}

      {viewingReviews.length > 0 ? (
        <section>
          <h2>{viewingLive ? 'Live reviews' : 'Reviews on this hash'}</h2>
          <ul className="reviews">
            {viewingReviews.map((review, index) => (
              <li key={`${review.author}-${index}`}>
                <div className="review-meta">
                  <strong>{review.author}</strong>
                  <span className="muted">{review.rating} / 5</span>
                  <span className="muted">{review.date}</span>
                </div>
                <p>{review.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2>Leave a review</h2>
        {viewingLive ? (
          <p className="caption">
            Posts to {live.hash}. A later change keeps this review in history
            and clears it from the live board.
          </p>
        ) : (
          <p className="notice quiet">
            This version is closed. Switch back to the live hash to review the
            current build.
          </p>
        )}
        <div className="rating-picks">
          {[5, 4, 3, 2, 1].map((value) => (
            <button
              key={value}
              type="button"
              className={rating === value ? 'pill on' : 'pill'}
              disabled={!viewingLive}
              onClick={() => onRating(value)}
            >
              {value} / 5
            </button>
          ))}
        </div>
        <input
          className="review-input"
          value={draft}
          disabled={!viewingLive}
          placeholder={
            viewingLive
              ? 'What happened when you used this exact version?'
              : 'Reviews only post to the live hash'
          }
          onChange={(event) => onDraft(event.target.value)}
        />
        <div className="actions">
          <button
            type="button"
            className="btn primary"
            onClick={onReview}
            disabled={!viewingLive || !draft.trim()}
          >
            Post to this hash
          </button>
          {viewingLive ? (
            <button type="button" className="btn ghost" onClick={onShip}>
              Ship a change
            </button>
          ) : (
            <button type="button" className="btn ghost" onClick={() => onSelectHash(live.hash)}>
              Back to live
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

function ShotFrame({ shot }: { shot: Shot }) {
  return (
    <div className="shot">
      <div className="shot-label">{shot.title}</div>
      <div className="shot-body">
        {shot.bars.map((width, index) => (
          <span
            key={`${shot.title}-${index}`}
            className={index === 1 ? 'bar strong' : 'bar'}
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </div>
  )
}
