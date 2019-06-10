const request = require('supertest')
const server = require('./index')

describe('index', () => {
  it('responds to healthcheck', () => {
    return request(server)
      .get('/healthcheck')
      .expect(200, /Healthy/)
  })

  it('responds to /user', () => {
    return request(server)
      .post('/user')
      .send({ userName: 'trent' })
      .expect(200);
  });

  it('responds to /logout', () => {
    return request(server)
      .get('/logout')
      .expect(200);
  });

  // Additional tests could include:
  // Inserting reservations to DB
  // Fetching all reservations from DB
  // Fetching all rooms from DB
  // Deleting a cancelled reservation from DB
  // Making above requests without a session cookie (would return 401 reponse)
});
