const resolvers = require('../graphql/root')

test('resolvers respond to calls', () => {
  expect(resolvers.hello()).toBe('Hello World!')
})
