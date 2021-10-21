/* eslint-disable no-undef */
const { defineFilterByRole } = require('./defineFilterByRole')
const { USER_ROLE, LOAD_STATUS, DRIVER_ALLOWED_LOAD_STATUS } = require('helpers/constants')

describe('Check is filter maked correctly', () => {
  test('should return filer obj for driver with status ptoperty as array', () => {
    expect( defineFilterByRole({ role: USER_ROLE.DRIVER, id: '123456d' }))
      .toEqual({assigned_to: '123456d', status: {$in: DRIVER_ALLOWED_LOAD_STATUS}})
  })

  test('should return filer obj for shipper with status ptoperty as string ', () => {
    expect(defineFilterByRole({ role: USER_ROLE.SHIPPER, id: '123456d', status:LOAD_STATUS.SHIPPED}))
      .toEqual({created_by: '123456d', status: LOAD_STATUS.SHIPPED})
  })
  test('should return driver allowed statuses as string', () => {
    expect(() => defineFilterByRole({ role: USER_ROLE.DRIVER, id: '123456d', status:LOAD_STATUS.NEW}))
      .toThrow(`Status ${LOAD_STATUS.NEW} is not allowed for current role`)
  })
})