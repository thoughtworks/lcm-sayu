import { User } from 'src/model/User'
import { createConnection } from 'typeorm'

export class UserService {
  async saveUser(user: User): Promise<void> {
    const connection = await createConnection()
    try {
      const userRepository = connection.getRepository('User')
      await userRepository.save(user)
    } finally {
      connection.close()
    }
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const connection = await createConnection()
    try {
      const userRepository = connection.getRepository<User>('User')
      const user = await userRepository.findOne({ email })
      return user
    } finally {
      connection.close()
    }
  }

  async existByEmail(email: string): Promise<boolean> {
    const user = await this.getByEmail(email)
    return !!user
  }
}
