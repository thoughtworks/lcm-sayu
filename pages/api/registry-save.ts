import { NextApiRequest, NextApiResponse } from 'next'

import { RegistryService } from 'src/services/RegistryService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default handler
