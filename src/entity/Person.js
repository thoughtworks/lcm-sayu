const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Person',
  tableName: 'person',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    name: {
      type: 'text',
    },
  },
})
