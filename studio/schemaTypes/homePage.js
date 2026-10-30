export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'showComingSoon',
      title: 'Show the Coming Soon page instead',
      description: 'Turn this on to replace the whole home page with the Coming Soon page (e.g. between seasons).',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'bannerText',
      title: 'Top banner text',
      description: 'e.g. "2027 dates coming soon". Leave empty to hide the banner.',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'updated',
      title: 'Updated note',
      description: 'Small line under the title, e.g. "Updated 29th October".',
      type: 'string',
    },
    {
      name: 'featuredEvent',
      title: 'Featured event (optional override)',
      description:
        'Leave empty to automatically feature the next upcoming event by date. Pick an event here to feature it instead.',
      type: 'reference',
      to: [{ type: 'event' }],
    },
    {
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{ type: 'block' }, { type: 'simpleTable' }],
            },
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    },
    {
      name: 'signupHeading',
      title: 'Signup heading',
      type: 'string',
      initialValue: 'Get updates',
    },
    {
      name: 'signupText',
      title: 'Signup text',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
}
