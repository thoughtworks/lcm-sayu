import { getConnection, createConnection, Connection } from 'typeorm'

export class Service {
  protected async getConnection(): Promise<Connection> {
    try {
      return await createConnection()
    } catch (err) {
      return getConnection()
    }
  }
}
