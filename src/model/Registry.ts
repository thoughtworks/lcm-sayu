import { Symptom } from './Symptom'

export type Registry = {
  id?: number
  creationDate: Date
  value: number
  symptom: Symptom
}
