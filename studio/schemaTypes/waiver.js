export default {
  name: 'waiver',
  title: 'Waiver',
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
      description: 'Used in the URL: /waiver/your-slug-here. The standard waiver should use "standard".',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'updated',
      title: 'Updated note',
      description: 'Small line under the title, e.g. "Updated 1st November".',
      type: 'string',
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
      description: 'Heading and paragraphs for each part of the waiver.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
}
