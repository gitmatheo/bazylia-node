import controllers from '../faktury.controllers';
import _ from 'lodash';

describe('faktury controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne'
    ]

    crudMethods.forEach(name => {
        expect(_.isFunction(controllers.crudControllers[name])).toBe(true)
    }
    )
  })
})