export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'Used in the event URL: /events/your-slug-here',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Event logo',
      description: 'Optional. If left empty, the page shows the default ROSE logo instead.',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'date',
      title: 'Date & time',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Pending confirmation', value: 'pending' },
        ],
        layout: 'radio',
      },
      initialValue: 'confirmed',
    },
    {
      name: 'summary',
      title: 'Summary',
      description: 'Short blurb used on listing cards.',
      type: 'text',
      rows: 3,
    },
    {
      name: 'carouselImages',
      title: 'Carousel images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'sections',
      title: 'Sections',
      description: 'Content sections shown on the event page. Add as many as you like.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
            {
              name: 'image',
              title: 'Image',
              description: 'Optional. Sections alternate the image left/right down the page automatically.',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'heading', media: 'image' },
          },
        },
      ],
    },
    {
      name: 'registrationUrl',
      title: 'Registration URL',
      description: 'Where the "Sign up now" button links to (e.g. the Tjing event page).',
      type: 'url',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location' },
  },
}
