import { Role } from 'src/model/Role'
import { Status } from 'src/model/Status'

export type UserDTO = {
  id: number
  email: string
  role: Role
  status: Status
}
