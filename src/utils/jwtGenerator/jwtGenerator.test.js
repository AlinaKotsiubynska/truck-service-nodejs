/* eslint-disable no-undef */
const { jwtGenerator } = require('./jwtGenerator')
const { JWT_TOKEN_REGEX } = require('helpers/constants')

describe('Check valid jwt form', () => {
  test('sould return valid jwt', () => {
    expect(jwtGenerator({email: 'mail@gmai.com', _id: '123456'})).toMatch(JWT_TOKEN_REGEX)
  })
  test('sould take only object with field _id as a parameter', () => {
    expect(() => jwtGenerator('mail@gmai.com')).toThrowError()
    expect(() => jwtGenerator({id: 'd5f1641x65c6'})).toThrowError()
  })
})