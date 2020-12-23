import { NextApiHandler } from 'next'
import { withSessionServer } from 'src/high-order-function/WithSession'
import { Role } from 'src/model/Role'
import { UserService } from 'src/services/UserService'

const handler: NextApiHandler = async (req, res) => {
  const userService = new UserService()
  const { email } = req.body
  let emailAlreadyExist = false
  try {
    emailAlreadyExist = await userService.existByEmail(email)
  } catch (err) {
    console.error(err)
  }
  res.json({ emailAlreadyExist })
}

export default withSessionServer(handler, [Role.TRATANTE])
