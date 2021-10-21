/* eslint-disable no-undef */
const { CustomError } = require('utils/CustomError')

describe('Make new CustomError', () => {
  const newError = new CustomError(400, 'Error message')
  test('is instance of class CustomError', () => {
    expect(newError instanceof CustomError).toBeTruthy()
  })
  test('is instance of Error', () => {
    expect(newError instanceof Error).toBeTruthy()
  })
  test('should return an object with property status: 400', () => {
    expect(newError.status).toBe(400)
  })
  test('should return an object with property message: Error message', () => {
    expect(newError.message).toBe('Error message')
  })
})