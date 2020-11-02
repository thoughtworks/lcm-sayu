import { Symptom } from './Symptom'

export class Registry {
  readonly creationDate = new Date(Date.now())
  public id?: number
  constructor(public value: number, public symptom: Symptom) {}
}
