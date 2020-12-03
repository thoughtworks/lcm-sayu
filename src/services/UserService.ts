import { getValidEmail, User } from 'src/model/User'
import { Service } from './Service'
import { Carer } from '../model/Carer'

export class UserService extends Service {
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

  async getCarers(): Promise<Carer[]> {
    const connection = await this.getConnection()
    try {
      const userRepository = connection.getRepository<User>('User')
      const users = await userRepository.find()
      return users.map(({ id }) => ({
        id: id as number,
        name: 'Juanito',
        lastUpdated: 0,
      }))
    } finally {
      connection.close()
    }
  }
}
