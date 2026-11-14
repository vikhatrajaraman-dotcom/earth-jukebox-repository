import { useState } from "react";
import Globe from "react-globe.gl";
import "./App.css";

const locations = [
  { name: "Gurugram, India", lat: 28.4595, lng: 77.0266 },
  { name: "Ariquemes, Brazil", lat: -9.913, lng: -63.0408 },
  { name: "London Gateway, UK", lat: 51.505, lng: 0.45 },
  { name: "Lake Chad, Africa", lat: 13.1167, lng: 13.85 },
  { name: "Mandurah, Australia", lat: -32.5361, lng: 115.7424 },
  { name: "Lake Mead, USA", lat: 36.1350, lng: -114.7350 },
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <main className="app">
      <header>
        <h1>EARTH INFORMATION JUKEBOX</h1>
        <p>Explore our changing planet through sound and satellite data</p>
      </header>

      <section className="globe-container">
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="#050816"
          pointsData={locations}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "#ffe600"}
          pointAltitude={0.025}
          pointRadius={0.65}
          pointsMerge={false}
          onPointClick={(point: any) => setSelected(point)}
          pointLabel={(point: any) => point.name}
          width={window.innerWidth}
          height={window.innerHeight - 140}
          atmosphereColor="#38bdf8"
          atmosphereAltitude={0.18}
        />
      </section>

      {selected && (
        <div className="location-card">
          <button onClick={() => setSelected(null)}>×</button>
          <h2>{selected.name}</h2>
          <p>Latitude: {selected.lat}</p>
          <p>Longitude: {selected.lng}</p>
          <p>Satellite exploration coming soon.</p>
        </div>
      )}
    </main>
  );
}