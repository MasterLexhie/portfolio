import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'type', 'published_date'],
  },
  fields: [
    { name: 'title',          type: 'text',     required: true },
    { name: 'slug',           type: 'text',     required: true, unique: true },
    { name: 'summary',        type: 'textarea', required: true },
    { name: 'featured',       type: 'checkbox', required: true, defaultValue: false },
    { name: 'cover_image',    type: 'upload',   relationTo: 'media', required: true },
    { name: 'role',           type: 'text',     required: true },
    { name: 'outcome_metric', type: 'text',     required: true },
    { name: 'problem',        type: 'richText' },
    { name: 'solution',       type: 'richText' },
    { name: 'result',         type: 'richText' },
    { name: 'discovery',          type: 'richText' },
    { name: 'tech_stack',         type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'architecture_image', type: 'upload', relationTo: 'media' },
    { name: 'screenshots',        type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
    { name: 'live_url',           type: 'text' },
    { name: 'github_url',         type: 'text' },
    { name: 'published_date',     type: 'date' },
    {
      name: 'type',
      type: 'select',
      options: ['full-stack', 'backend', 'frontend', 'web3'],
    },
  ],
}
