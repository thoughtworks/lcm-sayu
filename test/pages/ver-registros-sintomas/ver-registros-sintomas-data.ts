import { MonthRegistry } from 'src/steps/SymptomsRegistryList'
import { Registry } from 'src/model/Registry'

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
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 43,
    creationDate: date,
    value: 6,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 49,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 50,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 51,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 52,
    creationDate: secondDate,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 53,
    creationDate: secondDate,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 54,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 55,
    creationDate: secondDate,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 56,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 57,
    creationDate: thirdDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 58,
    creationDate: thirdDate,
    value: 0,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 59,
    creationDate: thirdDate,
    value: 2,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 60,
    creationDate: thirdDate,
    value: 6,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 61,
    creationDate: thirdDate,
    value: 9,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 62,
    creationDate: thirdDate,
    value: 3,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 63,
    creationDate: thirdDate,
    value: 6,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 64,
    creationDate: thirdDate,
    value: 2,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
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
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 43,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 49,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 50,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 51,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 52,
    creationDate: secondHourDate,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 53,
    creationDate: secondHourDate,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 54,
    creationDate: secondHourDate,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 55,
    creationDate: secondHourDate,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 56,
    creationDate: secondHourDate,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
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
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 43,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
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
  },
  {
    id: 34,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 35,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 36,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 37,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 38,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 39,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 40,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 41,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 42,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 43,
    creationDate: monday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 44,
    creationDate: monday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 45,
    creationDate: monday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 46,
    creationDate: monday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 47,
    creationDate: monday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 48,
    creationDate: monday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 49,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 50,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 51,
    creationDate: tuesday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 52,
    creationDate: tuesday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 53,
    creationDate: tuesday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 54,
    creationDate: tuesday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 55,
    creationDate: tuesday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 56,
    creationDate: tuesday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 57,
    creationDate: wednesday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 58,
    creationDate: wednesday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 59,
    creationDate: wednesday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 60,
    creationDate: wednesday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 61,
    creationDate: wednesday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 62,
    creationDate: wednesday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 63,
    creationDate: wednesday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 64,
    creationDate: wednesday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 65,
    creationDate: thursday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 66,
    creationDate: thursday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 67,
    creationDate: thursday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 68,
    creationDate: thursday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 69,
    creationDate: thursday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 70,
    creationDate: thursday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 71,
    creationDate: thursday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 72,
    creationDate: thursday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 73,
    creationDate: friday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 74,
    creationDate: friday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 75,
    creationDate: friday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 76,
    creationDate: friday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 77,
    creationDate: friday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 78,
    creationDate: friday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 79,
    creationDate: friday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 80,
    creationDate: friday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 81,
    creationDate: saturday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 82,
    creationDate: saturday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 83,
    creationDate: saturday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 84,
    creationDate: saturday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 85,
    creationDate: saturday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 86,
    creationDate: saturday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 87,
    creationDate: saturday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 88,
    creationDate: saturday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 89,
    creationDate: sunday,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 90,
    creationDate: sunday,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 91,
    creationDate: sunday,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 92,
    creationDate: sunday,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 93,
    creationDate: sunday,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 94,
    creationDate: sunday,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 95,
    creationDate: sunday,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 96,
    creationDate: sunday,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
]

export {
  date,
  secondDate,
  thirdDate,
  secondHourDate,
  symptomsMonthRegistries,
  differentMonthViewRegistry,
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
