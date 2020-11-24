import { NextApiHandler } from 'next'
import { withSessionServer } from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'
import { User } from 'src/model/User'

import { UserService } from 'src/services/UserService'

const handler: NextApiHandler = async (req, res) => {
  const user = req.body

  const userToSave: User = new User(user.userEmail, user.role)

  const userService = new UserService()
  await userService.saveUser(userToSave)
  res.status(200)
  res.send(null)
}

export default withSessionServer(handler, [Role.TRATANTE])
