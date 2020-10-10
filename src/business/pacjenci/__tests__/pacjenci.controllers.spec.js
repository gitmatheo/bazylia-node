import controllers from '../../pacjenci/pacjenci.controllers';
import _ from 'lodash';

describe('pacjenci controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = ['getOne', 'getMany', 'createOne', 'removeOne', 'updateOne'];

    crudMethods.forEach(name => expect(_.isFunction(controllers.crudControllers[name])).toBe(true));
  });
});
