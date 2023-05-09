const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Challenge = require('../src/models/challenge')

describe('contextlang', function () {
  beforeEach(async () => {
    await User.deleteMany()

    await Challenge.deleteMany()
  })

  it('can create a user', async function () {
    const name = 'John'
    const level = 'B2'
    const email = 'asde@asd.com'
    const password = '123456'
    const expectedOutput = {
      name,
      level,
      email,
    }
    const actualOutput = await request(app).post('/users').send({ name, level, email, password })

    expect(actualOutput.body).toMatchObject(expectedOutput)
  })
})
