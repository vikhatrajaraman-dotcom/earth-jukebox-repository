import { useState } from 'react'
import type { Location, Mode, Year } from '../data/locations'
import { MODES, YEARS } from '../data/locations'

type Props = {
  location: Location
  onBack: () => void
}

export default function LocationViewer({ location, onBack }: Props) {
  const [year, setYear] = useState<Year>(2024)
  const [mode, setMode] = useState<Mode>('aerosol')
  const imagePath = location.images[year]?.[mode]
  const modeLabel = MODES.find((item) => item.id === mode)?.label ?? mode

  return (
    <main className="detail-screen">
      <header className="detail-header">
        <button className="back-button" onClick={onBack}>← Back to globe</button>
        <div className="detail-heading">
          <p className="eyebrow">EARTH OBSERVATION / SELECTED SITE</p>
          <h1>{location.name}</h1>
          <p className="muted">{location.region} · {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°</p>
        </div>
        <div className="detail-status">SITE VIEW</div>
      </header>

      <section className="viewer-layout">
        <div className="image-stage">
          {imagePath ? (
            <img className="satellite-image" src={imagePath} alt={`${location.name} satellite image, ${year}, ${modeLabel}`} />
          ) : (
            <div className="image-empty-state">
              <div className="empty-icon">⌁</div>
              <p className="eyebrow">IMAGE NOT ADDED YET</p>
              <h2>{location.name} · {year}</h2>
              <p>Add your team's selected satellite image for <strong>{year}</strong> in the <strong>{modeLabel}</strong> mode.</p>
              <code>public/images/{location.id}/{year}-{mode}.jpg</code>
            </div>
          )}
          <div className="image-caption">
            <span>{location.name}</span>
            <span>{year} / {modeLabel.toUpperCase()}</span>
          </div>
        </div>

        <aside className="controls-panel">
          <div>
            <p className="eyebrow">01 / ENVIRONMENTAL LAYER</p>
            <h2>Choose a mode</h2>
            <div className="mode-list">
              {MODES.map((item) => (
                <button
                  key={item.id}
                  className={`mode-button ${mode === item.id ? 'active' : ''}`}
                  onClick={() => setMode(item.id)}
                >
                  <span>{item.label}</span>
                  <span className="mode-arrow">{mode === item.id ? '●' : '○'}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">02 / TIME PERIOD</p>
            <h2>Travel through time</h2>
            <div className="year-list">
              {YEARS.map((item) => (
                <button
                  key={item}
                  className={`year-button ${year === item ? 'active' : ''}`}
                  onClick={() => setYear(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="location-summary">
            <p className="eyebrow">ABOUT THIS PLACE</p>
            <p>{location.overview}</p>
          </div>
        </aside>
      </section>

      <footer className="detail-footer">
        <span>NASA SPACE APPS · EARTH JUKEBOX</span>
        <span>Imagery and measurement sources should be credited here</span>
      </footer>
    </main>
  )
}
