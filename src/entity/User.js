const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'allowed_users',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    email: {
      type: 'text',
      unique: true,
    },
    role: {
      type: 'text',
    },
    createdAt: {
      type: 'timestamp',
    },
  },
})