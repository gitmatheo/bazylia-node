import { wizytyControllers } from '../wizyty.controllers.js';
import _ from 'lodash';

describe('wizyty controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = ['getOne', 'getMany', 'createOne', 'removeOne', 'updateOne'];

    crudMethods.forEach(name => expect(_.isFunction(wizytyControllers.crudControllers[name])).toBe(true));
  });
});
