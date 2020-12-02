import { Symptom } from './Symptom'
import { User } from './User'

export class Registry {
  readonly creationDate = new Date(Date.now())
  public id?: number
  constructor(
    public value: number,
    public symptom: Symptom,
    public user: User
  ) {}
}
