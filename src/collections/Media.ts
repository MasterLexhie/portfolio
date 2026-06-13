import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Files are served through /api/media/file/* — must be publicly readable
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'card',  width: 800,  height: 450, position: 'centre' },
      { name: 'og',    width: 1200, height: 630, position: 'centre' },
      { name: 'thumb', width: 400,  height: 225, position: 'centre' },
    ],
    adminThumbnail: 'thumb',
    // Raster formats only — SVG can carry scripts and these files are
    // served same-origin from /api/media/file/*
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
