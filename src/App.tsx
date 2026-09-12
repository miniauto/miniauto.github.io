import { useState } from 'react'
import { STARTERS } from './data/minis'
import {
  anyReviews,
  formatCount,
  formatDate,
  formatSize,
  freshnessLabel,
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
import type { AppVersion, MiniApp, Review } from './types'

export default function App() {
  const [apps, setApps] = useState<MiniApp[]>(STARTERS)
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedHash, setSelectedHash] = useState('')
  const [draft, setDraft] = useState('')
  const [rating, setRating] = useState(5)
  const [justWiped, setJustWiped] = useState(false)

  const ranked = rankMinis(apps)
  const openApp = apps.find((app) => app.id === openId) ?? null
  const ranking = anyReviews(apps)
  const reviewedCount = apps.filter((app) => liveReviews(app).length > 0).length

  function toggleRow(id: string) {
    if (openId === id) {
      setOpenId(null)
      return
    }
    const app = apps.find((item) => item.id === id)
    setOpenId(id)
    setSelectedHash(app ? liveVersion(app).hash : '')
    setJustWiped(false)
    setDraft('')
  }

  function shipChange() {
    if (!openApp) return
    const live = liveVersion(openApp)
    const hash = nextHash(live.hash + String(openApp.versions.length))
    const today = new Date().toISOString().slice(0, 10)
    setApps((current) =>
      current.map((app) => {
        if (app.id !== openApp.id) return app
        return {
          ...app,
          updatedAt: today,
          versions: [
            ...app.versions,
            { hash, shipped: today, note: 'untitled change' },
          ],
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
        <p className="eyebrow">Auto Mini</p>
        <h1>A leaderboard of little apps</h1>
        <p className="lede">
          Every mini here lives in a public GitHub repo. Reviews attach to one
          exact commit — change the app and that build starts over.
        </p>
        <p className="meta-line">
          <span>{apps.length} minis</span>
          <span>{reviewedCount} reviewed</span>
          <a href="https://automini.org">automini.org</a>
        </p>
      </header>

      <div className="board">
        <div className="board-head">
          <span className="col-name">Mini</span>
          <span className="col-score">{ranking ? 'Rating' : 'Lines · size'}</span>
        </div>
        {ranked.map((app, index) => (
          <BoardRow
            key={app.id}
            rank={index + 1}
            showRank={ranking}
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
        {ranking
          ? 'Ranked by the live commit. Retired versions keep their stars.'
          : 'Nothing is ranked yet — ordered by latest commit. Reviews stay in your browser until we add Supabase.'}
      </p>
    </div>
  )
}

function BoardRow({
  rank,
  showRank,
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
  showRank: boolean
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
  const live = liveReviews(app)
  const lineage = lineageReviews(app)

  return (
    <article className={open ? 'row open' : 'row'}>
      <button
        type="button"
        className={showRank ? 'row-toggle' : 'row-toggle no-rank'}
        onClick={onToggle}
        aria-expanded={open}
      >
        {showRank ? <span className="col-rank">{rank}</span> : null}
        <span className="mark" aria-hidden="true">
          {app.initials}
        </span>
        <span className="col-name">
          <span className="row-name">{app.name}</span>
          <span className="row-desc">{app.description}</span>
        </span>
        <span className="col-score">
          {live.length === 0 ? (
            <span className="stacked-score">
              <span className="quiet-value">
                {app.lines ? `~${formatCount(app.lines)}` : '—'}
              </span>
              <span className="lineage-score">{formatSize(app.sizeKb)}</span>
            </span>
          ) : (
            <span className="stacked-score">
              <span className="live-score">{scoreLabel(live)}</span>
              <span className="lineage-score">{scoreLabel(lineage)}</span>
            </span>
          )}
        </span>
        <span className="chev" aria-hidden="true">
          {open ? '–' : '+'}
        </span>
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
      <div className="drop-actions">
        <a className="btn primary" href={app.openUrl} target="_blank" rel="noreferrer">
          Open
        </a>
        <a className="repo-link" href={app.repoUrl} target="_blank" rel="noreferrer">
          {app.repo}
        </a>
        <span className="tag">{app.category}</span>
      </div>

      <dl className="pulse">
        <div>
          <dt>Lines of code</dt>
          <dd>{app.lines ? `~${formatCount(app.lines)}` : 'Not detected'}</dd>
        </div>
        <div>
          <dt>Repo size</dt>
          <dd>{formatSize(app.sizeKb)}</dd>
        </div>
        <div>
          <dt>Last commit</dt>
          <dd>{formatDate(app.updatedAt)}</dd>
        </div>
        <div>
          <dt>Commits per week</dt>
          <dd>{app.updatesPerWeek ? app.updatesPerWeek.toFixed(1) : '0'}</dd>
        </div>
      </dl>
      <p className="caption">
        From GitHub · {freshnessLabel(app.updatedAt)} · weekly average over the
        last 3 weeks · lines estimated from language bytes
      </p>

      {app.why ? (
        <section className="drop-section">
          <h2>Why it is useful</h2>
          <p className="prose">{app.why}</p>
        </section>
      ) : null}

      {app.bestFor.length > 0 ? (
        <section className="drop-section">
          <h2>Who gets the most out of it</h2>
          <ul className="best-for">
            {app.bestFor.map((who) => (
              <li key={who}>{who}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {app.features.length > 0 ? (
        <section className="drop-section">
          <h2>Worth calling out</h2>
          <dl className="features">
            {app.features.map((feature) => (
              <div key={feature.name}>
                <dt>{feature.name}</dt>
                <dd>{feature.note}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {app.screenshots.length > 0 ? (
        <section className="drop-section">
          <h2>Screenshots</h2>
          <div className="shots">
            {app.screenshots.map((shot) => (
              <figure className="shot" key={shot.src}>
                <img src={shot.src} alt={shot.alt} loading="lazy" />
                {shot.caption ? <figcaption>{shot.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="drop-section">
        <h2>
          {viewingLive
            ? 'Live build'
            : `Retired v${versionNumber(app, viewing.hash)}`}
        </h2>
        <p className="version-line">
          <code>{viewing.hash}</code>
          <span>{viewing.note}</span>
          <span className="muted">{formatDate(viewing.shipped)}</span>
        </p>
        <p className="score-line">
          {viewingReviews.length === 0
            ? 'No reviews on this build yet.'
            : `${scoreLabel(viewingReviews)} from ${viewingReviews.length} ${
                viewingReviews.length === 1 ? 'review' : 'reviews'
              }`}
        </p>
        {viewingLineage.length > 0 ? (
          <p className="lineage">
            Lineage {scoreLabel(viewingLineage)} from {viewingLineage.length} ·{' '}
            {starTotal(viewingLineage)} stars in total
          </p>
        ) : null}
      </section>

      {justWiped ? (
        <p className="notice">
          New fingerprint. {app.name} starts over on the board — older versions
          kept their stars.
        </p>
      ) : null}

      {app.versions.length > 1 ? (
        <section className="drop-section">
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
                  <tr key={version.hash} className={isViewing ? 'viewing' : undefined}>
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
                      {version.note}
                      <span className="muted"> · {formatDate(version.shipped)}</span>
                    </td>
                    <td>
                      {own.length === 0 ? (
                        <span className="unrated">New</span>
                      ) : (
                        <span className="stacked-score">
                          <span className="live-score">{scoreLabel(own)}</span>
                          <span className="lineage-score">{scoreLabel(through)}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      ) : null}

      {viewingReviews.length > 0 ? (
        <section className="drop-section">
          <h2>{viewingLive ? 'Reviews' : 'Reviews on this build'}</h2>
          <ul className="reviews">
            {viewingReviews.map((review, index) => (
              <li key={`${review.author}-${index}`}>
                <p className="review-meta">
                  <strong>{review.author}</strong>
                  <span className="muted">{review.rating} / 5</span>
                  <span className="muted when">{review.date}</span>
                </p>
                <p>{review.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="drop-section">
        <h2>Leave a review</h2>
        {viewingLive ? (
          <p className="caption">
            Posts to <code>{live.hash}</code>. A later commit keeps it in history
            and clears it from the board.
          </p>
        ) : (
          <p className="notice quiet">
            This build is closed. Go back to the live commit to review what
            people are using now.
          </p>
        )}
        <div className="rating-picks">
          {[5, 4, 3, 2, 1].map((value) => (
            <button
              key={value}
              type="button"
              className={rating === value ? 'tag pick on' : 'tag pick'}
              disabled={!viewingLive}
              onClick={() => onRating(value)}
            >
              {value}
            </button>
          ))}
          <span className="caption">out of 5</span>
        </div>
        <input
          className="review-input"
          value={draft}
          disabled={!viewingLive}
          placeholder={
            viewingLive
              ? 'What happened when you used this exact build?'
              : 'Reviews only post to the live commit'
          }
          onChange={(event) => onDraft(event.target.value)}
        />
        <div className="drop-actions">
          <button
            type="button"
            className="btn primary"
            onClick={onReview}
            disabled={!viewingLive || !draft.trim()}
          >
            Post review
          </button>
          {viewingLive ? (
            <button type="button" className="btn ghost" onClick={onShip}>
              Ship a change
            </button>
          ) : (
            <button
              type="button"
              className="btn ghost"
              onClick={() => onSelectHash(live.hash)}
            >
              Back to live
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

