const request = require('supertest')
const server = require('./index')

describe('index', () => {
  it('responds to healthcheck', () => {
    return request(server)
      .get('/healthcheck')
      .expect(200, /Healthy/)
  })
})
