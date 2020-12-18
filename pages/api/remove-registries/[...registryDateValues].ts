import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

import { RegistryService } from 'src/services/RegistryService'

const handler: NextApiHandler = async (req, res) => {
  const registryDateValues = req.query['registryDateValues'] as string[]

  const year = parseInt(registryDateValues[0], 10)
  const month = parseInt(registryDateValues[1], 10)
  const day = parseInt(registryDateValues[2], 10)
  const hour = parseInt(registryDateValues[3], 10)
  const minute = parseInt(registryDateValues[4], 10)
  const second = parseInt(registryDateValues[5], 10)
  const milliseconds = parseInt(registryDateValues[6], 10)

  const registryDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    milliseconds
  )
  const session = await getSession({ req })
  const email = session?.user.email as string

  const registryService = new RegistryService()

  await registryService.removeRegistries(registryDate, email)

  res.send(null)
}

export default handler
