
import { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import Starfield from "./Starfield";
import "./App.css";

// Automatically finds PNG images inside src/images
const imageFiles = import.meta.glob("./images/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type YearData = {
  co2: number | null;
  airTemp: number | null;
  pollution: number | null;
  ozone: number | null;
  change: string;
};

type Location = {
  name: string;
  lat: number;
  lng: number;
  imagePrefix: string;
  data: Record<number, YearData>;
};

const locations: Location[] = [
  {
    name: "Gurugram, India",
    lat: 28.4595,
    lng: 77.0266,
    imagePrefix: "gurugram",
    data: {
      2001: { co2: null, airTemp: 26.3, pollution: 60.8, ozone: 277.6, change: "Historical overview for Gurugram in 2001 will be added here." },
      2008: { co2: null, airTemp: 25.2, pollution: 68.4, ozone: 271.2, change: "Historical overview for Gurugram in 2008 will be added here." },
      2015: { co2: 400.4, airTemp: 25.4, pollution: 61.5, ozone: 287.6, change: "Historical overview for Gurugram in 2015 will be added here." },
      2020: { co2: 413.8, airTemp: 24.9, pollution: 60.5, ozone: 280.4, change: "Historical overview for Gurugram in 2020 will be added here." },
      2024: { co2: null, airTemp: 25.6, pollution: 62.7, ozone: 284.5, change: "Historical overview for Gurugram in 2024 will be added here." },
    },
  },
  {
    name: "Ariquemes, Brazil",
    lat: -9.913,
    lng: -63.0408,
    imagePrefix: "brazil",
    data: {
      2001: { co2: null, airTemp: 25.3, pollution: 14.3, ozone: 257.3, change: "Historical overview for Ariquemes in 2001 will be added here." },
      2008: { co2: null, airTemp: 26.3, pollution: 16.0, ozone: 258.4, change: "Historical overview for Ariquemes in 2008 will be added here." },
      2015: { co2: 399.4, airTemp: 28.0, pollution: 18.5, ozone: 257.8, change: "Historical overview for Ariquemes in 2015 will be added here." },
      2020: { co2: 412.3, airTemp: 26.7, pollution: 22.8, ozone: 258.6, change: "Historical overview for Ariquemes in 2020 will be added here." },
      2024: { co2: null, airTemp: 29.0, pollution: 32.1, ozone: 257.3, change: "Historical overview for Ariquemes in 2024 will be added here." },
    },
  },
  {
    name: "London Gateway, UK",
    lat: 51.505,
    lng: 0.45,
    imagePrefix: "uk",
    data: {
      2001: { co2: null, airTemp: 9.7, pollution: 10.3, ozone: 332.8, change: "Historical overview for London in 2001 will be added here." },
      2008: { co2: null, airTemp: 10.1, pollution: 10.9, ozone: 319.5, change: "Historical overview for London in 2008 will be added here." },
      2015: { co2: 399.8, airTemp: 10.3, pollution: 10.5, ozone: 332.3, change: "Historical overview for London in 2015 will be added here." },
      2020: { co2: 412.7, airTemp: 11.0, pollution: 10.6, ozone: 320.2, change: "Historical overview for London in 2020 will be added here." },
      2024: { co2: null, airTemp: 11.1, pollution: 10.9, ozone: 341.1, change: "Historical overview for London in 2024 will be added here." },
    },
  },
  {
    name: "Baga, Lake Chad",
    lat: 13.1167,
    lng: 13.85,
    imagePrefix: "nigeria",
    data: {
      2000: { co2: null, airTemp: 29.3, pollution: 151.0, ozone: 265.0, change: "Historical overview for Baga in 2000 will be added here." },
      2008: { co2: null, airTemp: 28.9, pollution: 143.5, ozone: 262.1, change: "Historical overview for Baga in 2008 will be added here." },
      2015: { co2: 399.9, airTemp: 28.7, pollution: 149.5, ozone: 267.4, change: "Historical overview for Baga in 2015 will be added here." },
      2020: { co2: 412.8, airTemp: 28.6, pollution: 128.3, ozone: 265.0, change: "Historical overview for Baga in 2020 will be added here." },
      2024: { co2: null, airTemp: 28.3, pollution: 124.6, ozone: 265.9, change: "Historical overview for Baga in 2024 will be added here." },
    },
  },
  {
    name: "Mandurah, Australia",
    lat: -32.5361,
    lng: 115.7424,
    imagePrefix: "australia",
    data: {
      2001: { co2: null, airTemp: 18.5, pollution: 6.0, ozone: 291.3, change: "Historical overview for Mandurah in 2001 will be added here." },
      2008: { co2: null, airTemp: 18.7, pollution: 6.1, ozone: 283.6, change: "Historical overview for Mandurah in 2008 will be added here." },
      2015: { co2: 397.8, airTemp: 19.0, pollution: 7.7, ozone: 283.3, change: "Historical overview for Mandurah in 2015 will be added here." },
      2020: { co2: 410.5, airTemp: 19.1, pollution: 7.0, ozone: 284.9, change: "Historical overview for Mandurah in 2020 will be added here." },
      2024: { co2: null, airTemp: 19.8, pollution: 7.1, ozone: 285.8, change: "Historical overview for Mandurah in 2024 will be added here." },
    },
  },
  {
    name: "Lake Mead, USA",
    lat: 36.135,
    lng: -114.735,
    imagePrefix: "us",
    data: {
      2000: { co2: null, airTemp: 19.8, pollution: 8.7, ozone: 297.3, change: "Historical overview for Lake Mead in 2000 will be added here." },
      2008: { co2: null, airTemp: 19.2, pollution: 9.5, ozone: 296.8, change: "Historical overview for Lake Mead in 2008 will be added here." },
      2015: { co2: 400.3, airTemp: 20.2, pollution: 9.9, ozone: 303.3, change: "Historical overview for Lake Mead in 2015 will be added here." },
      2020: { co2: 413.3, airTemp: 20.4, pollution: 12.0, ozone: 297.1, change: "Historical overview for Lake Mead in 2020 will be added here." },
      2024: { co2: null, airTemp: 21.2, pollution: 9.0, ozone: 313.9, change: "Historical overview for Lake Mead in 2024 will be added here." },
    },
  },
];

function getImage(location: Location, year: number) {
  return imageFiles[`./images/${location.imagePrefix}-${year}.png`];
}

export default function App() {
  const [selected, setSelected] = useState<Location | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2001);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const openLocation = (location: Location) => {
    const years = Object.keys(location.data).map(Number);
    setSelectedYear(Math.min(...years));
    setSelected(location);
  };

  const availableYears = selected
    ? Object.keys(selected.data).map(Number).sort((a, b) => a - b)
    : [];

  const yearData = selected ? selected.data[selectedYear] : null;
  const currentImage = selected ? getImage(selected, selectedYear) : undefined;

  const stats = yearData
    ? [
        { label: "CO₂ LEVEL", value: yearData.co2, unit: "ppm" },
        { label: "AIR TEMPERATURE", value: yearData.airTemp, unit: "°C" },
        { label: "AIR POLLUTION", value: yearData.pollution, unit: "µg/m³" },
        { label: "OZONE LEVEL", value: yearData.ozone, unit: "DU" },
      ].filter((stat) => stat.value !== null)
    : [];

  return (
    <main className="app">
      <Starfield />

      {!selected ? (
        <>
          <header className="app-header">
            <h1>EARTH INFORMATION JUKEBOX</h1>
            <p>Explore our changing planet through satellite data and sound</p>
          </header>

          <div className="globe-area">
            <Globe
              width={dimensions.width}
              height={dimensions.height - 110}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              backgroundColor="rgba(0,0,0,0)"
              rendererConfig={{ alpha: true, antialias: true }}
              pointsData={locations}
              pointLat="lat"
              pointLng="lng"
              pointColor={() => "#ffe600"}
              pointAltitude={0.025}
              pointRadius={0.45}
              ringsData={locations}
              ringLat="lat"
              ringLng="lng"
              ringColor={() => (t: number) =>
                `rgba(255, 230, 0, ${1 - t})`}
              ringMaxRadius={4}
              ringPropagationSpeed={2}
              ringRepeatPeriod={1200}
              onPointClick={(point: object) =>
                openLocation(point as Location)
              }
              pointLabel={(point: object) => {
                const location = point as Location;
                const previewImage = getImage(
                  location,
                  Number(Object.keys(location.data)[0])
                );

                return `
                  <div style="
                    width:230px;
                    padding:12px;
                    background:#17221f;
                    border:1px solid #829b7a;
                    border-radius:9px;
                    color:#eeeae0;
                    font-family:'DM Sans',sans-serif;
                    box-shadow:0 8px 25px rgba(0,0,0,0.4);
                  ">
                    ${
                      previewImage
                        ? `<img src="${previewImage}" style="width:100%;height:110px;object-fit:cover;border-radius:5px;margin-bottom:9px;" />`
                        : ""
                    }
                    <div style="font-family:'Playfair Display',serif;font-size:17px;margin-bottom:5px;">
                      ${location.name}
                    </div>
                    <div style="font-size:11px;color:#c0c4b9;line-height:1.6;">
                      Latitude: ${location.lat}<br/>
                      Longitude: ${location.lng}
                    </div>
                    <div style="font-size:10px;color:#a8bd9c;margin-top:8px;letter-spacing:1px;">
                      CLICK TO EXPLORE
                    </div>
                  </div>
                `;
              }}
              atmosphereColor="#38bdf8"
              atmosphereAltitude={0.18}
            />
          </div>
        </>
      ) : (
        <section className="exploration-screen">
          <button
            className="back-button"
            onClick={() => setSelected(null)}
          >
            ← BACK TO GLOBE
          </button>

          <header className="location-heading">
            <p>EARTH INFORMATION JUKEBOX / LOCATION EXPLORER</p>
            <h1>{selected.name}</h1>
            <span>
              LAT {selected.lat}° &nbsp; | &nbsp; LNG {selected.lng}°
            </span>
          </header>

          <div className="exploration-layout">
            <section className="image-section">
              <div className="satellite-image-container">
                {currentImage ? (
                  <img
                    key={`${selected.imagePrefix}-${selectedYear}`}
                    src={currentImage}
                    alt={`${selected.name} in ${selectedYear}`}
                    className="satellite-image"
                  />
                ) : (
                  <div className="satellite-image-placeholder">
                    <span>HISTORICAL SATELLITE IMAGE</span>
                    <p>
                      Add {selected.imagePrefix}-{selectedYear}.png
                      to your src/images folder
                    </p>
                  </div>
                )}

                <div className="image-overlay">
                  <span>SATELLITE VIEW</span>
                  <h2>{selectedYear}</h2>
                </div>
              </div>

              <div className="year-selector">
                <div className="year-label">
                  <span>HISTORICAL YEAR</span>
                  <strong>{selectedYear}</strong>
                </div>

                <input
                  type="range"
                  min="0"
                  max={availableYears.length - 1}
                  step="1"
                  value={availableYears.indexOf(selectedYear)}
                  onChange={(event) =>
                    setSelectedYear(
                      availableYears[Number(event.target.value)]
                    )
                  }
                />

                <div className="year-options">
                  {availableYears.map((year) => (
                    <span key={year}>{year}</span>
                  ))}
                </div>
              </div>
            </section>

            <aside className="information-panel">
              <section className="info-card">
                <h3>ENVIRONMENTAL MEASUREMENTS</h3>
                <p className="section-description">
                  Recorded measurements for {selectedYear}
                </p>

                <div className="stats-grid">
                  {stats.map((stat) => (
                    <div className="stat-box" key={stat.label}>
                      <span>{stat.label}</span>
                      <strong>
                        {stat.value} {stat.unit}
                      </strong>
                    </div>
                  ))}
                </div>

                {stats.length === 0 && (
                  <p>No measurements are available for this year.</p>
                )}
              </section>

              <section className="info-card change-card">
                <h3>CHANGE OVER TIME</h3>
                <p className="section-description">
                  Historical context · {selectedYear}
                </p>
                <p>{yearData?.change}</p>
              </section>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}