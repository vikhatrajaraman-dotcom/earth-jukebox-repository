import type { Location } from '../data/locations'

type Props = {
  location: Location | null
}

export default function HoverPreview({ location }: Props) {
  if (!location) return null

  return (
    <aside className="hover-preview" aria-live="polite">
      <div className="preview-image-wrap">
        <img
          src={location.previewImage}
          alt={`Satellite preview of ${location.name}`}
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <span className="preview-image-fallback">SATELLITE PREVIEW</span>
      </div>
      <div className="preview-copy">
        <p className="eyebrow">LOCATION DETECTED</p>
        <h2>{location.name}</h2>
        <p className="muted">{location.region}</p>
        <p className="preview-overview">{location.overview}</p>
        <p className="preview-hint">CLICK THE GLOWING DOT TO EXPLORE ↗</p>
      </div>
    </aside>
  )
}
