import { useEffect, useRef } from "react";

export type VisualizerTrack = {
  key: string;
  icon: string;
  name: string;
  rule: string;
  color: string;
  volume: number;
  baseline: number;
  analyser: AnalyserNode | null;
};

const BAR_COUNT = 14;

function TrackCanvas({
  analyser,
  color,
  playing,
  volume
}: {
  analyser: AnalyserNode | null;
  color: string;
  playing: boolean;
  volume: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const volumeRef = useRef(volume);

  volumeRef.current = volume;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = new Uint8Array(
      analyser ? analyser.frequencyBinCount : 0
    );

    const levels = new Array(BAR_COUNT).fill(0);
    let frame = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (analyser && playing) {
        analyser.getByteFrequencyData(data);
      } else {
        data.fill(0);
      }

      const step = Math.max(
        1,
        Math.floor(data.length / BAR_COUNT)
      );

      const gap = 3;
      const barWidth =
        (w - gap * (BAR_COUNT - 1)) / BAR_COUNT;

      const raw: number[] = [];

      for (let i = 0; i < BAR_COUNT; i++) {
        let sum = 0;

        for (let j = 0; j < step; j++) {
          sum += data[i * step + j] || 0;
        }

        raw.push(sum / step / 255);
      }

      const mean =
        raw.reduce((a, b) => a + b, 0) / BAR_COUNT;

      const max = Math.max(...raw);
      const floor = mean * 0.6;
      const span = Math.max(max - floor, 0.0001);

      const volumeScale = Math.min(
        volumeRef.current / 0.85,
        1
      );

      for (let i = 0; i < BAR_COUNT; i++) {
        const shape = Math.pow(
          Math.max(0, (raw[i] - floor) / span),
          1.5
        );

        const active = playing && max > 0.01;

        const target = active
          ? shape * (0.12 + 0.78 * volumeScale)
          : 0;

        levels[i] += (target - levels[i]) * 0.3;

        const barHeight = Math.max(2, levels[i] * h);
        const clamped = Math.min(barHeight, h);

        ctx.fillStyle = color;
        ctx.globalAlpha =
          0.35 + Math.min(levels[i] * 3, 0.65);

        ctx.fillRect(
          i * (barWidth + gap),
          h - clamped,
          barWidth,
          clamped
        );
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(frame);
  }, [analyser, color, playing]);

  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={40}
      style={{
        width: "160px",
        height: "40px",
        flexShrink: 0
      }}
    />
  );
}

export default function AudioVisualizer({
  tracks,
  playing
}: {
  tracks: VisualizerTrack[];
  playing: boolean;
}) {
  return (
    <div
      aria-label="Soundscape visualizer and key"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 24px",
        justifyContent: "center",
        padding: "10px 16px",
        boxSizing: "border-box",
        background: "rgba(5, 11, 18, 0.88)",
        borderBottom: "1px solid rgba(130, 155, 122, 0.35)",
        backdropFilter: "blur(6px)",
        color: "#eeeae0",
        fontFamily: "'DM Sans', sans-serif",
        pointerEvents: "none"
      }}
    >
      {tracks.map(track => {
        const diff = track.volume - track.baseline;

        const status = !playing
          ? "PAUSED"
          : diff > 0.03
          ? "▲ LOUDER"
          : diff < -0.03
          ? "▼ QUIETER"
          : "● BASELINE";

        return (
          <div
            key={track.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <TrackCanvas
              analyser={track.analyser}
              color={track.color}
              playing={playing}
              volume={track.volume}
            />

            <div style={{
              maxWidth: "230px",
              lineHeight: 1.35
            }}>
              <div style={{
                display: "flex",
                gap: "8px",
                alignItems: "baseline"
              }}>
                <strong style={{
                  fontSize: "13px",
                  color: track.color
                }}>
                  {track.icon} {track.name}
                </strong>

                <span style={{
                  fontSize: "10px",
                  letterSpacing: "1px",
                  color: "#a8bd9c"
                }}>
                  {status}
                </span>
              </div>

              <div style={{
                fontSize: "11px",
                color: "#c0c4b9"
              }}>
                {track.rule}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
