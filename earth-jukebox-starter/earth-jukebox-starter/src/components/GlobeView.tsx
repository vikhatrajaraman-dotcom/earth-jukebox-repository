import { useEffect, useState } from 'react'
import Globe from 'react-globe.gl'
import type { Location } from '../data/locations'

type Props = {
  locations: Location[]
  selectedId: string | null
  onHover: (location: Location | null) => void
  onSelect: (location: Location) => void
}

export default function GlobeView({ locations, selectedId, onHover, onSelect }: Props) {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const resize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div className="globe-canvas">
      <Globe
        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="/earth_texture.png"
        showAtmosphere
        atmosphereColor="#5795dc"
        atmosphereAltitude={0.16}
        pointsData={locations}
        pointLat="lat"
        pointLng="lng"
        pointColor={(point: object) => (point as Location).id === selectedId ? '#ffffff' : '#ffd447'}
        pointRadius={0.42}
        pointAltitude={0.025}
        pointLabel="name"
        onPointHover={(point: object | null) => onHover(point as Location | null)}
        onPointClick={(point: object) => onSelect(point as Location)}
        ringsData={locations}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => '#ffd447'}
        ringMaxRadius={2.1}
        ringPropagationSpeed={1.2}
        ringRepeatPeriod={1500}
      />
    </div>
  )
}
