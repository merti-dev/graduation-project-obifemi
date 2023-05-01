const request = require('supertest')
const app = require('../src/app')

describe('contextlang', function () {
  it('can create a user', async function () {
    const name = 'John'
    const expectedOutput = {
      name: 'John Doe',
    }
    const actualOutput = await request(app).post('/users').send({ name })

    expect(actualOutput).toEqual(expectedOutput)
  })
})
