import { Connection, createConnection, getConnection } from 'typeorm'
import { UserDTO } from 'src/dto/UserDTO'
import { getValidEmail, User } from 'src/model/User'

export class UserService {
  async saveUser(user: User): Promise<void> {
    const existingUser = (await (this.getByEmail(
      user.email
    ) as unknown)) as User

    const connection = await this.getConnection()
    try {
      const userRepository = connection.getRepository('User')

      if (existingUser) {
        await userRepository.save({
          id: existingUser.id,
          email: existingUser.email,
          role: user.role,
          createdAt: existingUser.createdAt,
        })
      } else {
        await userRepository.save(user)
      }
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

  async getAll(): Promise<UserDTO[] | undefined> {
    const connection = await this.getConnection()
    try {
      const userRepository = connection.getRepository<User>('User')
      const users = await userRepository.find({
        order: {
          email: 'ASC',
        },
      })

      return users.map((user) => ({
        id: user.id ? user.id : 0,
        email: user.email,
        role: user.role,
      }))
    } catch (err) {
      console.error(err)
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
