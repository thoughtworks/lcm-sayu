import { ViewRegistry } from 'src/steps/SymptomsRegistryList'
import { Registry } from 'src/model/Registry'

const date = new Date('Fri Nov 20 2020 22:18:33')
const secondDate = new Date('Sat Nov 21 2020 22:18:33')
const thirdDate = new Date('Sun Nov 22 2020 22:18:33')
const secondHourDate = new Date('Fri Nov 20 2020 23:18:33')
const symptomsViewRegistries: ViewRegistry[] = [
  {
    day: new Date('2020-11-18T15:12:40.528Z').getTime(),
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
        symptomDate: new Date('2020-11-18T15:12:40.528Z').getTime(),
        tireLevel: 6,
      },
    ],
  },
  {
    day: new Date('2020-11-13T00:47:56.014Z').getTime(),
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
        symptomDate: new Date('2020-11-13T00:47:56.014Z').getTime(),
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
        symptomDate: new Date('2020-11-13T00:43:17.630Z').getTime(),
        tireLevel: 7,
      },
    ],
  },
  {
    day: new Date('2020-11-11T16:47:09.896Z').getTime(),
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
        symptomDate: new Date('2020-11-11T16:47:09.896Z').getTime(),
        tireLevel: 7,
      },
    ],
  },
  {
    day: new Date('2020-11-10T23:57:34.122Z').getTime(),
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
        symptomDate: new Date('2020-11-10T23:57:34.122Z').getTime(),
        tireLevel: 7,
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

export {
  date,
  secondDate,
  thirdDate,
  secondHourDate,
  symptomsViewRegistries,
  threeDaySymptoms,
  oneDaySymptoms,
  onlyOneHourSymptoms,
}
