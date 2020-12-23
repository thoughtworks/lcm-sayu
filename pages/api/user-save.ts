import { NextApiHandler } from 'next'
import { withSessionServer } from 'src/high-order-function/WithSession'
import { Role } from 'src/model/Role'
import { User } from 'src/model/User'

import { UserService } from 'src/services/UserService'

const handler: NextApiHandler = async (req, res) => {
  const user = req.body

  try {
    const userToSave: User = new User(user.userEmail, user.role, user.status)

    const userService = new UserService()
    await userService.saveUser(userToSave)
    res.status(200)
  } catch (err) {
    res.status(500)
    console.error(err?.message || err, user)
  }
  res.send(null)
}

export default withSessionServer(handler, [Role.TRATANTE])
