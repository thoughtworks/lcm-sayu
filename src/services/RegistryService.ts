import { Between, createConnection } from 'typeorm'
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
    const toDate = new Date()
    const fromDate = new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate() - 6
    )
    try {
      const registryRepository = connection.getRepository<Registry>('Registry')
      const symptomsRegistries = await registryRepository.find({
        relations: ['symptom'],
        order: {
          creationDate: 'DESC',
        },
        where: {
          creationDate: Between(fromDate, toDate),
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
    let symptomsDate = 0
    let currentDate = 0

    let firstIterationOfTheDay = true

    let symptomsUniqueID = 0

    let registryDTO: RegistryDTO = {
      id: 0,
      symptomDate: 0,
      painLevel: 0,
      tireLevel: 0,
      appetiteLevel: 0,
      nauseaLevel: 0,
      swallowLevel: 0,
      airLevel: 0,
      depositionLevel: false,
      feverLevel: false,
    }

    registries.forEach((registry) => {
      symptomsUniqueID += 1
      currentDate = registry.creationDate.getTime()

      if (firstIterationOfTheDay) {
        symptomsDate = currentDate
        firstIterationOfTheDay = false
      }

      if (currentDate != symptomsDate) {
        const toPushRegistryDTO: RegistryDTO = {
          id: registryDTO.id,
          symptomDate: registryDTO.symptomDate,
          painLevel: registryDTO.painLevel,
          tireLevel: registryDTO.tireLevel,
          appetiteLevel: registryDTO.appetiteLevel,
          nauseaLevel: registryDTO.nauseaLevel,
          swallowLevel: registryDTO.swallowLevel,
          airLevel: registryDTO.airLevel,
          depositionLevel: registryDTO.depositionLevel,
          feverLevel: registryDTO.feverLevel,
        }

        registriesDTO.push(toPushRegistryDTO)

        firstIterationOfTheDay = true
      }
      registryDTO = this.setSymptomLevels(
        registry,
        registryDTO,
        symptomsUniqueID
      )
    })

    if (!firstIterationOfTheDay) {
      const toPushRegistryDTO: RegistryDTO = {
        id: registryDTO.id,
        symptomDate: registryDTO.symptomDate,
        painLevel: registryDTO.painLevel,
        tireLevel: registryDTO.tireLevel,
        appetiteLevel: registryDTO.appetiteLevel,
        nauseaLevel: registryDTO.nauseaLevel,
        swallowLevel: registryDTO.swallowLevel,
        airLevel: registryDTO.airLevel,
        depositionLevel: registryDTO.depositionLevel,
        feverLevel: registryDTO.feverLevel,
      }
      registriesDTO.push(toPushRegistryDTO)
    }

    return registriesDTO
  }

  private setSymptomLevels(
    registry: Registry,
    registryDTO: RegistryDTO,
    symptomsUniqueID: number
  ) {
    registryDTO.symptomDate = registry.creationDate.getTime()
    registryDTO.id = symptomsUniqueID
    switch (registry.symptom.name) {
      case 'Dolor':
        registryDTO.painLevel = registry.value
        break
      case 'Cansancio':
        registryDTO.tireLevel = registry.value
        break
      case 'Apetito':
        registryDTO.appetiteLevel = registry.value
        break
      case 'Náuseas':
        registryDTO.nauseaLevel = registry.value
        break
      case 'Dificultad para tragar':
        registryDTO.swallowLevel = registry.value
        break
      case 'Falta de aire':
        registryDTO.airLevel = registry.value
        break
      case 'Constipación':
        registryDTO.depositionLevel = Boolean(registry.value)
        break
      case 'Fiebre':
        registryDTO.feverLevel = Boolean(registry.value)
    }
    return registryDTO
  }
}
