import { getValidEmail, User } from 'src/model/User'
import { Connection, createConnection, getConnection } from 'typeorm'

export class UserService {
  async saveUser(user: User): Promise<void> {
    const connection = await this.getConnection()
    try {
      const userRepository = connection.getRepository('User')
      await userRepository.save(user)
    } finally {
      connection.close()
    }
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const connection = await this.getConnection()
    try {
      const validEmail = getValidEmail(email)
      const userRepository = connection.getRepository<User>('User')
      const user = await userRepository.findOne({ email: validEmail })
      return user
    } finally {
      connection.close()
    }
  }

  async existByEmail(email: string): Promise<boolean> {
    const user = await this.getByEmail(email)
    return !!user
  }

  private async getConnection(): Promise<Connection> {
    try {
      return await createConnection()
    } catch (err) {
      return getConnection()
    }
  }
}
