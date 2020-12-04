import { MonthRegistry } from 'src/steps/SymptomsRegistryList'
import { Registry } from 'src/model/Registry'
import { User } from 'src/model/User'
import { Role } from 'src/model/Role'

const user = new User('test@test.com', Role.CUIDADOR)

const date = new Date(2020, 10, 21, 1, 18, 33)
const secondDate = new Date(2020, 10, 22, 1, 18, 33)
const thirdDate = new Date(2020, 10, 23, 1, 18, 33)
const secondHourDate = new Date(2020, 10, 21, 2, 18, 33)
const monday = new Date(2020, 10, 30, 1, 18, 33)
const tuesday = new Date(2020, 11, 1, 1, 18, 33)
const wednesday = new Date(2020, 11, 2, 1, 18, 33)
const thursday = new Date(2020, 11, 3, 1, 18, 33)
const friday = new Date(2020, 11, 4, 1, 18, 33)
const saturday = new Date(2020, 11, 5, 1, 18, 33)
const sunday = new Date(2020, 11, 6, 1, 18, 33)

const symptomsMonthRegistries: MonthRegistry[] = [
  {
    month: 10,
    year: 2020,
    viewRegistries: [
      {
        day: new Date(2020, 10, 18, 12, 9, 40).getTime(),
        registries: [
          {
            airLevel: 1,
            appetiteLevel: 2,
            depositionLevel: true,
            feverLevel: true,
            id: 1,
            nauseaLevel: 3,
            painLevel: 4,
            swallowLevel: 5,
            symptomDate: new Date(2020, 10, 18, 12, 9, 40).getTime(),
            tireLevel: 6,
            rescueLevel: true,
          },
        ],
      },
      {
        day: new Date(2020, 10, 12, 0, 47, 56).getTime(),
        registries: [
          {
            airLevel: 7,
            appetiteLevel: 7,
            depositionLevel: false,
            feverLevel: false,
            id: 17,
            nauseaLevel: 7,
            painLevel: 7,
            swallowLevel: 7,
            symptomDate: new Date(2020, 10, 12, 0, 47, 56).getTime(),
            tireLevel: 7,
            rescueLevel: true,
          },
          {
            airLevel: 7,
            appetiteLevel: 7,
            depositionLevel: false,
            feverLevel: false,
            id: 25,
            nauseaLevel: 7,
            painLevel: 7,
            swallowLevel: 7,
            symptomDate: new Date(2020, 10, 12, 0, 47, 56).getTime(),
            tireLevel: 7,
            rescueLevel: false,
          },
        ],
      },
      {
        day: new Date(2020, 10, 11, 16, 47, 9).getTime(),
        registries: [
          {
            airLevel: 7,
            appetiteLevel: 7,
            depositionLevel: false,
            feverLevel: false,
            id: 33,
            nauseaLevel: 7,
            painLevel: 7,
            swallowLevel: 7,
            symptomDate: new Date(2020, 10, 11, 16, 47, 9).getTime(),
            tireLevel: 7,
            rescueLevel: true,
          },
        ],
      },
      {
        day: new Date(2020, 10, 9, 23, 57, 34).getTime(),
        registries: [
          {
            airLevel: 7,
            appetiteLevel: 7,
            depositionLevel: false,
            feverLevel: false,
            id: 40,
            nauseaLevel: 7,
            painLevel: 7,
            swallowLevel: 7,
            symptomDate: new Date(2020, 10, 9, 23, 57, 34).getTime(),
            tireLevel: 7,
            rescueLevel: false,
          },
        ],
      },
    ],
  },
]

const differentMonthViewRegistry: MonthRegistry[] = [
  {
    month: 11,
    year: 2020,
    viewRegistries: [
      {
        day: tuesday.getTime(),
        registries: [
          {
            airLevel: 7,
            appetiteLevel: 7,
            depositionLevel: false,
            feverLevel: false,
            id: 17,
            nauseaLevel: 7,
            painLevel: 7,
            swallowLevel: 7,
            symptomDate: new Date(2020, 11, 1, 0, 47, 56).getTime(),
            tireLevel: 7,
            rescueLevel: true,
          },
          {
            airLevel: 7,
            appetiteLevel: 7,
            depositionLevel: false,
            feverLevel: false,
            id: 25,
            nauseaLevel: 7,
            painLevel: 7,
            swallowLevel: 7,
            symptomDate: new Date(2020, 11, 1, 2, 47, 56).getTime(),
            tireLevel: 7,
            rescueLevel: true,
          },
        ],
      },
    ],
  },
  {
    month: 10,
    year: 2020,
    viewRegistries: [
      {
        day: monday.getTime(),
        registries: [
          {
            airLevel: 1,
            appetiteLevel: 2,
            depositionLevel: true,
            feverLevel: true,
            id: 1,
            nauseaLevel: 3,
            painLevel: 4,
            swallowLevel: 5,
            symptomDate: new Date(2020, 10, 30, 12, 9, 40).getTime(),
            tireLevel: 6,
            rescueLevel: true,
          },
        ],
      },
    ],
  },
]

