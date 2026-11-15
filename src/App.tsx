
import { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import Starfield from "./Starfield";
import "./App.css";
import FloatingMenu from "./FloatingMenu";
import AudioVisualizer, {
  type VisualizerTrack
} from "./AudioVisualizer";
type YearData = {
  co2: number | null;
  airTemp: number | null;
  pollution: number | null;
  ozone: number | null;
  change: string;
  title?: string;
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
      2001: {
        co2: null,
        airTemp: 26.3,
        pollution: 60.8,
        ozone: 277.6,
        change: "This marks the beginning of climate monitoring in India. Rapid urbanisation, industrial growth and increasing vehicle use were creating environmental pressures. These developments raised concerns about air quality and the long-term effects of human activity on the climate."
      },
      2008: {
        co2: null,
        airTemp: 25.2,
        pollution: 68.4,
        ozone: 271.2,
        change: "India introduced its National Action Plan on Climate Change, demonstrating a growing commitment to renewable energy, energy efficiency and environmental protection. Although temperatures decreased in the dataset, increasing air pollution suggested that urbanisation and industrial development continued to place pressure on the environment."
      },
      2015: {
        co2: 400.4,
        airTemp: 25.4,
        pollution: 61.5,
        ozone: 287.6,
        change: "India strengthened its international climate commitments through the Paris Agreement. The country began placing greater emphasis on solar power and renewable energy to reduce its dependence on fossil fuels. However, its growing population, transport systems and industrial development continued to create significant pollution challenges."
      },
      2020: {
        co2: 413.8,
        airTemp: 24.9,
        pollution: 60.5,
        ozone: 280.4,
        change: "India continued expanding renewable energy projects, particularly solar power, to reduce its dependence on fossil fuels. However, rapid urban growth and industrialisation continued to contribute to air pollution. This highlights the difficulty of balancing economic development with environmental sustainability."
      },
      2024: {
        co2: null,
        airTemp: 25.6,
        pollution: 62.7,
        ozone: 284.5,
        change: "India continued investing in renewable energy and strengthening its climate commitments. However, increasing urbanisation, industrial activity and vehicle emissions remained major environmental challenges. This suggests that although climate policies are developing, reducing pollution while maintaining economic growth remains difficult."
      }
    }
  },
  {
    name: "Ariquemes, Brazil",
    lat: -9.913,
    lng: -63.0408,
    imagePrefix: "brazil",
    data: {
      2001: {
        co2: null,
        airTemp: 25.3,
        pollution: 14.3,
        ozone: 257.3,
        change: "Brazil was already facing environmental challenges due to deforestation in the Amazon rainforest. The removal of trees reduces the amount of carbon dioxide absorbed from the atmosphere and disrupts natural ecosystems, making climate change an increasing concern."
      },
      2008: {
        co2: null,
        airTemp: 26.3,
        pollution: 16.0,
        ozone: 258.4,
        change: "Brazil faced growing international pressure to protect the Amazon rainforest. Deforestation for agriculture, cattle farming and logging threatened biodiversity and increased carbon emissions. This demonstrated the difficulty of balancing economic development with environmental protection."
      },
      2015: {
        co2: 399.4,
        airTemp: 28.0,
        pollution: 18.5,
        ozone: 257.8,
        change: "Brazil faced serious concerns about deforestation and the destruction of the Amazon rainforest. The loss of forest cover reduced natural carbon absorption and threatened biodiversity. These environmental pressures demonstrated how land-use changes can contribute to global climate problems."
      },
      2020: {
        co2: 412.3,
        airTemp: 26.7,
        pollution: 22.8,
        ozone: 258.6,
        change: "Brazil experienced increasing international concern about deforestation and fires in the Amazon. The destruction of forests releases stored carbon and reduces the rainforest's ability to absorb carbon dioxide. This makes protecting the Amazon essential for both Brazil and global climate stability."
      },
      2024: {
        co2: null,
        airTemp: 29.0,
        pollution: 32.1,
        ozone: 257.3,
        change: "Brazil continued facing the challenge of protecting the Amazon while supporting agriculture and economic development. Deforestation, forest fires and changing weather patterns threatened ecosystems and contributed to environmental instability. Greater forest protection is therefore essential for reducing carbon emissions and preserving biodiversity."
      }
    }
  },
  {
    name: "London Gateway, UK",
    lat: 51.505,
    lng: 0.45,
    imagePrefix: "uk",
    data: {
      2001: {
        co2: null,
        airTemp: 9.7,
        pollution: 10.3,
        ozone: 332.8,
        title: "BEFORE THE TRANSFORMATION",
        change: "The image provides a starting point before the development of London Gateway. The former Shell Haven refinery had closed in 1999, leaving a large industrial site beside the Thames. Its existing industrial layout provides a clear baseline for understanding the scale of the redevelopment that followed."
      },
      2008: {
        co2: null,
        airTemp: 10.1,
        pollution: 10.9,
        ozone: 319.5,
        title: "A SITE AWAITING REDEVELOPMENT",
        change: "The landscape still reflects its industrial past, but plans for London Gateway have now been approved. Compared with 2001, the site's future is beginning to shift from refinery operations towards a major container port, although the large-scale port infrastructure seen in later images has not yet taken shape. Since 2001, air temperature has increased by +0.4°C and air pollution by +0.6 µg/m³, while ozone has decreased by −13.3 DU."
      },
      2015: {
        co2: 399.8,
        airTemp: 10.3,
        pollution: 10.5,
        ozone: 332.3,
        title: "THE PORT TAKES SHAPE",
        change: "The satellite image shows a major transformation of the former industrial site. Following construction and dredging, London Gateway opened in 2013. New container-terminal infrastructure and an altered waterfront mark the arrival of a large deep-water port. Compared with 2008, air temperature has increased by +0.2°C, air pollution has decreased by −0.4 µg/m³ and ozone has increased by +12.8 DU. The recorded CO₂ level is also available from this point in the timeline."
      },
      2020: {
        co2: 412.7,
        airTemp: 11.0,
        pollution: 10.6,
        ozone: 320.2,
        title: "AN ESTABLISHED LOGISTICS HUB",
        change: "The port has become an established logistics hub on the Thames, with extensive container-handling areas and supporting infrastructure. Compared with the earlier images, the developed port layout is now a defining feature of the landscape. Since 2015, air temperature has increased by +0.7°C, air pollution by +0.1 µg/m³ and ozone has decreased by −12.1 DU. The recorded CO₂ level has increased by +12.9 ppm."
      },
      2024: {
        co2: null,
        airTemp: 11.1,
        pollution: 10.9,
        ozone: 341.1,
        title: "FURTHER EXPANSION",
        change: "The latest image shows the developed port landscape, which can be compared directly with the former industrial site shown at the beginning of the timeline. London Gateway's fourth berth opened in November 2024, featuring all-electric port equipment and marking another stage in the port's expansion. Compared with 2020, air temperature has increased by +0.1°C, air pollution by +0.3 µg/m³ and ozone by +20.9 DU. A CO₂ reading is not available for this year in the dataset."
      }
    }
  },
  {
    name: "Baga, Lake Chad",
    lat: 13.1167,
    lng: 13.85,
    imagePrefix: "nigeria",
    data: {
      2000: {
        co2: null,
        airTemp: 29.3,
        pollution: 151.0,
        ozone: 265.0,
        change: "Nigeria was experiencing environmental difficulties around Lake Chad. Rising temperatures, changing rainfall patterns and increasing demand for water were contributing to the lake's decline. This threatened farming, fishing and the livelihoods of surrounding communities."
      },
      2008: {
        co2: null,
        airTemp: 28.9,
        pollution: 143.5,
        ozone: 262.1,
        change: "Nigeria continued to experience the effects of environmental degradation around Lake Chad. Changes in rainfall, prolonged dry periods and human demand for water placed pressure on local communities. These problems highlighted the relationship between climate change, poverty and access to natural resources."
      },
      2015: {
        co2: 399.9,
        airTemp: 28.7,
        pollution: 149.5,
        ozone: 267.4,
        change: "Nigeria faced increasing concerns about desertification and the shrinking of Lake Chad. Climate pressures, combined with population growth and unsustainable water use, threatened agriculture and food security. This showed how environmental changes can have serious social and economic consequences."
      },
      2020: {
        co2: 412.8,
        airTemp: 28.6,
        pollution: 128.3,
        ozone: 265.0,
        change: "Nigeria continued to experience environmental difficulties linked to desertification and changing rainfall patterns. The shrinking of Lake Chad placed pressure on farming, fishing and access to clean water. These challenges demonstrated how climate change can worsen existing economic and social inequalities."
      },
      2024: {
        co2: null,
        airTemp: 28.3,
        pollution: 124.6,
        ozone: 265.9,
        change: "Nigeria continued facing serious environmental challenges, particularly desertification, water shortages and pressure on communities surrounding Lake Chad. These issues threaten food production and livelihoods, demonstrating the need for better water management, sustainable agriculture and climate adaptation strategies."
      }
    }
  },
  {
    name: "Mandurah, Australia",
    lat: -32.5361,
    lng: 115.7424,
    imagePrefix: "australia",
    data: {
      2001: {
        co2: null,
        airTemp: 18.5,
        pollution: 6.0,
        ozone: 291.3,
        change: "Australia was becoming increasingly aware of the risks associated with drought, bushfires and water shortages. Its naturally dry climate made it particularly vulnerable to changes in rainfall and rising global temperatures."
      },
      2008: {
        co2: null,
        airTemp: 18.7,
        pollution: 6.1,
        ozone: 283.6,
        change: "Australia was increasingly concerned about prolonged droughts and water shortages. These conditions affected agriculture and natural ecosystems, demonstrating how vulnerable the country was to changes in weather patterns and increasing pressure on water supplies."
      },
      2015: {
        co2: 397.8,
        airTemp: 19.0,
        pollution: 7.7,
        ozone: 283.3,
        change: "Australia continued to experience concerns about drought, extreme temperatures and water availability. Its dependence on agriculture and natural resources made it particularly vulnerable to climate change, encouraging greater attention towards renewable energy and environmental sustainability."
      },
      2020: {
        co2: 410.5,
        airTemp: 19.1,
        pollution: 7.0,
        ozone: 284.9,
        change: "Australia experienced devastating bushfires during 2019–2020. Extreme heat, dry conditions and vegetation loss contributed to particularly dangerous fire conditions. These events increased public awareness of the risks associated with climate change and the importance of protecting natural ecosystems."
      },
      2024: {
        co2: null,
        airTemp: 19.8,
        pollution: 7.1,
        ozone: 285.8,
        change: "Australia continued experiencing the effects of increasing temperatures and changing weather patterns. The country faced ongoing challenges involving bushfires, drought and the protection of biodiversity. Investment in renewable energy and improved environmental management became increasingly important for building long-term climate resilience."
      }
    }
  },
  {
    name: "Lake Mead, USA",
    lat: 36.135,
    lng: -114.735,
    imagePrefix: "us",
    data: {
      2000: {
        co2: null,
        airTemp: 19.8,
        pollution: 8.7,
        ozone: 297.3,
        change: "The US was increasingly recognising climate change as a major environmental issue. High levels of industrial activity, transport and fossil fuel consumption contributed to greenhouse gas emissions, while drought and water shortages were concerns around Lake Mead."
      },
      2008: {
        co2: null,
        airTemp: 19.2,
        pollution: 9.5,
        ozone: 296.8,
        change: "The US was experiencing growing concern about the effects of climate change, particularly droughts and water scarcity in western states. Lake Mead's water resources were under pressure, highlighting the importance of water conservation and sustainable resource management."
      },
      2015: {
        co2: 400.3,
        airTemp: 20.2,
        pollution: 9.9,
        ozone: 303.3,
        change: "The US played an important role in establishing the Paris Agreement, showing increased international recognition of the need to reduce greenhouse gas emissions. However, continued dependence on fossil fuels and growing energy consumption remained major obstacles to reducing environmental damage."
      },
      2020: {
        co2: 413.3,
        airTemp: 20.4,
        pollution: 12.0,
        ozone: 297.1,
        change: "The US experienced growing concerns about drought and declining water levels around Lake Mead. Increasing temperatures and prolonged dry conditions placed additional pressure on water supplies. This highlighted the importance of sustainable water management, particularly in regions that depend on limited water resources."
      },
      2024: {
        co2: null,
        airTemp: 21.2,
        pollution: 9.0,
        ozone: 313.9,
        change: "The US continued investing in renewable energy and climate adaptation, particularly in areas affected by drought and extreme weather. Lake Mead remained an important example of how rising temperatures and water shortages can threaten communities, agriculture and energy supplies."
      }
    }
  }
];

