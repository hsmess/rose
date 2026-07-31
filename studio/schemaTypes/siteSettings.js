export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
}
