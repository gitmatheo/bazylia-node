import controllers from '../firmy.controllers';
import _ from 'lodash';

describe('firmy controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = ['getOne', 'getMany', 'createOne', 'removeOne', 'updateOne'];

    crudMethods.forEach(name => expect(_.isFunction(controllers[name])).toBe(true));
  });
});
