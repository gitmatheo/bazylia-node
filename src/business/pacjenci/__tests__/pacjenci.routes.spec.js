import router from '../pacjenci.routes.js';

describe('pacjenci router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/', method: 'post' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'put' },
      { path: '/:id', method: 'delete' },
      { path: '/:id/decyzja', method: 'post' },
      { path: '/:id/data-orzeczenia', method: 'post' },
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})