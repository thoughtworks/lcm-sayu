import { NextApiHandler } from 'next'
import { getSession, Session } from 'next-auth/client'
import { withSessionServer } from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'

import { RegistryService } from 'src/services/RegistryService'

const handler: NextApiHandler = async (req, res) => {
  const symptoms = req.body
  try {
    const {
      user: { email },
    } = (await getSession({ req })) as Session
    const registryService = new RegistryService()
    await registryService.saveRegistry(symptoms, email)
    res.status(200)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
  res.send(null)
}

export default withSessionServer(handler, [Role.CUIDADOR])
