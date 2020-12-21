import { NextApiHandler } from 'next'
import { getSession, Session } from 'next-auth/client'

import { RegistryService } from 'src/services/RegistryService'
import { Role } from 'src/model/Role'
import { withSessionServer } from 'src/hoc/WithSession'

const handler: NextApiHandler = async (req, res) => {
  try {
    const registryTimestamp = parseInt(
      req.query['registry-timestamp'] as string,
      10
    )
    if (isNaN(registryTimestamp)) {
      throw new Error('Invalid registry timestamp')
    }

    const {
      user: { email },
    } = (await getSession({ req })) as Session

    const registryDate = new Date(registryTimestamp)
    const registryService = new RegistryService()
    await registryService.removeRegistries(registryDate, email)
  } catch (err) {
    console.error(err)
    res.status(500)
  }

  res.send(null)
}

export default withSessionServer(handler, [Role.CUIDADOR])
