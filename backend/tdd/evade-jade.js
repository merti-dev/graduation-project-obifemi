const initialsExtractor = require('./initials-extractor')

describe('initialsExtractor', () => {
  it('should return the initials of a name', () => {
    const name = 'John Doe'
    const expected = 'JD'
    const actual = initialsExtractor(name)
    expect(actual).toBe(expected)
  })
})
