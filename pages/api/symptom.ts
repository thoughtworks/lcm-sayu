import { NextApiRequest, NextApiResponse } from 'next'
import { createConnection } from 'typeorm'

import { Registry } from 'src/model/Registry'
import { Symptom } from 'src/model/Symptom'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const symptoms = JSON.parse(req.body)
  try {
    const connection = await createConnection()
    try {
      const symptomList = await connection
        .getRepository<Symptom>('Symptom')
        .find()
      const registry: Registry[] = [
        {
          creationDate: new Date(),
          value: symptoms.fiebre as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Fiebre'
          ),
        },
        {
          creationDate: new Date(),
          value: symptoms.constipacion as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Constipación'
          ),
        },
        {
          creationDate: new Date(),
          value: symptoms.cansancio as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Falta de aire'
          ),
        },
        {
          creationDate: new Date(),
          value: symptoms.nausea as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Náusea'
          ),
        },
        {
          creationDate: new Date(),
          value: symptoms.apetito as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Cansancio'
          ),
        },
        {
          creationDate: new Date(),
          value: symptoms.aire as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Apetito'
          ),
        },
        {
          creationDate: new Date(),
          value: symptoms.tragar as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Dificultad para tragar'
          ),
        },
      ]
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
