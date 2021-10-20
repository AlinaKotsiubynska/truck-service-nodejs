require('module-alias/register')
const { createLog } = require('./createLog')
const getCreatedDate =require('helpers/getCreatedDate')

describe('Create object with message and time fields', () => {
  test('should return object with message "Load posted"', () => {
    expect(createLog('Load posted').message).toBe('Load posted')
  })
  test('should return object with ISO date', () => {
    const regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
    expect(createLog('Load posted').time).toMatch(regex)
  })

})