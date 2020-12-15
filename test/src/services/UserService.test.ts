import { UserService } from 'src/services/UserService'
import { Role } from 'src/model/Role'
import { clearMocks } from 'test/testUtils'

const mockFind = jest.fn()
const mockSave = jest.fn()
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ findOne: mockFind, save: mockSave }),
    close: jest.fn(),
  }),
}))

describe('User Service', () => {
  beforeEach(clearMocks)

  test('Should validate if email exists and update name', async () => {
    const user = { id: 1, email: 'test@test.com', role: Role.CUIDADOR }
    mockFind.mockResolvedValue(user)
    const userService = new UserService()
    const result = await userService.existByEmailAndUpdateName({
      name: 'test',
      email: 'test@test.com',
      image: '',
    })
    expect(result).toBe(true)
    expect(mockSave).toHaveBeenCalledWith({ ...user, name: 'test' })
  })

  test("Should not update name when email doesn't exist ", async () => {
    mockFind.mockResolvedValue(null)
    const userService = new UserService()
    const result = await userService.existByEmailAndUpdateName({
      name: 'test',
      email: 'test@test.com',
      image: '',
    })
    expect(result).toBe(false)
    expect(mockSave).not.toHaveBeenCalled()
  })

  test('Should not update name when user already has name', async () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      role: Role.CUIDADOR,
      name: 'test',
    }
    mockFind.mockResolvedValue(user)
    const userService = new UserService()
    const result = await userService.existByEmailAndUpdateName({
      name: 'test',
      email: 'test@test.com',
      image: '',
    })
    expect(result).toBe(true)
    expect(mockSave).not.toHaveBeenCalled()
  })
})
