import { Symptom } from 'src/model/Symptom'
import { Service } from './Service'

export class SymptomService extends Service {
  async getAllSymptoms() {
    const connection = await this.getConnection()
    return await connection.getRepository<Symptom>('Symptom').find()
  }
}
