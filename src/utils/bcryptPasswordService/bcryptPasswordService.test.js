/* eslint-disable no-undef */
const { hashPassword,
  validateHashedPassword } = require('./bcryptPasswordService')

describe('Servisce for password encryption and validation', () => {
  const password = 'qwerty'
  const wrongPassword = 'ytrewq'


  test('should return hashed password', async () => {
    const hashedPassword = await hashPassword(password)
    expect(hashedPassword).not.toBe(password)
  })
  test('should validate password', async () => {
    const hashedPassword = await hashPassword(password)
    expect(await validateHashedPassword(hashedPassword, password))
      .toBeUndefined()
  })

  test('should throw an error', async () => {
    const hashedPassword = await hashPassword(password)
    expect.assertions(1)
    try {
      await validateHashedPassword(hashedPassword, wrongPassword)
    } catch (error) {
      expect(error).toEqual(Error('Invalid password'))
    }
  })
})