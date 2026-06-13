import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name',    type: 'text',         required: true },
    { name: 'role',    type: 'text',         required: true },
    { name: 'quote',   type: 'textarea',     required: true },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    { name: 'avatar',  type: 'upload',       relationTo: 'media' },
  ],
}
