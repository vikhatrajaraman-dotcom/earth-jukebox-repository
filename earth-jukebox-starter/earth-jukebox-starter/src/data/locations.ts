export const YEARS = [2001, 2008, 2016, 2020, 2024] as const
export type Year = (typeof YEARS)[number]

export const MODES = [
  { id: 'aerosol', label: 'Air pollution', shortLabel: 'Aerosols' },
  { id: 'temperature', label: 'Air temperature', shortLabel: 'Temperature' },
  { id: 'vegetation', label: 'Vegetation health', shortLabel: 'NDVI' },
] as const
export type Mode = (typeof MODES)[number]['id']

export type Location = {
  id: string
  name: string
  region: string
  lat: number
  lng: number
  overview: string
  // Put a small thumbnail at this path for the hover preview.
  previewImage: string
  // Add the actual satellite image paths here as your team selects them.
  images: Partial<Record<Year, Partial<Record<Mode, string>>>>
}

// These are the first five locations from your uploaded Python script.
// Your Python script contains a sixth location (Lake Mead). Add it here if
// that is one of the five your team ultimately wants to feature instead.
export const LOCATIONS: Location[] = [
  {
    id: 'gurugram',
    name: 'Gurugram',
    region: 'Haryana, India',
    lat: 28.4595,
    lng: 77.0266,
    overview: 'A fast-growing city in northern India. Use your chosen satellite scenes to explore changes in the built environment and surrounding land.',
    previewImage: '/images/gurugram/preview.jpg',
    images: {},
  },
  {
    id: 'ariquemes',
    name: 'Ariquemes',
    region: 'Rondônia, Brazil',
    lat: -9.913,
    lng: -63.0408,
    overview: 'A location in the Brazilian Amazon region. Your imagery can help tell a story about vegetation and land-cover change.',
    previewImage: '/images/ariquemes/preview.jpg',
    images: {},
  },
  {
    id: 'london-gateway',
    name: 'London Gateway',
    region: 'Thames Estuary, Great Britain',
    lat: 51.505,
    lng: 0.45,
    overview: 'A port and logistics area on the Thames Estuary. Explore changes around the estuary and nearby development.',
    previewImage: '/images/london-gateway/preview.jpg',
    images: {},
  },
  {
    id: 'baga',
    name: 'Baga',
    region: 'Lake Chad region, Africa',
    lat: 13.1167,
    lng: 13.85,
    overview: 'A settlement in the Lake Chad region. Satellite imagery can help illustrate changes in water, land and vegetation.',
    previewImage: '/images/baga/preview.jpg',
    images: {},
  },
  {
    id: 'mandurah',
    name: 'Mandurah',
    region: 'Western Australia',
    lat: -32.5361,
    lng: 115.7424,
    overview: 'A coastal city south of Perth, near the Peel-Harvey estuary. Explore its coastal and surrounding environmental patterns.',
    previewImage: '/images/mandurah/preview.jpg',
    images: {},
  },
]
