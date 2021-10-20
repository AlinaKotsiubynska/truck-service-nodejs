const { getRequiredTruckType } = require('./getRequiredTruckType')
const {TRUCK_TYPE} = require('./constants')


describe('get truck size for the load', () => {
  test('min size', () => {
    const loadSize = {
      payload: 100,
      dimensions: {
        width: 44,
        length: 32,
        height: 66
      }
    }
    const trucks = [TRUCK_TYPE.SPRINTER, TRUCK_TYPE.SMALL_STRAIGHT, TRUCK_TYPE.LARGE_STRAIGHT]
    expect(getRequiredTruckType(loadSize)).toEqual(trucks)
  })
  test('medium size 1', () => {
    const loadSize = {
      payload: 900,
      dimensions: {
        width: 160,
        length: 400,
        height: 70
      }
    }
    const trucks = [TRUCK_TYPE.SMALL_STRAIGHT, TRUCK_TYPE.LARGE_STRAIGHT]
    expect(getRequiredTruckType(loadSize)).toEqual(trucks)
  })
  test('medium size 2', () => {
    const loadSize = {
      payload: 1900,
      dimensions: {
        width: 150,
        length: 100,
        height: 70
      }
    }
    const trucks = [TRUCK_TYPE.SMALL_STRAIGHT, TRUCK_TYPE.LARGE_STRAIGHT]
    expect(getRequiredTruckType(loadSize)).toEqual(trucks)
  })
  test('large size 1', () => {
    const loadSize = {
      payload: 2600,
      dimensions: {
        width: 150,
        length: 100,
        height: 70
      }
    }
    const trucks = [TRUCK_TYPE.LARGE_STRAIGHT]
    expect(getRequiredTruckType(loadSize)).toEqual(trucks)
  })
  test('large size 2', () => {
    const loadSize = {
      payload: 900,
      dimensions: {
        width: 180,
        length: 400,
        height: 300
      }
    }
    const trucks = [TRUCK_TYPE.LARGE_STRAIGHT]
    expect(getRequiredTruckType(loadSize)).toEqual(trucks)
  })
  test('over size 1', () => {
    const loadSize = {
      payload: 4100,
      dimensions: {
        width: 180,
        length: 400,
        height: 300
      }
    }
    const trucks = []
    expect(getRequiredTruckType(loadSize)).toEqual(trucks)
  })
  test('over size 2', () => {
    const loadSize = {
      payload: 900,
      dimensions: {
        width: 220,
        length: 400,
        height: 300
      }
    }
    const trucks = []
    expect(getRequiredTruckType(loadSize)).toEqual(trucks)
  })
})