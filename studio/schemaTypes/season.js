// A series of events (e.g. "ROSE Winter"), shown as a weekend calendar on the home page and at /{slug}.
export default {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'e.g. "ROSE Winter"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      description:
        'The page address, e.g. "rose-winter" gives /rose-winter. Must start with "rose-" so the site can tell it apart from event links.',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom((slug) =>
          slug?.current && !slug.current.startsWith('rose-') ? 'Slug must start with "rose-"' : true
        ),
    },
    {
      name: 'image',
      title: 'Schedule image',
      description: 'The graphic listing the events and dates (shown at the top of the season page).',
      type: 'image',
    },
    {
      name: 'imageAlt',
      title: 'Schedule image description',
      description: 'For screen readers, e.g. "ROSE Winter: Gilly\'s 28 November, Box End 10 January..."',
      type: 'string',
      hidden: ({ parent }) => !parent?.image,
    },
    {
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'events',
      title: 'Events',
      description: 'The events in this season. They appear on the calendar on their dates, in any order.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    },
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', media: 'image' },
    prepare({ title, slug, media }) {
      return { title, subtitle: slug ? `/${slug}` : '', media }
    },
  },
}
