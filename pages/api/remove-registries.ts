import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

import { RegistryService } from 'src/services/RegistryService'
import { Role } from '../../src/model/Role'
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

    const registryDate = new Date(registryTimestamp)
    const session = await getSession({ req })
    const email = session?.user.email as string

    const registryService = new RegistryService()
    await registryService.removeRegistries(registryDate, email)
  } catch (err) {
    console.error(err)
    res.status(500)
  }

  res.send(null)
}

export default withSessionServer(handler, [Role.CUIDADOR])
