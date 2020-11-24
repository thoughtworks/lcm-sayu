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
}
