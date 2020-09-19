test('测试hello world', () => {
  const helloworld = require('../index')
  expect(helloworld)
    .toBe('hello world')
})