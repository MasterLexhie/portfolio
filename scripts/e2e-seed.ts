// Temporary Phase 2 verification script — creates (or deletes) test content via the Local API.
// Usage: payload run scripts/e2e-seed.ts [cleanup]
import { getPayload } from 'payload'
import sharp from 'sharp'
import config from '../payload.config'

const richText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', text, version: 1 }],
      },
    ],
    direction: null,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const SLUG = 'e2e-test-project'

async function main() {
  const payload = await getPayload({ config })
  const cleanup = process.argv.includes('cleanup')

  const { docs: existing } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: SLUG } },
    depth: 0,
  })

  if (cleanup) {
    for (const p of existing) {
      const { docs: ts } = await payload.find({
        collection: 'testimonials',
        where: { project: { equals: p.id } },
        depth: 0,
      })
      for (const t of ts) await payload.delete({ collection: 'testimonials', id: t.id })
      const coverId = typeof p.cover_image === 'object' ? p.cover_image?.id : p.cover_image
      await payload.delete({ collection: 'projects', id: p.id })
      if (coverId) await payload.delete({ collection: 'media', id: coverId })
    }
    console.log('CLEANUP_OK')
    process.exit(0)
  }

  const png = await sharp({
    create: { width: 1600, height: 900, channels: 3, background: { r: 28, g: 25, b: 23 } },
  })
    .png()
    .toBuffer()

  const media = await payload.create({
    collection: 'media',
    data: { alt: 'E2E test cover' },
    file: { data: png, name: 'e2e-cover.png', mimetype: 'image/png', size: png.length },
  })

  const project = await payload.create({
    collection: 'projects',
    data: {
      title: 'E2E Test Project',
      slug: SLUG,
      summary: 'Temporary project created to verify the Payload integration end to end.',
      featured: true,
      cover_image: media.id,
      role: 'Full-Stack Engineer',
      outcome_metric: '100% pipeline verified',
      type: 'full-stack',
      problem: richText('The integration needed an end-to-end verification.'),
      solution: richText('Created this project through the Payload Local API.'),
      result: richText('Rendering confirmed on the homepage and case study page.'),
      tech_stack: [{ item: 'Payload CMS' }, { item: 'Next.js' }],
      published_date: '2026-06-12',
    },
  })

  await payload.create({
    collection: 'testimonials',
    data: {
      name: 'Test Reviewer',
      role: 'QA',
      quote: 'The end-to-end pipeline works.',
      project: project.id,
    },
  })

  console.log('SEED_OK', project.id, media.id)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
