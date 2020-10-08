import controllers from '../uslugi.controllers.js';
import _ from 'lodash';

describe('uslugi controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne'
    ]

    crudMethods.forEach(name =>
      expect(_.isFunction(controllers.crudControllers[name])).toBe(true)
    )
  })
})