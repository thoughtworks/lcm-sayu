const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Symptom',
  tableName: 'symptom',
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
  relations: {
    registries: {
      target: 'Registry',
      type: 'one-to-many',
      joinTable: true,
      cascade: true,
    },
  },
})
