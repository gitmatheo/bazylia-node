import router from '../uslugi.routes.js';

describe('uslugi router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:type', method: 'get' },
    ];

    routes.forEach(route => {
      const match = router.stack.find(s => s.route.path === route.path && s.route.methods[route.method]);
      expect(match).toBeTruthy();
    });
  });
});
