import { Registry } from 'src/model/Registry'
import { Symptom } from 'src/model/Symptom'
import { createConnection } from 'typeorm'

export class RegistryService {
  async saveRegistry(symptomsToRegister: any): Promise<void> {
    const connection = await createConnection()
    try {
      const symptomList = await connection
        .getRepository<Symptom>('Symptom')
        .find()
      const registryList: Registry[] = symptomList
        .filter((symptom: Symptom) =>
          this.validateSymptom(symptom, symptomsToRegister)
        )
        .map<Registry>((symptom: Symptom) => {
          const value = this.getSymptomValue(
            symptom,
            symptomsToRegister
          ) as number
          return new Registry(value, symptom)
        })
      const registryRepository = connection.getRepository('Registry')
      await registryRepository.save(registryList)
    } finally {
      connection.close()
    }
  }

  private getSymptomValue(
    symptom: Symptom,
    symptomsToRegister: any
  ): number | undefined {
    switch (symptom.name) {
      case 'Fiebre':
        return parseInt(symptomsToRegister['fiebre'], 10)
      case 'Constipación':
        return parseInt(symptomsToRegister['constipacion'], 10)
      case 'Cansancio':
        return parseInt(symptomsToRegister['cansancio'], 10)
      case 'Falta de aire':
        return parseInt(symptomsToRegister['aire'], 10)
      case 'Dificultad para tragar':
        return parseInt(symptomsToRegister['tragar'], 10)
      case 'Apetito':
        return parseInt(symptomsToRegister['apetito'], 10)
      case 'Náusea':
        return parseInt(symptomsToRegister['nausea'], 10)
      case 'Dolor':
        return parseInt(symptomsToRegister['painlevel'], 10)
    }
  }
  private validateSymptom(symptom: Symptom, symptomsToRegister: any) {
    switch (symptom.name) {
      case 'Fiebre':
        return 'fiebre' in symptomsToRegister
      case 'Constipación':
        return 'constipacion' in symptomsToRegister
      case 'Cansancio':
        return 'cansancio' in symptomsToRegister
      case 'Falta de aire':
        return 'aire' in symptomsToRegister
      case 'Dificultad para tragar':
        return 'tragar' in symptomsToRegister
      case 'Apetito':
        return 'apetito' in symptomsToRegister
      case 'Náusea':
        return 'nausea' in symptomsToRegister
      case 'Dolor':
        return 'painlevel' in symptomsToRegister
      default:
        false
    }
  }
}
