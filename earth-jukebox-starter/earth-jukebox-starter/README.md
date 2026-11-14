# Earth Jukebox frontend starter

This starter gives you the two-screen interaction:

1. **Explore screen** — a large central 3D globe. Hover a glowing point to show a location preview card. Click a point to open that location.
2. **Location screen** — a large image area with year and environmental-mode controls. The controls choose which image path is displayed.

## Run it

Open this folder in VS Code. Open the integrated terminal (**Terminal → New Terminal**) and run:

```bash
npm install
npm run dev
```

Vite prints a local address, usually `http://localhost:5173`. Ctrl-click it in the terminal or open it in your browser.

## Where to write code

- `src/App.tsx` — controls whether the globe or location screen is visible.
- `src/components/GlobeView.tsx` — 3D globe, dots, hover and click events.
- `src/components/HoverPreview.tsx` — small card shown while hovering over a dot.
- `src/components/LocationViewer.tsx` — full-size image view and year/mode controls.
- `src/data/locations.ts` — the place names, coordinates, descriptions and image paths.
- `src/App.css` and `src/index.css` — the styling.
- `public/earth_texture.png` — your converted Earth texture.
- `public/images/` — put your chosen satellite images here.

## Add your own imagery

For each location, make a folder under `public/images/`. For example:

```text
public/images/gurugram/
  preview.jpg
  2001-aerosol.jpg
  2001-temperature.jpg
  2001-vegetation.jpg
  2008-aerosol.jpg
  ...
```

The hover preview paths are already set in `previewImage` in `src/data/locations.ts`, for example `/images/gurugram/preview.jpg`. Add each preview image at that exact path.

Then add image paths to the `images` object for each location, e.g.:

```ts
images: {
  2001: {
    aerosol: '/images/gurugram/2001-aerosol.jpg',
    temperature: '/images/gurugram/2001-temperature.jpg',
    vegetation: '/images/gurugram/2001-vegetation.jpg',
  },
  2024: {
    aerosol: '/images/gurugram/2024-aerosol.jpg',
    temperature: '/images/gurugram/2024-temperature.jpg',
    vegetation: '/images/gurugram/2024-vegetation.jpg',
  },
},
```

Repeat for 2008, 2016 and 2020 and for your other locations. The sample currently contains the first five locations in your Python script; edit `LOCATIONS` to use exactly the five sites your team chose.

## Important data note

The starter does not contain NASA imagery or measurements. It only provides the UI and example location descriptions. Add your team's correctly dated/labelled imagery and cite its dataset/source in the interface. The modes are named `aerosol`, `temperature` and `vegetation`; use the correct measurement/product and units for each.

## Next integration

When your teammate provides the music API, connect it from `LocationViewer.tsx` or a separate audio component. Send the selected location ID, year, mode and real measurement values/series. Do not send placeholder values as scientific data.
