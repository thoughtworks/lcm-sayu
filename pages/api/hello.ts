// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { createConnection } from 'typeorm'

import { Person } from 'src/model/Person'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await createConnection()
    try {
      const user: Person = {
        name: 'user',
      }
      const userReposiotory = connection.getRepository('Person')
      res.json(await userReposiotory.save(user))
      res.statusCode = 200
      console.warn(await userReposiotory.find())
    } finally {
      connection.close()
    }
  } catch (err) {
    console.error(err)
    res.statusCode = 500
    res.json({ status: 500 })
  }
}

export default handler