function getImage(location: Location, year: number) {
  return `https://raw.githubusercontent.com/vikhatrajaraman-dotcom/earth-jukebox-repository/main/src/images/${location.imagePrefix}-${year}.png`;
}

type EnvironmentalMap = "Air Quality" | "Air Temperature" | "Ozone Levels";

const MAP_IMAGES: Record<EnvironmentalMap, string> = {
  "Air Quality":
    "https://raw.githubusercontent.com/vikhatrajaraman-dotcom/earth-jukebox-repository/main/src/images/PMHEATMAP.png",
  "Air Temperature":
    "https://raw.githubusercontent.com/vikhatrajaraman-dotcom/earth-jukebox-repository/main/src/images/AIRTEMPMAP.png",
  "Ozone Levels":
    "https://raw.githubusercontent.com/vikhatrajaraman-dotcom/earth-jukebox-repository/main/src/images/OZONEMAP.png"
};

const AUDIO_TRACKS = {
  birds:
    "https://raw.githubusercontent.com/vikhatrajaraman-dotcom/earth-jukebox-repository/main/src/images/track_1.wav",
  rain:
    "https://raw.githubusercontent.com/vikhatrajaraman-dotcom/earth-jukebox-repository/main/src/images/track_2.wav",
  thunder:
    "https://raw.githubusercontent.com/vikhatrajaraman-dotcom/earth-jukebox-repository/main/src/images/track_3.wav"
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getVolume(
  value: number,
  baseline: number,
  minChange: number,
  maxChange: number,
  inverse = false,
  baseVolume = 0.18
) {
  const range = maxChange - minChange || 1;
  let change = (value - baseline) / range;
  change = clamp(change, -1, 1);

  if (inverse) change *= -1;

  return clamp(baseVolume + change * 0.65, 0.01, 0.85);
}

/*
 * Converts a sampled map colour into a sound volume.
 * These are visual estimates from the map colours, not scientific
 * measurements extracted from the original dataset.
 */
function getMapVolume(
  map: EnvironmentalMap,
  red: number,
  green: number,
  blue: number
) {
  if (map === "Ozone Levels") {
    const stops = [
      { value: 5, rgb: [255, 255, 255] },
      { value: 20, rgb: [225, 221, 239] },
      { value: 40, rgb: [146, 105, 207] },
      { value: 60, rgb: [69, 29, 185] }
    ];

    let closest = stops[0];
    let closestDistance = Infinity;

    for (const stop of stops) {
      const distance =
        (red - stop.rgb[0]) ** 2 +
        (green - stop.rgb[1]) ** 2 +
        (blue - stop.rgb[2]) ** 2;

      if (distance < closestDistance) {
        closest = stop;
        closestDistance = distance;
      }
    }

    // Lower ozone reading = louder thunder.
    return clamp(
      0.85 - ((closest.value - 5) / 55) * 0.78,
      0.07,
      0.85
    );
  }

  if (map === "Air Temperature") {
    // Redder/warmer colours increase rain volume.
    const warmth = clamp((red - blue + 255) / 510, 0, 1);
    return 0.08 + warmth * 0.77;
  }

  // Air Quality: darker/redder polluted areas reduce bird volume.
  const brightness = (red + green + blue) / (3 * 255);
  const redness = red / 255;

  const pollutionIntensity = clamp(
    0.65 * redness + 0.35 * (1 - brightness),
    0,
    1
  );

  return clamp(0.85 - pollutionIntensity * 0.78, 0.07, 0.85);
}

function MapSoundExplorer({
  map,
  onVolumeChange,
  playing
}: {
  map: EnvironmentalMap;
  onVolumeChange: (volume: number) => void;
  playing: boolean;
}) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [sampleVolume, setSampleVolume] = useState(0.4);

  const [sampleMessage, setSampleMessage] = useState(
    "Move your pointer over the map to explore its sound."
  );

  const linkedTrack =
    map === "Air Quality"
      ? "BIRDS"
      : map === "Air Temperature"
        ? "RAIN"
        : "THUNDER";

  const waveformColor =
    map === "Air Quality"
      ? "#a8bd9c"
      : map === "Air Temperature"
        ? "#7fc4ff"
        : "#c4a7ff";

  useEffect(() => {
    setMapReady(false);
    setSampleVolume(0.4);
    setSampleMessage(
      "Move your pointer over the map to explore its sound."
    );
    onVolumeChange(0.4);
  }, [map, onVolumeChange]);

  const prepareCanvas = () => {
    const image = imageRef.current;
    const canvas = canvasRef.current;

    if (!image || !canvas || !image.naturalWidth) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext("2d", {
      willReadFrequently: true
    });

    if (!context) return;

    try {
      context.drawImage(image, 0, 0);
      context.getImageData(0, 0, 1, 1);
      setMapReady(true);
    } catch {
      setMapReady(false);
      setSampleMessage(
        "The map image cannot be sampled by this browser. Check that the image host allows cross-origin access."
      );
    }
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const image = imageRef.current;
    const canvas = canvasRef.current;

    if (!image || !canvas || !mapReady) return;

    const rect = image.getBoundingClientRect();

    const scale = Math.min(
      rect.width / image.naturalWidth,
      rect.height / image.naturalHeight
    );

    const drawnWidth = image.naturalWidth * scale;
    const drawnHeight = image.naturalHeight * scale;

    const offsetX = (rect.width - drawnWidth) / 2;
    const offsetY = (rect.height - drawnHeight) / 2;

    const localX = event.clientX - rect.left - offsetX;
    const localY = event.clientY - rect.top - offsetY;

    if (
      localX < 0 ||
      localY < 0 ||
      localX >= drawnWidth ||
      localY >= drawnHeight
    ) {
      return;
    }

    const pixelX = Math.floor(localX / scale);
    const pixelY = Math.floor(localY / scale);

    const context = canvas.getContext("2d", {
      willReadFrequently: true
    });

    if (!context) return;

    try {
      const pixel = context.getImageData(
        pixelX,
        pixelY,
        1,
        1
      ).data;

      const volume = getMapVolume(
        map,
        pixel[0],
        pixel[1],
        pixel[2]
      );

      setSampleVolume(volume);
      onVolumeChange(volume);

      setSampleMessage(
        `${linkedTrack} sound updated for this map area.`
      );
    } catch {
      setSampleMessage("Unable to read this map colour.");
    }
  };

  const handlePointerLeave = () => {
    const defaultVolume = 0.4;

    setSampleVolume(defaultVolume);
    onVolumeChange(defaultVolume);

    setSampleMessage(
      "Move your pointer over the map to explore its sound."
    );
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        width: "90vw",
        height: "80vh",
        maxWidth: "none",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        overflow: "hidden",
        border: "1px solid rgba(130, 155, 122, 0.35)",
        borderRadius: "8px",
        background: "#080e16",
        padding: "12px",
        boxSizing: "border-box"
      }}
    >
      {/* The image wrapper gives the waveform a fixed bottom-right position. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100% - 76px)",
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          ref={imageRef}
          src={MAP_IMAGES[map]}
          alt={`${map} environmental map`}
          crossOrigin="anonymous"
          onLoad={prepareCanvas}
          onError={() =>
            setSampleMessage("The map image could not be loaded.")
          }
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            cursor: "crosshair"
          }}
        />

        {/* One map-specific waveform, overlaid at the bottom-right. */}
        <div
          style={{
            position: "absolute",
            right: "18px",
            bottom: "18px",
            zIndex: 5,
            padding: "8px 12px",
            borderRadius: "8px",
            border: `1px solid ${waveformColor}66`,
            background: "rgba(5, 11, 18, 0.82)",
            backdropFilter: "blur(5px)",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "3px"
          }}
        >
          <span
            style={{
              color: waveformColor,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "1.5px"
            }}
          >
            {linkedTrack} SOUND
          </span>

          
        </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          color: "#eeeae0",
          fontFamily: "'DM Sans', sans-serif"
        }}
      >
        <div>
          <div
            style={{
              color: "#a8bd9c",
              fontSize: "11px",
              letterSpacing: "1.5px",
              marginBottom: "4px"
            }}
          >
            MAP SOUND EXPLORER · {linkedTrack}
          </div>

          <div style={{ fontSize: "13px" }}>
            {sampleMessage}
          </div>
        </div>

        <div
          style={{
            minWidth: "130px",
            textAlign: "right",
            fontSize: "13px",
            color: waveformColor
          }}
        >
          <strong>
            {Math.round(sampleVolume * 100)}% volume
          </strong>

          <div
            style={{
              height: "6px",
              width: "130px",
              marginTop: "6px",
              borderRadius: "8px",
              background: "#29313b",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${sampleVolume * 100}%`,
                borderRadius: "8px",
                background: waveformColor,
                transition: "width 100ms ease"
              }}
            />
          </div>
        </div>
      </div>

      {!mapReady && (
        <div
          style={{
            color: "#c0c4b9",
            fontSize: "11px"
          }}
        >
          Preparing map colour sampling…
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState<Location | null>(null);
  const [selectedYear, setSelectedYear] = useState(2001);
  const [activeMap, setActiveMap] =
    useState<EnvironmentalMap | null>(null);

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mapVolume, setMapVolume] = useState(0.4);

  const birdsRef = useRef<HTMLAudioElement | null>(null);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const thunderRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [analysers, setAnalysers] = useState<
    (AnalyserNode | null)[]
  >([null, null, null]);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const make = (url: string) => {
      const audio = new Audio();

      audio.crossOrigin = "anonymous";
      audio.src = url;
      audio.loop = true;
      audio.volume = 0.18;

      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();

      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;

      source.connect(analyser);
      analyser.connect(ctx.destination);

      return { audio, analyser };
    };

    const birds = make(AUDIO_TRACKS.birds);
    const rain = make(AUDIO_TRACKS.rain);
    const thunder = make(AUDIO_TRACKS.thunder);

    birdsRef.current = birds.audio;
    rainRef.current = rain.audio;
    thunderRef.current = thunder.audio;

    setAnalysers([
      birds.analyser,
      rain.analyser,
      thunder.analyser
    ]);

    // Try autoplay. If the browser blocks it, the START SOUND
    // button will allow playback after the visitor interacts.
    Promise.allSettled([
      birds.audio.play(),
      rain.audio.play(),
      thunder.audio.play()
    ]).then((results) => {
      const anyPlaying = results.some(
        result => result.status === "fulfilled"
      );

      setAudioPlaying(anyPlaying);
    });

    return () => {
      birds.audio.pause();
      rain.audio.pause();
      thunder.audio.pause();

      birds.audio.src = "";
      rain.audio.src = "";
      thunder.audio.src = "";

      void ctx.close();
    };
  }, []);

  const yearData = selected
    ? selected.data[selectedYear]
    : null;

  const baselineData = selected
    ? selected.data[
        Object.keys(selected.data)
          .map(Number)
          .sort((a, b) => a - b)[0]
      ]
    : null;

  const locationVolumes =
    selected && yearData && baselineData
      ? {
          birds: getVolume(
            yearData.pollution ??
              baselineData.pollution ??
              0,
            baselineData.pollution ?? 0,
            0,
            100,
            true,
            0.4
          ),
          rain: getVolume(
            yearData.airTemp ??
              baselineData.airTemp ??
              0,
            baselineData.airTemp ?? 0,
            0,
            5
          ),
          thunder: getVolume(
            yearData.ozone ??
              baselineData.ozone ??
              0,
            baselineData.ozone ?? 0,
            0,
            40,
            true
          )
        }
      : {
          birds: 0.4,
          rain: 0.18,
          thunder: 0.18
        };

  /*
   * On an environmental map, mute the other two tracks.
   * On a location page or the globe, use the location soundscape.
   */
  const audioVolumes = activeMap
    ? {
        birds:
          activeMap === "Air Quality"
            ? mapVolume
            : 0,
        rain:
          activeMap === "Air Temperature"
            ? mapVolume
            : 0,
        thunder:
          activeMap === "Ozone Levels"
            ? mapVolume
            : 0
      }
    : locationVolumes;

  useEffect(() => {
    if (!audioPlaying) return;

    const tracks = [
      {
        audio: birdsRef.current,
        target: audioVolumes.birds
      },
      {
        audio: rainRef.current,
        target: audioVolumes.rain
      },
      {
        audio: thunderRef.current,
        target: audioVolumes.thunder
      }
    ];

    const animations: number[] = [];

    tracks.forEach(({ audio, target }) => {
      if (!audio) return;

      const startVolume = audio.volume;
      const startTime = performance.now();
      const duration = 650;

      const animate = (time: number) => {
        const progress = Math.min(
          (time - startTime) / duration,
          1
        );

        audio.volume =
          startVolume +
          (target - startVolume) * progress;

        if (progress < 1) {
          animations.push(
            requestAnimationFrame(animate)
          );
        }
      };

      animations.push(
        requestAnimationFrame(animate)
      );
    });

    return () => {
      animations.forEach(cancelAnimationFrame);
    };
  }, [
    audioPlaying,
    audioVolumes.birds,
    audioVolumes.rain,
    audioVolumes.thunder
  ]);

  const startAudio = async () => {
    try {
      await audioCtxRef.current?.resume();

      const tracks = [
        birdsRef.current,
        rainRef.current,
        thunderRef.current
      ].filter(
        (track): track is HTMLAudioElement =>
          track !== null
      );

      const results = await Promise.allSettled(
        tracks.map(track => track.play())
      );

      setAudioPlaying(
        results.some(
          result => result.status === "fulfilled"
        )
      );
    } catch (error) {
      console.error("Could not start audio:", error);
    }
  };

  const stopAudio = () => {
    birdsRef.current?.pause();
    rainRef.current?.pause();
    thunderRef.current?.pause();

    setAudioPlaying(false);
  };

  const toggleAudio = () => {
    if (audioPlaying) {
      stopAudio();
    } else {
      void startAudio();
    }
  };

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const openLocation = (location: Location) => {
    const years = Object.keys(location.data).map(Number);

    setSelectedYear(Math.min(...years));
    setSelected(location);
  };

  const availableYears = selected
    ? Object.keys(selected.data)
        .map(Number)
        .sort((a, b) => a - b)
    : [];

  const currentImage = selected
    ? getImage(selected, selectedYear)
    : undefined;

  const stats = yearData
    ? [
        {
          label: "CO₂ LEVEL",
          value: yearData.co2,
          unit: "ppm"
        },
        {
          label: "AIR TEMPERATURE",
          value: yearData.airTemp,
          unit: "°C"
        },
        {
          label: "AIR POLLUTION",
          value: yearData.pollution,
          unit: "µg/m³"
        },
        {
          label: "OZONE LEVEL",
          value: yearData.ozone,
          unit: "DU"
        }
      ].filter(stat => stat.value !== null)
    : [];

  const visualizerTracks: VisualizerTrack[] = [
    {
      key: "birds",
      icon: "🐦",
      name: "BIRDS",
      color: "#a8bd9c",
      rule: "Quieter as air quality worsens; louder as it improves.",
      volume: audioVolumes.birds,
      baseline: 0.4,
      analyser: analysers[0]
    },
    {
      key: "rain",
      icon: "🌧️",
      name: "RAIN",
      color: "#7fc4ff",
      rule: "Louder as air temperature rises; quieter as it falls.",
      volume: audioVolumes.rain,
      baseline: 0.18,
      analyser: analysers[1]
    },
    {
      key: "thunder",
      icon: "🌩️",
      name: "THUNDER",
      color: "#c4a7ff",
      rule: "Lower ozone = louder thunder. Higher ozone = quieter thunder.",
      volume: audioVolumes.thunder,
      baseline: 0.18,
      analyser: analysers[2]
    }
  ];

  return (
    <main className="app">
      <Starfield />

      {/* Keep the original sound visualiser on the globe/location screens only. */}
      {!activeMap && (
        <>
          <AudioVisualizer
            tracks={visualizerTracks}
            playing={audioPlaying}
          />
          <div style={{ height: 72 }} />
        </>
      )}

      {!activeMap && (
        <FloatingMenu
        onSelect={(option) => {
          console.log("EIC menu selected:", option);
          console.log("Available maps:", Object.keys(MAP_IMAGES));
      
          if (option in MAP_IMAGES) {
            setMapVolume(0.4);
            setActiveMap(option as EnvironmentalMap);
          } else {
            console.error("No matching EIC map:", option);
          }
        }}
      />
      )}

      {activeMap ? (
        <section
          aria-label={`${activeMap} environmental map`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            boxSizing: "border-box",
            background: "#050b12"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "24px",
              right: "24px",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px"
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 6px",
                  color: "#a8bd9c",
                  fontSize: "11px",
                  letterSpacing: "2px"
                }}
              >
                EARTH INFORMATION JUKEBOX / ENVIRONMENTAL DATA
              </p>

              <h1
                style={{
                  margin: 0,
                  color: "#eeeae0",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 4vw, 38px)"
                }}
              >
                {activeMap}
              </h1>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <button
                type="button"
                onClick={toggleAudio}
                style={{
                  padding: "11px 17px",
                  border: "1px solid #829b7a",
                  borderRadius: "6px",
                  background: "#17221f",
                  color: "#eeeae0",
                  cursor: "pointer",
                  fontFamily: "inherit"
                }}
              >
                {audioPlaying
                  ? "♫ STOP SOUND"
                  : "♫ START SOUND"}
              </button>

              <button
                type="button"
                onClick={() => setActiveMap(null)}
                style={{
                  padding: "11px 17px",
                  border: "1px solid #829b7a",
                  borderRadius: "6px",
                  background: "#17221f",
                  color: "#eeeae0",
                  cursor: "pointer",
                  fontFamily: "inherit"
                }}
              >
                ← BACK
              </button>
            </div>
          </div>

          <MapSoundExplorer
            map={activeMap}
            onVolumeChange={setMapVolume}
            playing={audioPlaying}
          />
        </section>
      ) : !selected ? (
        <>
          <header
            className="app-header"
            style={{
              position: "relative",
              zIndex: 1001,
              pointerEvents: "auto"
            }}
          >
            <h1>EARTH INFORMATION JUKEBOX</h1>
            <p>
              Explore our changing planet through satellite data and sound
            </p>

            <button
              type="button"
              onClick={toggleAudio}
              style={{
                position: "relative",
                zIndex: 1002,
                pointerEvents: "auto",
                marginTop: "12px",
                padding: "9px 18px",
                borderRadius: "6px",
                border: "1px solid #829b7a",
                background: "#17221f",
                color: "#eeeae0",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              {audioPlaying
                ? "♫ STOP SOUND"
                : "♫ START SOUND"}
            </button>
          </header>

          <div className="globe-area">
            <Globe
              width={dimensions.width}
              height={dimensions.height - 182}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              backgroundColor="rgba(0,0,0,0)"
              rendererConfig={{
                alpha: true,
                antialias: true
              }}
              pointsData={locations}
              pointLat="lat"
              pointLng="lng"
              pointColor={() => "#ffe600"}
              pointAltitude={0.025}
              pointRadius={0.8}
              ringsData={locations}
              ringLat="lat"
              ringLng="lng"
              ringColor={() =>
                (t: number) => `rgba(255, 230, 0, ${1 - t})`
              }
              ringMaxRadius={4}
              ringPropagationSpeed={2}
              ringRepeatPeriod={1200}
              onPointClick={(point: object) =>
                openLocation(point as Location)
              }
              pointLabel={(point: object) => {
                const location = point as Location;

                const previewImages: Record<string, string> = {
                  "Gurugram, India": "/src/images/india.jfif",
                  "Ariquemes, Brazil": "/src/images/brazil.jfif",
                  "London Gateway, UK": "/src/images/england.jpg",
                  "Baga, Lake Chad": "/src/images/africa.jfif",
                  "Mandurah, Australia": "/src/images/australia.jfif",
                  "Lake Mead, USA": "/src/images/america.jfif"
                };

                const previewImage =
                  previewImages[location.name];

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
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "12px"
            }}
          >
            <button
              className="back-button"
              onClick={() => setSelected(null)}
              style={{
                margin: 0,
                alignSelf: "center"
              }}
            >
              ← BACK TO GLOBE
            </button>

            <button
              type="button"
              onClick={toggleAudio}
              style={{
                position: "relative",
                zIndex: 100,
                margin: 0,
                padding: "9px 18px",
                borderRadius: "6px",
                border: "1px solid #829b7a",
                background: "#17221f",
                color: "#eeeae0",
                cursor: "pointer",
                fontFamily: "inherit",
                pointerEvents: "auto",
                alignSelf: "center"
              }}
            >
              {audioPlaying
                ? "♫ STOP SOUND"
                : "♫ START SOUND"}
            </button>
          </div>

          <header className="location-heading">
            <p>
              EARTH INFORMATION JUKEBOX / LOCATION EXPLORER
            </p>

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

                <div className="shooting-timeline">
                  <div className="shooting-track">
                    <div
                      className="shooting-progress"
                      style={{
                        width: `${
                          availableYears.length > 1
                            ? (availableYears.indexOf(selectedYear) /
                                (availableYears.length - 1)) *
                              100
                            : 0
                        }%`
                      }}
                    />

                    <div
                      className="shooting-star"
                      style={{
                        left: `${
                          availableYears.length > 1
                            ? (availableYears.indexOf(selectedYear) /
                                (availableYears.length - 1)) *
                              100
                            : 0
                        }%`
                      }}
                    />

                    <input
                      className="shooting-input"
                      type="range"
                      min="0"
                      max={availableYears.length - 1}
                      step="1"
                      value={availableYears.indexOf(selectedYear)}
                      onChange={(event) => {
                        setSelectedYear(
                          availableYears[
                            Number(event.target.value)
                          ]
                        );
                      }}
                      aria-label="Select historical year"
                    />
                  </div>
                </div>

                <div className="year-options">
                  {availableYears.map(year => (
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
                  {stats.map(stat => (
                    <div
                      className="stat-box"
                      key={stat.label}
                    >
                      <span>{stat.label}</span>
                      <strong>
                        {stat.value} {stat.unit}
                      </strong>
                    </div>
                  ))}
                </div>

                {stats.length === 0 && (
                  <p>
                    No measurements are available for this year.
                  </p>
                )}
              </section>

              <section className="info-card change-card">
                <h3>CHANGE OVER TIME</h3>

                <p className="section-description">
                  {yearData?.title ??
                    `Historical context · ${selectedYear}`}
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
