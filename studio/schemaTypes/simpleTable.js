export default {
  name: 'simpleTable',
  title: 'Table',
  type: 'object',
  fields: [
    {
      name: 'rows',
      title: 'Rows',
      description: 'The first row is shown as the table header.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          title: 'Row',
          fields: [
            {
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }) {
              return { title: (cells || []).join('  |  ') }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: { rows: 'rows' },
    prepare({ rows }) {
      return { title: 'Table', subtitle: `${(rows || []).length} rows` }
    },
  },
}
