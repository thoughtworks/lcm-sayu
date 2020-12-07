import { Between } from 'typeorm'

import { RegistryDTO } from 'src/dto/RegistryDTO'
import { Registry } from 'src/model/Registry'
import { Symptom } from 'src/model/Symptom'
import { User } from 'src/model/User'

import { Service } from './Service'
import { UserService } from './UserService'
import { SymptomService } from './SymptomService'

export class RegistryService extends Service {
  async saveRegistry(symptomsToRegister: any, email: string): Promise<void> {
    const user = await this.getUser(email)
    const symptomList = await this.getSymptoms()

    const connection = await this.getConnection()
    try {
      const registryList: Registry[] = symptomList
        .filter((symptom: Symptom) =>
          this.validateSymptom(symptom, symptomsToRegister)
        )
        .map<Registry>((symptom: Symptom) => {
          const value = this.getSymptomValue(
            symptom,
            symptomsToRegister
          ) as number
          return new Registry(value, symptom, user)
        })
      const registryRepository = connection.getRepository('Registry')
      await registryRepository.save(registryList)
    } finally {
      connection.close()
    }
  }

  async registriesRetrieval(user: User): Promise<RegistryDTO[]> {
    const connection = await this.getConnection()
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
          user: user,
        },
      })
      return this.toRegistriesDTO(symptomsRegistries)
    } finally {
      connection.close()
    }
  }

  async getLastRegistryByUser(user: User): Promise<Registry | undefined> {
    const connection = await this.getConnection()
    try {
      const registryRepository = connection.getRepository<Registry>('Registry')
      const userLastRegistry = await registryRepository.findOne({
        join: {
          alias: 'registry',
          innerJoin: {
            user: 'registry.user',
          },
        },
        where: { user: user },
        order: { creationDate: 'DESC' },
      })
      return userLastRegistry
    } finally {
      connection.close()
    }
  }

  private getSymptomValue(
    symptom: Symptom,
    symptomsToRegister: any
  ): number | undefined {
    switch (symptom.name) {
      case 'Rescate':
        return parseInt(symptomsToRegister['rescate'], 10)
      case 'Fiebre':
        return parseInt(symptomsToRegister['fiebre'], 10)
      case 'Deposiciones':
        return parseInt(symptomsToRegister['deposiciones'], 10)
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
      case 'Rescate':
        return 'rescate' in symptomsToRegister
      case 'Fiebre':
        return 'fiebre' in symptomsToRegister
      case 'Deposiciones':
        return 'deposiciones' in symptomsToRegister
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
      rescueLevel: false,
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
          rescueLevel: registryDTO.rescueLevel,
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
        rescueLevel: registryDTO.rescueLevel,
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
      case 'Deposiciones':
        registryDTO.depositionLevel = Boolean(registry.value)
        break
      case 'Fiebre':
        registryDTO.feverLevel = Boolean(registry.value)
        break
      case 'Rescate':
        registryDTO.rescueLevel = Boolean(registry.value)
    }
    return registryDTO
  }

  private async getUser(email: string): Promise<User> {
    const userService = new UserService()
    const user = await userService.getByEmail(email)
    if (!user) {
      throw new Error(`User not found ${email}`)
    }

    return user
  }

  private async getSymptoms(): Promise<Symptom[]> {
    const symptomService = new SymptomService()
    return symptomService.getAllSymptoms()
  }
}
