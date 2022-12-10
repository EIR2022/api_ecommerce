const supertest = require('supertest');
const createServer = require('../utils/server');

const app = createServer();
describe('prueba', () => {
  it('prueba1', async () => {
    await supertest(app).get('/api/v1');
  });
});
