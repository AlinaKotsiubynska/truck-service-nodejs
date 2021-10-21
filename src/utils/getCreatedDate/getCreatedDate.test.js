/* eslint-disable no-undef */
const { getCreatedDate } = require('./getCreatedDate')
const { ISO_DATE_REGEX } = require('helpers/constants')

describe('Generate ISO date', () => {
  test('should return ISO date', () => {
    expect(getCreatedDate()).toMatch(ISO_DATE_REGEX)
  })
})