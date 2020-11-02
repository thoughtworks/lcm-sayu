import { NextApiRequest, NextApiResponse } from 'next'

import { RegistryService } from 'src/services/RegistryService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const symptoms = JSON.parse(req.body)
  try {
    const registryService = new RegistryService()
    registryService.saveRegistry(symptoms)
  } catch (err) {
    console.error(err)
    res.statusCode = 500
  }
}

export default handler
