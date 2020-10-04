const router = require('../rozliczenia.routes');

describe('rozliczenia router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/medycyna-pracy', method: 'get' },
      { path: '/specjalistyka', method: 'get' },
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})