// One tee sign in the printed "caddy book". Served at /live-caddy-book/{layout}/h{hole}.
// Document IDs are deterministic (caddyPage-p-h1) so re-uploading a PDF replaces pages in place.
export default {
  name: 'caddyPage',
  title: 'Caddy Book Page',
  type: 'document',
  fields: [
    {
      name: 'layout',
      title: 'Layout',
      description: 'The letter in the URL. Printed on the signs, so do not change.',
      type: 'string',
      options: {
        list: [
          { title: 'p', value: 'p' },
          { title: 'g', value: 'g' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hole',
      title: 'Hole',
      description: 'The number in the URL (h1, h2...). Printed on the signs, so do not change.',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    },
    {
      name: 'image',
      title: 'Sign image',
      description: 'Replace this to update a single page on the site.',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Layout, then hole',
      name: 'layoutHole',
      by: [
        { field: 'layout', direction: 'asc' },
        { field: 'hole', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { layout: 'layout', hole: 'hole', media: 'image' },
    prepare({ layout, hole, media }) {
      return { title: `/live-caddy-book/${layout}/h${hole}`, media }
    },
  },
}
