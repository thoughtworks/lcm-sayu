import { UserDTO } from 'src/dto/UserDTO'
import { User as NextAuthUser } from 'next-auth'

import { Carer } from 'src/model/Carer'
import { Role } from 'src/model/Role'
import { getValidEmail, User } from 'src/model/User'

import { Service } from './Service'
import { RegistryService } from './RegistryService'

export class UserService extends Service {
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
          status: user.status,
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
  async getById(id: number): Promise<UserDTO | undefined> {
    const connection = await this.getConnection()
    let userDTO: UserDTO | undefined = undefined
    try {
      const userRepository = connection.getRepository<User>('User')
      const user = await userRepository.findOne({ id: id })

      if (user) {
        userDTO = {
          id: user.id ? user.id : 0,
          email: user.email,
          role: user.role,
          status: user.status,
        }
      }
      return userDTO
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
        status: user.status,
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

  async existByEmailAndUpdateName({
    name,
    email,
  }: NextAuthUser): Promise<boolean> {
    const user = await this.getByEmail(email)
    if (user && !user.name) {
      const connection = await this.getConnection()
      try {
        user.name = name
        const userRepository = connection.getRepository<User>('User')
        await userRepository.save(user)
      } finally {
        connection.close()
      }
    }
    return !!user
  }

  async getCarers(): Promise<Carer[]> {
    const connection = await this.getConnection()

    let users = []
    try {
      const userRepository = connection.getRepository<User>('User')
      users = await userRepository.find({
        where: { role: Role.CUIDADOR, status: 'activo' },
      })
    } finally {
      await connection.close()
    }

    const registryService = new RegistryService()
    return Promise.all(
      users.map(async (user) => {
        const lastUserRegistry = await registryService.getLastRegistryByUser(
          user
        )
        return {
          id: user.id as number,
          name: user.name || user.email,
          lastUpdated: lastUserRegistry?.creationDate.getTime() || null,
        }
      })
    )
  }

  async getUserById(id: number): Promise<User | undefined> {
    const connection = await this.getConnection()
    try {
      const userRepository = connection.getRepository<User>('User')
      const user = await userRepository.findOne(id)
      return user
    } finally {
      await connection.close()
    }
  }
}
