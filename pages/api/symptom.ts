import { NextApiRequest, NextApiResponse } from 'next'
import { createConnection } from 'typeorm'

import { Registry } from 'src/model/Registry'
import { Symptom } from 'src/model/Symptom'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const symptoms = JSON.parse(req.body)
  try {
    const connection = await createConnection()
    try {
      const creationDate = new Date(Date.now())
      const symptomList = await connection
        .getRepository<Symptom>('Symptom')
        .find()
      const registry: Registry[] = [
        {
          creationDate,
          value: symptoms.fiebre as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Fiebre'
          ),
        },
        {
          creationDate,
          value: symptoms.constipacion as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Constipación'
          ),
        },
        {
          creationDate,
          value: symptoms.cansancio as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Cansancio'
          ),
        },
        {
          creationDate,
          value: symptoms.nausea as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Náusea'
          ),
        },
        {
          creationDate,
          value: symptoms.apetito as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Apetito'
          ),
        },
        {
          creationDate,
          value: symptoms.aire as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Falta de aire'
          ),
        },
        {
          creationDate,
          value: symptoms.tragar as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Dificultad para tragar'
          ),
        },
        {
          creationDate,
          value: symptoms.painlevel as number,
          symptom: symptomList.find(
            (symptom: Symptom) => symptom.name === 'Dolor'
          ),
        },
      ]
      const registryRepository = connection.getRepository('Registry')
      await registryRepository.save(registry)
      res.statusCode = 200
    } finally {
      connection.close()
    }
  } catch (err) {
    console.error(err)
    res.statusCode = 500
  }
}

export default handler
