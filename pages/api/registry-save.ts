import { NextApiHandler } from 'next'
import { withSessionServer } from 'src/hoc/WithSession'

import { RegistryService } from 'src/services/RegistryService'

const handler: NextApiHandler = async (req, res) => {
  const symptoms = req.body
  try {
    const registryService = new RegistryService()
    await registryService.saveRegistry(symptoms)
    res.status(200)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
  res.send(null)
}

export default withSessionServer(handler, 'tutor')
