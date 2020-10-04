const controllers = require ('../rozliczenia.controllers');
const _ = require ('lodash');

describe('rozliczenia controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getRozliczeniaMedycynaPracy',
      'getRozliczeniaSpecjalistyka',
    ]

    crudMethods.forEach(name =>
      expect(_.isFunction(controllers[name])).toBe(true)
    )
  })
})