const oneDayMonthRegistries: MonthRegistry[] = [
  {
    month: 10,
    year: 2020,
    viewRegistries: [
      {
        day: new Date(2020, 10, 12, 21, 47, 56).getTime(),
        registries: [
          {
            airLevel: 1,
            appetiteLevel: 2,
            depositionLevel: true,
            feverLevel: true,
            id: 17,
            nauseaLevel: 3,
            painLevel: 4,
            swallowLevel: 5,
            symptomDate: new Date(2020, 10, 12, 21, 47, 56).getTime(),
            tireLevel: 6,
            rescueLevel: true,
          },
          {
            airLevel: 7,
            appetiteLevel: 7,
            depositionLevel: false,
            feverLevel: false,
            id: 25,
            nauseaLevel: 7,
            painLevel: 7,
            swallowLevel: 7,
            symptomDate: new Date(2020, 10, 12, 21, 43, 56).getTime(),
            tireLevel: 7,
            rescueLevel: true,
          },
        ],
      },
    ],
  },
]

const threeDaySymptoms: Registry[] = [
  {
    id: 41,
    creationDate: date,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 43,
    creationDate: date,
    value: 6,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 65,
    creationDate: date,
    value: 1,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
  {
    id: 49,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 50,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 51,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 52,
    creationDate: secondDate,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 53,
    creationDate: secondDate,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 54,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 55,
    creationDate: secondDate,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 56,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 66,
    creationDate: secondDate,
    value: 0,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
  {
    id: 57,
    creationDate: thirdDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 58,
    creationDate: thirdDate,
    value: 0,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 59,
    creationDate: thirdDate,
    value: 2,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 60,
    creationDate: thirdDate,
    value: 6,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 61,
    creationDate: thirdDate,
    value: 9,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 62,
    creationDate: thirdDate,
    value: 3,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 63,
    creationDate: thirdDate,
    value: 6,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 64,
    creationDate: thirdDate,
    value: 2,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 67,
    creationDate: thirdDate,
    value: 1,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
]

const differentMonthSymptoms: Registry[] = [
  {
    id: 41,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 42,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 43,
    creationDate: monday,
    value: 6,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 44,
    creationDate: monday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 45,
    creationDate: monday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 46,
    creationDate: monday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 47,
    creationDate: monday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 48,
    creationDate: monday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 57,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
  {
    id: 49,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 50,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 51,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 52,
    creationDate: tuesday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 53,
    creationDate: tuesday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 54,
    creationDate: tuesday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 55,
    creationDate: tuesday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 56,
    creationDate: tuesday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 58,
    creationDate: tuesday,
    value: 0,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
]

const oneDaySymptoms: Registry[] = [
  {
    id: 41,
    creationDate: date,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 43,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 57,
    creationDate: date,
    value: 1,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
  {
    id: 49,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 50,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 51,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 52,
    creationDate: secondHourDate,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 53,
    creationDate: secondHourDate,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 54,
    creationDate: secondHourDate,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 55,
    creationDate: secondHourDate,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 56,
    creationDate: secondHourDate,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 58,
    creationDate: secondHourDate,
    value: 0,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
]

const onlyOneHourSymptoms: Registry[] = [
  {
    id: 41,
    creationDate: date,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 43,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 49,
    creationDate: date,
    value: 1,
    symptom: {
      id: 9,
      name: 'Rescate',
    },
    user,
  },
]

const sevenDaySymptoms: Registry[] = [
  {
    id: 33,
    creationDate: date,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 34,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 35,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 36,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 37,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 38,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 39,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 40,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 41,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 42,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 43,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 44,
    creationDate: monday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 45,
    creationDate: monday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 46,
    creationDate: monday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 47,
    creationDate: monday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 48,
    creationDate: monday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 49,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 50,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 51,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 52,
    creationDate: tuesday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 53,
    creationDate: tuesday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 54,
    creationDate: tuesday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 55,
    creationDate: tuesday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 56,
    creationDate: tuesday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 57,
    creationDate: wednesday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 58,
    creationDate: wednesday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 59,
    creationDate: wednesday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 60,
    creationDate: wednesday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 61,
    creationDate: wednesday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 62,
    creationDate: wednesday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 63,
    creationDate: wednesday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 64,
    creationDate: wednesday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 65,
    creationDate: thursday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 66,
    creationDate: thursday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 67,
    creationDate: thursday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 68,
    creationDate: thursday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 69,
    creationDate: thursday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 70,
    creationDate: thursday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 71,
    creationDate: thursday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 72,
    creationDate: thursday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 73,
    creationDate: friday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 74,
    creationDate: friday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 75,
    creationDate: friday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 76,
    creationDate: friday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 77,
    creationDate: friday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 78,
    creationDate: friday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 79,
    creationDate: friday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 80,
    creationDate: friday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 81,
    creationDate: saturday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 82,
    creationDate: saturday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 83,
    creationDate: saturday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 84,
    creationDate: saturday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 85,
    creationDate: saturday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 86,
    creationDate: saturday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 87,
    creationDate: saturday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 88,
    creationDate: saturday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
  {
    id: 89,
    creationDate: sunday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
    user,
  },
  {
    id: 90,
    creationDate: sunday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Deposiciones',
    },
    user,
  },
  {
    id: 91,
    creationDate: sunday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
    user,
  },
  {
    id: 92,
    creationDate: sunday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
    user,
  },
  {
    id: 93,
    creationDate: sunday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
    user,
  },
  {
    id: 94,
    creationDate: sunday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
    user,
  },
  {
    id: 95,
    creationDate: sunday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
    user,
  },
  {
    id: 96,
    creationDate: sunday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
    user,
  },
]

export {
  date,
  secondDate,
  thirdDate,
  secondHourDate,
  symptomsMonthRegistries,
  differentMonthViewRegistry,
  differentMonthSymptoms,
  oneDayMonthRegistries,
  threeDaySymptoms,
  oneDaySymptoms,
  onlyOneHourSymptoms,
  sevenDaySymptoms,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}
