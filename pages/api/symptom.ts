import { NextApiRequest, NextApiResponse } from 'next'
import { createConnection } from 'typeorm'

import { Registry } from 'src/model/Registry'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const symptoms = req.body
  const registry: Registry[] = [
    {
      creationDate: new Date(),
      value: symptoms.fiebre as number,
      symptom: { name: 'Fiebre' },
    },
    {
      creationDate: new Date(),
      value: symptoms.constipacion as number,
      symptom: { name: 'Constipación' },
    },
    {
      creationDate: new Date(),
      value: symptoms.cansancio as number,
      symptom: { name: 'Cansancio' },
    },
    {
      creationDate: new Date(),
      value: symptoms.nausea as number,
      symptom: { name: 'Náusea' },
    },
    {
      creationDate: new Date(),
      value: symptoms.apetito as number,
      symptom: { name: 'Apetito' },
    },
    {
      creationDate: new Date(),
      value: symptoms.aire as number,
      symptom: { name: 'Falta de aire' },
    },
    {
      creationDate: new Date(),
      value: symptoms.tragar as number,
      symptom: { name: 'Dificultad para tragar' },
    },
  ]
  try {
    const connection = await createConnection()
    try {
      const registryRepository = connection.getRepository('Registry')
      await registryRepository.save(registry)
    } finally {
      connection.close()
    }
  } catch (err) {
    console.error(err)
    res.statusCode = 500
  }
}

export default handler
