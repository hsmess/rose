export default {
  name: 'comingSoonPage',
  title: 'Coming Soon Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'The big headline, e.g. "ROSE 2027"',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      description: 'Shown under the title, e.g. "Coming Soon"',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Short paragraph shown above the signup form.',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    prepare() {
      return { title: 'Coming Soon Page' }
    },
  },
}
