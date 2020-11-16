import { NextApiRequest, NextApiResponse } from 'next'

import { RegistryService } from 'src/services/RegistryService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const registryService = new RegistryService()
    const symptomsRegistries = await registryService.registriesRetrieval()
    res.json(symptomsRegistries)
    res.status(200)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
  res.send(null)
}

export default handler
