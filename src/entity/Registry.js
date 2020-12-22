const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Registry',
  tableName: 'registry',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    creationDate: {
      type: 'timestamp',
    },
    value: {
      type: 'integer',
    },
  },
  relations: {
    symptom: {
      target: 'Symptom',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
    },
    user: {
      target: 'User',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
    },
  },
  indices: [
    {
      columns: ['creationDate'],
    },
  ],
})
