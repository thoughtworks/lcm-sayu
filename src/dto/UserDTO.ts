import { Role } from 'src/model/Role'

export type UserDTO = {
  id: number
  email: string
  role: Role
}
