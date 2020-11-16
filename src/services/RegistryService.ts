import { createConnection } from 'typeorm'
import { RegistryDTO } from 'src/dto/RegistryDTO'
import { Registry } from 'src/model/Registry'
import { Symptom } from 'src/model/Symptom'

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

  async registriesRetrieval(): Promise<RegistryDTO[]> {
    const connection = await createConnection()
    try {
      const registryRepository = connection.getRepository<Registry>('Registry')
      const symptomsRegistries = await registryRepository.find({
        relations: ['symptom'],
        order: {
          creationDate: 'DESC',
        },
      })
      return this.toRegistriesDTO(symptomsRegistries)
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
  private toRegistriesDTO(registries: Registry[]): RegistryDTO[] {
    const registriesDTO: RegistryDTO[] = []
    let symptomsDate: Date = new Date()
    let currentDate: Date = new Date()
    let painLevel = 0
    let tireLevel = 0
    let appetiteLevel = 0
    let nauseaLevel = 0
    let swallowLevel = 0
    let airLevel = 0
    let depositionLevel = false
    let feverLevel = false

    let firstIteration = true

    let count = 0

    let symptomsGroupSaved = false

    registries.forEach((registry) => {
      symptomsGroupSaved = false
      count += 1
      currentDate = registry.creationDate

      if (!firstIteration && currentDate.getTime() != symptomsDate.getTime()) {
        const registryDTO: RegistryDTO = {
          id: count,
          symptomDate: symptomsDate.toDateString(),
          painLevel: painLevel,
          tireLevel: tireLevel,
          appetiteLevel: appetiteLevel,
          nauseaLevel: nauseaLevel,
          swallowLevel: swallowLevel,
          airLevel: airLevel,
          depositionLevel: depositionLevel,
          feverLevel: feverLevel,
        }
        registriesDTO.push(registryDTO)
        firstIteration = true
        symptomsGroupSaved = true
      }

      if (firstIteration) {
        symptomsDate = registry.creationDate
        firstIteration = false
      }

      if (registry.symptom.name === 'Dolor') {
        painLevel = registry.value
      }
      if (registry.symptom.name === 'Cansancio') {
        tireLevel = registry.value
      }
      if (registry.symptom.name === 'Apetito') {
        appetiteLevel = registry.value
      }
      if (registry.symptom.name === 'Náuseas') {
        nauseaLevel = registry.value
      }
      if (registry.symptom.name === 'Dificultad para tragar') {
        swallowLevel = registry.value
      }
      if (registry.symptom.name === 'Falta de aire') {
        airLevel = registry.value
      }
      if (registry.symptom.name === 'Constipación') {
        depositionLevel = Boolean(registry.value)
      }
      if (registry.symptom.name === 'Fiebre') {
        feverLevel = Boolean(registry.value)
      }
    })

    if (!symptomsGroupSaved) {
      const lastRegistryDTO: RegistryDTO = {
        id: count,
        symptomDate: symptomsDate.toDateString(),
        painLevel: painLevel,
        tireLevel: tireLevel,
        appetiteLevel: appetiteLevel,
        nauseaLevel: nauseaLevel,
        swallowLevel: swallowLevel,
        airLevel: airLevel,
        depositionLevel: depositionLevel,
        feverLevel: feverLevel,
      }
      registriesDTO.push(lastRegistryDTO)
    }

    return registriesDTO
  }
}
